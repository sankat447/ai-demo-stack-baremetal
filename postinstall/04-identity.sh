#!/usr/bin/env bash
# 04 — Identity.
#
# CURRENT PLAN: keep kubeadmin as the cluster admin login. Org Active Directory
# (LDAP) will be wired LATER. This script does NOT delete kubeadmin and does NOT
# configure any identity provider unless you explicitly run the AD step below.
#
# When you're ready for AD, gather from your AD/Windows team:
#   AD_HOST           e.g. ad.iisl.com (a DC or LB VIP reachable over ldaps/636)
#   AD_BIND_DN        a read-only service account DN, e.g.
#                     CN=svc-openshift,OU=Service Accounts,DC=iisl,DC=com
#   AD_USER_BASE_DN   search base, e.g. OU=Users,DC=iisl,DC=com
#   secrets/ad-bind-password   the bind account password (file; gitignored)
#   secrets/ad-ca.crt          the AD/enterprise CA cert (PEM; gitignored)
#
# Then run:  AD_APPLY=1 AD_HOST=ad.iisl.com AD_BIND_DN='...' AD_USER_BASE_DN='...' \
#            ./postinstall/04-identity.sh
#
# (Optional alternative: SSO via the in-stack Keycloak — postinstall/optional-keycloak-sso.sh)
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight

INSTALL_DIR="$(dirname "${BASH_SOURCE[0]}")"
SECRETS_DIR="${REPO_ROOT}/secrets"

info "current identity providers:"
oc get oauth cluster -o jsonpath='{range .spec.identityProviders[*]}  - {.name} ({.type}){"\n"}{end}' 2>/dev/null \
  || echo "  (none — kubeadmin only)"

if [ "${AD_APPLY:-0}" != "1" ]; then
  cat <<EOF

>> No identity changes made. kubeadmin is KEPT as the admin login:
     oc login -u kubeadmin -p <password from install/_artifacts/auth/kubeadmin-password>
     console: https://console-openshift-console.apps.ocp419.crucible.iisl.com

>> To wire Active Directory later, set the AD_* vars + drop the secrets files
   (see the header of this script) and re-run with AD_APPLY=1.
EOF
  exit 0
fi

# ── Active Directory (LDAP) wiring — only runs with AD_APPLY=1 ───────────────
: "${AD_HOST:?set AD_HOST}"; : "${AD_BIND_DN:?set AD_BIND_DN}"; : "${AD_USER_BASE_DN:?set AD_USER_BASE_DN}"
[ -f "${SECRETS_DIR}/ad-bind-password" ] || err "missing ${SECRETS_DIR}/ad-bind-password"
[ -f "${SECRETS_DIR}/ad-ca.crt" ]        || err "missing ${SECRETS_DIR}/ad-ca.crt (the AD/enterprise CA, PEM)"

info "=== LDAP bind-password Secret + AD CA ConfigMap (openshift-config) ==="
oc create secret generic ldap-bind-password \
  --from-file=bindPassword="${SECRETS_DIR}/ad-bind-password" \
  -n openshift-config --dry-run=client -o yaml | oc apply -f -
oc create configmap ldap-ca \
  --from-file=ca.crt="${SECRETS_DIR}/ad-ca.crt" \
  -n openshift-config --dry-run=client -o yaml | oc apply -f -

info "=== rendering + applying the AD LDAP identity provider ==="
# kubeadmin is untouched; this ADDS the active-directory provider.
AD_HOST="$AD_HOST" AD_BIND_DN="$AD_BIND_DN" AD_USER_BASE_DN="$AD_USER_BASE_DN" \
  envsubst '${AD_HOST} ${AD_BIND_DN} ${AD_USER_BASE_DN}' \
  < "${INSTALL_DIR}/active-directory-idp.yaml.tpl" | oc apply -f -

info "granting cluster-admin to an AD user/group (edit to taste):"
echo "  oc adm policy add-cluster-role-to-group cluster-admin '<AD-group-name>'"
echo "  # or per-user:  oc adm policy add-cluster-role-to-user cluster-admin '<sAMAccountName>'"

cat <<EOF

Done. OAuth rolls out in ~1-2 min; the login page adds 'active-directory'.
kubeadmin is KEPT. Verify:
  oc get oauth cluster -o jsonpath='{.spec.identityProviders[*].name}{"\n"}'
NOTE: AD group→role sync (LDAP group sync CronJob) is a separate follow-up if
you want AD security groups to drive RBAC automatically.
EOF
