#!/usr/bin/env bash
# 02 — MetalLB for EXTRA LoadBalancer services only (api/ingress VIPs are
# platform-managed via keepalived — lesson #20).
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight

cat <<'WARN'
⚠️  The IPAddressPool range (192.168.102.240-.250 placeholder) MUST be confirmed
   free with your network team and must NOT overlap nodes/.10/.11/gateway/DHCP.
   Edit gitops/platform/03-metallb/ipaddresspool.yaml first if needed.
WARN
read -r -p "Pool range confirmed free? [y/N] " ok
[ "${ok:-N}" = "y" ] || err "aborted — confirm the MetalLB pool first"

info "=== MetalLB operator + controller ==="
oc apply -f "${GITOPS}/platform/03-metallb/metallb-operator.yaml"
wait_csv metallb-system metallb-operator
info "waiting for MetalLB controller rollout..."
oc -n metallb-system rollout status deploy/controller --timeout=300s || true

info "=== IPAddressPool + L2Advertisement ==="
oc apply -f "${GITOPS}/platform/03-metallb/ipaddresspool.yaml"
oc -n metallb-system get ipaddresspool,l2advertisement
info "done — run ./postinstall/03-gitops.sh next"
