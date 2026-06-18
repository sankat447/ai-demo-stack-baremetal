#!/usr/bin/env bash
# 04 — Identity: bootstrap an htpasswd admin so the cluster is usable without
# the auto-generated kubeadmin. Keycloak/RH-SSO OIDC comes later (separate step).
#
# Usage:  ADMIN_USER=iisadmin ADMIN_PASS='somestrongpass' ./postinstall/04-identity.sh
# (If unset, you'll be prompted; the password is never written to git.)
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight

command -v htpasswd >/dev/null 2>&1 || err "htpasswd not found (install httpd-tools / apache2-utils)"

ADMIN_USER="${ADMIN_USER:-iisadmin}"
if [ -z "${ADMIN_PASS:-}" ]; then
  read -r -s -p "Password for OCP admin '${ADMIN_USER}': " ADMIN_PASS; echo
fi
[ -n "$ADMIN_PASS" ] || err "empty password"

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
htpasswd -c -B -b "${TMP}/users.htpasswd" "$ADMIN_USER" "$ADMIN_PASS"

info "=== creating htpass-secret in openshift-config ==="
oc create secret generic htpass-secret \
  --from-file=htpasswd="${TMP}/users.htpasswd" \
  -n openshift-config --dry-run=client -o yaml | oc apply -f -

info "=== wiring the htpasswd identity provider into the cluster OAuth ==="
oc patch oauth cluster --type=merge -p '{
  "spec": {"identityProviders": [{
    "name": "htpasswd",
    "mappingMethod": "claim",
    "type": "HTPasswd",
    "htpasswd": {"fileData": {"name": "htpass-secret"}}
  }]}
}'

info "=== granting cluster-admin to ${ADMIN_USER} ==="
oc adm policy add-cluster-role-to-user cluster-admin "$ADMIN_USER"

cat <<EOF

Done. The OAuth pods will roll out in ~1-2 min, then:
  oc login -u ${ADMIN_USER}     # (https://api.ocp419.crucible.iisl.com:6443)

SECURITY: once you've confirmed ${ADMIN_USER} works, remove kubeadmin:
  oc delete secret kubeadmin -n kube-system

LATER (Keycloak/RH-SSO OIDC): install the rhsso-operator, realize a realm +
OpenShift client, then add an 'OpenID' identityProvider pointing at it. Tracked
as a follow-up — not part of this bring-up.
EOF
