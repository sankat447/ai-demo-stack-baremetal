#!/usr/bin/env bash
# 03 — OpenShift GitOps (ArgoCD) + bootstrap the App-of-Apps.
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight

info "=== OpenShift GitOps operator ==="
oc apply -f - <<'EOF'
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: openshift-gitops-operator
  namespace: openshift-operators
spec:
  channel: latest
  installPlanApproval: Automatic
  name: openshift-gitops-operator
  source: redhat-operators
  sourceNamespace: openshift-marketplace
EOF
wait_csv openshift-operators openshift-gitops-operator

info "waiting for the openshift-gitops ArgoCD instance to come up..."
for i in $(seq 1 30); do
  oc -n openshift-gitops get argocd openshift-gitops >/dev/null 2>&1 && break
  sleep 10
done
oc -n openshift-gitops rollout status deploy/openshift-gitops-server --timeout=300s || true

info "=== app namespaces ==="
oc apply -f "${GITOPS}/config/namespaces.yaml"

info "=== bootstrap App-of-Apps (iis-ai-stack) ==="
oc apply -f "${GITOPS}/bootstrap/root-app.yaml"
oc -n openshift-gitops get applications.argoproj.io

cat <<EOF

ArgoCD is now driving gitops/config/apps/ (currently empty — apps are ported
after bring-up; see gitops/config/apps/README.md).

ArgoCD console:  https://$(oc -n openshift-gitops get route openshift-gitops-server -o jsonpath='{.spec.host}' 2>/dev/null)
Admin password:  oc -n openshift-gitops get secret openshift-gitops-cluster -o jsonpath='{.data.admin\.password}' | base64 -d

NEXT: ./postinstall/04-identity.sh
EOF
