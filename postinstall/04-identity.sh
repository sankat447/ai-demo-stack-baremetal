#!/usr/bin/env bash
# 04 — Identity: SSO console login via Keycloak (OpenID Connect), like we want
# for the IIS-AI stack — PLUS an htpasswd break-glass admin so a Keycloak outage
# can never lock you out of the cluster.
#
# Prereqs: the keycloak app (gitops wave 3, iis-ai-system) is synced & Ready, and
# the cluster ingress is up (so the keycloak Route resolves over TLS).
#
# What it does:
#   1. htpasswd break-glass: creates admin + developer (mirrors the AWS stack)
#   2. Keycloak: realm "openshift" + confidential client "openshift" + a groups
#      mapper + a cluster-admins group + a demo SSO user
#   3. Wires OCP OAuth with BOTH providers: OpenID(keycloak) + HTPasswd(break-glass)
#   4. Trusts the Keycloak route's CA (self-signed wildcard) for the OAuth server
#   5. Binds the Keycloak "ocp-cluster-admins" group → cluster-admin
#
# Usage:
#   ADMIN_PASS=... SSO_USER_PASS=... ./postinstall/04-identity.sh
# (passwords prompted if unset; never written to git)
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight
command -v htpasswd >/dev/null 2>&1 || err "htpasswd not found (install httpd-tools / apache2-utils)"

KC_NS="iis-ai-system"
REALM="openshift"
CLIENT_ID="openshift"
IDP_NAME="keycloak"
ADMIN_USER="${ADMIN_USER:-iisadmin}"
SSO_USER="${SSO_USER:-iis-sso-admin}"

# ── passwords ───────────────────────────────────────────────────────────────
if [ -z "${ADMIN_PASS:-}" ]; then read -r -s -p "htpasswd break-glass password for '${ADMIN_USER}' (and 'developer'): " ADMIN_PASS; echo; fi
if [ -z "${SSO_USER_PASS:-}" ]; then read -r -s -p "Keycloak SSO password for '${SSO_USER}': " SSO_USER_PASS; echo; fi
[ -n "$ADMIN_PASS" ] && [ -n "$SSO_USER_PASS" ] || err "passwords must be non-empty"

# ── 1. htpasswd break-glass (admin + developer, as the AWS stack) ────────────
info "=== htpasswd break-glass users (admin + developer) ==="
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
htpasswd -c -B -b "${TMP}/users.htpasswd" "$ADMIN_USER" "$ADMIN_PASS"
htpasswd    -B -b "${TMP}/users.htpasswd" developer    "$ADMIN_PASS"
oc create secret generic htpass-secret \
  --from-file=htpasswd="${TMP}/users.htpasswd" \
  -n openshift-config --dry-run=client -o yaml | oc apply -f -

# ── 2. resolve URLs ──────────────────────────────────────────────────────────
KC_HOST="$(oc -n "$KC_NS" get route keycloak -o jsonpath='{.spec.host}' 2>/dev/null)" \
  || err "keycloak route not found in $KC_NS — is the keycloak app synced?"
ISSUER="https://${KC_HOST}/realms/${REALM}"
OAUTH_HOST="$(oc -n openshift-authentication get route oauth-openshift -o jsonpath='{.spec.host}')"
REDIRECT_URI="https://${OAUTH_HOST}/oauth2callback/${IDP_NAME}"
info "keycloak issuer : ${ISSUER}"
info "oauth callback  : ${REDIRECT_URI}"

# ── 3. configure Keycloak via kcadm (inside the keycloak pod) ────────────────
KC_POD="$(oc -n "$KC_NS" get pod -l app=keycloak -o jsonpath='{.items[0].metadata.name}')"
KC_ADMIN_PASS="$(oc -n "$KC_NS" get deploy keycloak -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="KEYCLOAK_ADMIN_PASSWORD")].value}')"
kc() { oc -n "$KC_NS" exec "$KC_POD" -- /opt/keycloak/bin/kcadm.sh "$@"; }

info "=== configuring Keycloak realm '${REALM}' ==="
kc config credentials --server http://localhost:8080 --realm master \
  --user admin --password "$KC_ADMIN_PASS"

kc create realms -s realm="$REALM" -s enabled=true 2>/dev/null || info "realm exists"

# confidential client for the OCP console
kc create clients -r "$REALM" \
  -s clientId="$CLIENT_ID" -s enabled=true -s protocol=openid-connect \
  -s publicClient=false -s standardFlowEnabled=true \
  -s "redirectUris=[\"${REDIRECT_URI}\"]" 2>/dev/null || info "client exists"
CID="$(kc get clients -r "$REALM" -q clientId="$CLIENT_ID" --fields id --format csv --noquotes | tail -1)"
CLIENT_SECRET="$(kc get "clients/${CID}/client-secret" -r "$REALM" --fields value --format csv --noquotes | tail -1)"
[ -n "$CLIENT_SECRET" ] || { kc create "clients/${CID}/client-secret" -r "$REALM"; CLIENT_SECRET="$(kc get "clients/${CID}/client-secret" -r "$REALM" --fields value --format csv --noquotes | tail -1)"; }

# add a "groups" mapper so the groups claim is emitted to OCP
kc create "clients/${CID}/protocol-mappers/models" -r "$REALM" \
  -s name=groups -s protocol=openid-connect -s protocolMapper=oidc-group-membership-mapper \
  -s 'config."claim.name"=groups' -s 'config."full.path"=false' \
  -s 'config."id.token.claim"=true' -s 'config."access.token.claim"=true' \
  -s 'config."userinfo.token.claim"=true' 2>/dev/null || info "groups mapper exists"

# cluster-admins group + a demo SSO user in it
kc create groups -r "$REALM" -s name=ocp-cluster-admins 2>/dev/null || info "group exists"
kc create users -r "$REALM" -s username="$SSO_USER" -s enabled=true \
  -s email="${SSO_USER}@iisl.com" -s emailVerified=true 2>/dev/null || info "user exists"
kc set-password -r "$REALM" --username "$SSO_USER" --new-password "$SSO_USER_PASS"
GID="$(kc get groups -r "$REALM" -q search=ocp-cluster-admins --fields id --format csv --noquotes | tail -1)"
UID_="$(kc get users -r "$REALM" -q username="$SSO_USER" --fields id --format csv --noquotes | tail -1)"
kc update "users/${UID_}/groups/${GID}" -r "$REALM" -n 2>/dev/null || true

# ── 4. client secret + CA trust for the OAuth server ─────────────────────────
info "=== OCP OAuth secret + CA (self-signed wildcard trust) ==="
oc create secret generic ${IDP_NAME}-client-secret \
  --from-literal=clientSecret="$CLIENT_SECRET" \
  -n openshift-config --dry-run=client -o yaml | oc apply -f -
# Trust the ingress CA that signs the keycloak edge route (self-signed wildcard).
CA_BLOCK=""
oc -n openshift-config-managed get configmap default-ingress-cert \
  -o jsonpath='{.data.ca-bundle\.crt}' > "${TMP}/ingress-ca.crt" 2>/dev/null || true
if [ -s "${TMP}/ingress-ca.crt" ]; then
  oc create configmap ${IDP_NAME}-ca --from-file=ca.crt="${TMP}/ingress-ca.crt" \
    -n openshift-config --dry-run=client -o yaml | oc apply -f -
  CA_BLOCK=$'\n      ca:\n        name: '"${IDP_NAME}"'-ca'
else
  info "no default-ingress-cert found; OpenID will use the system trust store"
fi

# ── 5. wire OAuth: OpenID(keycloak) primary + HTPasswd break-glass ───────────
info "=== patching OAuth cluster (OpenID + HTPasswd) ==="
oc apply -f - <<OAUTH
apiVersion: config.openshift.io/v1
kind: OAuth
metadata:
  name: cluster
spec:
  identityProviders:
  - name: ${IDP_NAME}
    mappingMethod: claim
    type: OpenID
    openID:
      clientID: ${CLIENT_ID}
      clientSecret:
        name: ${IDP_NAME}-client-secret
      issuer: ${ISSUER}${CA_BLOCK}
      claims:
        preferredUsername: [preferred_username]
        name: [name]
        email: [email]
        groups: [groups]
  - name: htpasswd
    mappingMethod: claim
    type: HTPasswd
    htpasswd:
      fileData:
        name: htpass-secret
OAUTH

# ── 6. grant cluster-admin: break-glass admin + the Keycloak group ───────────
oc adm policy add-cluster-role-to-user cluster-admin "$ADMIN_USER"
# OpenID groups are synced as Keycloak group names; bind that group to admin.
oc adm policy add-cluster-role-to-group cluster-admin ocp-cluster-admins

cat <<EOF

Done. OAuth pods roll out in ~1-2 min. The console login page will then show
TWO options:
  • "${IDP_NAME}"  → Keycloak SSO  (user: ${SSO_USER}, in ocp-cluster-admins)
  • "htpasswd"     → break-glass   (user: ${ADMIN_USER} / developer)

Verify:
  oc get oauth cluster -o jsonpath='{.spec.identityProviders[*].name}{"\n"}'
  # browse https://console-openshift-console.apps.ocp419.crucible.iisl.com

SECURITY: once SSO login works, remove kubeadmin:
  oc delete secret kubeadmin -n kube-system
NOTE: with self-signed wildcard TLS, if SSO login errors on TLS, confirm the
${IDP_NAME}-ca configmap holds the CA that signed the keycloak route.
EOF
