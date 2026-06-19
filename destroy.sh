#!/usr/bin/env bash
# =============================================================================
#  IIS-AI Demo Stack on Bare Metal — teardown entry point
#
#  Usage: ./destroy.sh        (type 'destroy-demo' to confirm)
#
#  Bare metal can't be destroyed like cloud infra. This removes the APP STACK
#  (ArgoCD apps → app namespaces → PVCs, clearing zombie PVCs per lesson #9) and
#  optionally ODF. A FULL cluster wipe = re-image the nodes by re-running
#  ./deploy.sh (boot the ISO again), which reformats them.
# =============================================================================
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export KUBECONFIG="${KUBECONFIG:-${REPO_ROOT}/install/_artifacts/auth/kubeconfig}"
RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'
info(){ echo -e "  ${CYAN}➤${RESET} $*"; }
err(){  echo -e "  ${RED}✘${RESET} $*" >&2; exit 1; }

command -v oc >/dev/null 2>&1 || err "oc not on PATH"
oc whoami >/dev/null 2>&1 || err "not authenticated (KUBECONFIG=$KUBECONFIG)"

echo -e "${RED}${BOLD}This will DELETE the IIS-AI app stack from $(oc whoami --show-server).${RESET}"
read -r -p "Type 'destroy-demo' to confirm: " c
[ "$c" = "destroy-demo" ] || err "aborted"

NS_LIST="iis-ai-ai iis-ai-ui iis-ai-data iis-ai-system iis-ai-vms"

# ── 1. Remove the App-of-Apps (cascades to all child apps) ───────────────────
info "removing ArgoCD App-of-Apps + children..."
oc -n openshift-gitops delete application iis-ai-stack --ignore-not-found --wait=false 2>/dev/null || true
oc -n openshift-gitops delete applications.argoproj.io --all --wait=false 2>/dev/null || true
sleep 10

# ── 2. Delete app namespaces ─────────────────────────────────────────────────
info "deleting app namespaces: ${NS_LIST}"
for ns in $NS_LIST; do oc delete namespace "$ns" --ignore-not-found --wait=false 2>/dev/null || true; done

# ── 3. Clear zombie PVCs (lesson #9) ─────────────────────────────────────────
# If namespaces hang Terminating on stuck PVCs, drop their finalizers.
info "clearing any stuck PVC finalizers (lesson #9)..."
for ns in $NS_LIST; do
  for pvc in $(oc -n "$ns" get pvc -o name 2>/dev/null); do
    oc -n "$ns" patch "$pvc" -p '{"metadata":{"finalizers":null}}' --type=merge 2>/dev/null || true
  done
done

# ── 4. Optional: remove ODF ──────────────────────────────────────────────────
read -r -p "Also remove ODF StorageCluster + operator? (frees the SSDs) [y/N] " odf
if [ "${odf:-N}" = "y" ]; then
  info "deleting ODF StorageCluster (several minutes)..."
  oc -n openshift-storage delete storagecluster ocs-storagecluster --ignore-not-found --wait=true --timeout=600s 2>/dev/null || true
  oc -n openshift-local-storage delete localvolumeset localblock --ignore-not-found 2>/dev/null || true
  info "ODF operators left installed; remove subscriptions manually if desired:"
  echo "  oc -n openshift-storage delete subscription odf-operator"
  echo "  oc -n openshift-local-storage delete subscription local-storage-operator"
  echo "  # then wipe disks on each node before reuse: sgdisk --zap-all /dev/<ssd>"
fi

cat <<EOF

${GREEN}${BOLD}APP STACK TORN DOWN.${RESET}
  - ArgoCD apps + iis-ai-* namespaces removed.
  - For a FULL cluster wipe (reformat nodes): re-run ./deploy.sh and re-boot the
    ISO — the agent install reprovisions RHCOS over the existing install.
  - ODF disks, if not removed above, still hold data.
EOF
