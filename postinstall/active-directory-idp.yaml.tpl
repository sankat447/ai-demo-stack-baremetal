# Active Directory (LDAP) identity provider for the OCP console — TEMPLATE.
# Fill in the ${...} placeholders, then apply via postinstall/04-identity.sh
# (which also creates the bind-password Secret and the AD CA ConfigMap).
#
# kubeadmin is KEPT as the break-glass admin — this ADDS AD alongside it.
#
# AD specifics baked in:
#   - id/preferredUsername = sAMAccountName (the AD logon name)
#   - name = displayName, email = mail
#   - ldaps:// on 636 with the corporate CA (set insecure:false)
#   - the URL filter scopes the user search base + object class
apiVersion: config.openshift.io/v1
kind: OAuth
metadata:
  name: cluster
spec:
  identityProviders:
  - name: active-directory
    mappingMethod: claim
    type: LDAP
    ldap:
      attributes:
        id:
        - sAMAccountName
        preferredUsername:
        - sAMAccountName
        name:
        - displayName
        email:
        - mail
      bindDN: "${AD_BIND_DN}"          # e.g. CN=svc-openshift,OU=Service Accounts,DC=iisl,DC=com
      bindPassword:
        name: ldap-bind-password        # Secret in openshift-config (created by the script)
      ca:
        name: ldap-ca                   # ConfigMap in openshift-config with the AD CA (ca.crt)
      insecure: false
      # RFC-2255 LDAP URL: host:port/baseDN?attribute?scope?filter
      url: "ldaps://${AD_HOST}:636/${AD_USER_BASE_DN}?sAMAccountName?sub?(objectClass=person)"
