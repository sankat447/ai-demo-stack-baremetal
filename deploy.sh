#!/usr/bin/env bash
# =============================================================================
#  IIS-AI Demo Stack on Bare Metal — provisioning entry point
#
#  Usage   : ./deploy.sh
#  What    : builds the agent ISO, PAUSES for you to boot the 3 nodes via iDRAC,
#            waits for the OCP 4.21 install, then runs postinstall (storage →
#            metallb → gitops → identity) and lets ArgoCD sync the app stack.
#  Duration: ~5 min build + ~10 min boot + ~30 min install + ~20 min postinstall.
#
#  Bare metal can't be `terraform apply`'d — the boot step (Phase 2) is manual
#  via iDRAC virtual media (install/boot-instructions.md). Everything else is
#  automated and idempotent.
# =============================================================================
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARTIFACTS="${REPO_ROOT}/install/_artifacts"
KCFG="${ARTIFACTS}/auth/kubeconfig"
CYAN='\033[0;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; BOLD='\033[1m'; RESET='\033[0m'
info(){ echo -e "  ${CYAN}➤${RESET} $*"; }
ok(){   echo -e "  ${GREEN}✔${RESET} $*"; }
warn(){ echo -e "  ${YELLOW}⚠${RESET} $*"; }
err(){  echo -e "  ${RED}✘${RESET} $*" >&2; exit 1; }

echo -e "${CYAN}${BOLD}┌────────────────────────────────────────────────────────┐
│  IIS-AI Demo Stack (bare metal) — deploy                │
└────────────────────────────────────────────────────────┘${RESET}"

# ── Phase 0: preflight ───────────────────────────────────────────────────────
info "Phase 0 — tool + secret check"
for t in oc openshift-install jq envsubst; do command -v "$t" >/dev/null 2>&1 || err "missing tool: $t"; done
ver="$(openshift-install version | awk '/openshift-install/{print $2}')"
case "$ver" in 4.21.*) ok "openshift-install $ver";; *) err "openshift-install is $ver, need 4.21.x";; esac
if [ ! -f "${REPO_ROOT}/secrets/pull-secret.json" ]; then
  info "no pull secret — fetching via Red Hat SSO (browser login)"
  "${REPO_ROOT}/install/fetch-pull-secret.sh"
fi
[ -f "${REPO_ROOT}/secrets/pull-secret.json" ] || err "pull secret still missing (run install/fetch-pull-secret.sh)"
[ -f "${REPO_ROOT}/secrets/ssh-key.pub" ]      || err "missing secrets/ssh-key.pub (ssh-keygen -t ed25519 -f secrets/ssh-key -N '')"
ok "secrets present"

# ── Phase 1: build the agent ISO ─────────────────────────────────────────────
if [ -f "${ARTIFACTS}/agent.x86_64.iso" ]; then
  warn "ISO already exists at ${ARTIFACTS}/agent.x86_64.iso — skipping build (rm it to rebuild)"
else
  info "Phase 1 — building the agent ISO"
  "${REPO_ROOT}/install/generate-iso.sh"
fi
ok "ISO ready: ${ARTIFACTS}/agent.x86_64.iso"

# ── Phase 2: MANUAL boot gate ────────────────────────────────────────────────
echo -e "
${YELLOW}${BOLD}════════════ MANUAL STEP — boot the nodes ════════════${RESET}
  Mount ${ARTIFACTS}/agent.x86_64.iso on each node's iDRAC virtual media and
  boot — ${BOLD}master-0 (192.168.102.5) FIRST${RESET} (rendezvous), then .6 and .7.
  Steps: install/boot-instructions.md   (UEFI one-time boot from Virtual CD)

  ${RED}This WIPES the existing cluster + VxRail/vSAN. Confirm migration/ capture is done.${RESET}
"
read -r -p "  Have you started booting all 3 nodes from the ISO? [y/N] " a
[ "${a:-N}" = "y" ] || err "aborted — re-run ./deploy.sh when ready to boot"

# ── Phase 2b: wait for install ───────────────────────────────────────────────
info "Phase 2b — waiting for bootstrap (up to ~30 min)..."
openshift-install --dir "$ARTIFACTS" agent wait-for bootstrap-complete --log-level=info \
  || err "bootstrap did not complete — check the node consoles / install/_artifacts logs"
info "waiting for install-complete..."
openshift-install --dir "$ARTIFACTS" agent wait-for install-complete --log-level=info \
  || err "install did not complete"
export KUBECONFIG="$KCFG"
ok "cluster up: $(oc whoami --show-server 2>/dev/null)"
oc get nodes

# ── Phase 3: storage → metallb → gitops ──────────────────────────────────────
info "Phase 3 — storage (ODF)"
KUBECONFIG="$KCFG" "${REPO_ROOT}/postinstall/01-storage.sh"
info "Phase 3 — MetalLB (confirms the IP pool interactively)"
KUBECONFIG="$KCFG" "${REPO_ROOT}/postinstall/02-metallb.sh"
info "Phase 3 — OpenShift GitOps + App-of-Apps"
KUBECONFIG="$KCFG" "${REPO_ROOT}/postinstall/03-gitops.sh"

# ── Phase 4: identity (keeps kubeadmin) ──────────────────────────────────────
info "Phase 4 — identity (kubeadmin retained; AD later)"
KUBECONFIG="$KCFG" "${REPO_ROOT}/postinstall/04-identity.sh" || true

# ── Done ─────────────────────────────────────────────────────────────────────
CONSOLE="https://console-openshift-console.apps.ocp419.crucible.iisl.com"
echo -e "
${GREEN}${BOLD}DEPLOYMENT COMPLETE${RESET}
  Console : ${CONSOLE}
  Login   : kubeadmin / $(cat "${ARTIFACTS}/auth/kubeadmin-password" 2>/dev/null || echo '<see install/_artifacts/auth/kubeadmin-password>')
  KUBECONFIG=${KCFG}

  ArgoCD is syncing the app stack:
    oc get applications.argoproj.io -n openshift-gitops
  Next: import n8n workflows + build sunbird (gitops/CUSTOM_APPS.md, migration/README.md)
"
