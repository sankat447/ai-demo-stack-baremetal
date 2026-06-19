#!/usr/bin/env bash
# =============================================================================
#  build-and-serve.sh — RUN THIS ON THE LINUX BUILD HOST (on the cluster net).
#
#  macOS can't build the agent ISO (needs nmstatectl — lesson #29). Run this on a
#  RHEL/Fedora host that the iDRACs (192.168.101.x) can reach. It:
#    1. ensures tools: openshift-install 4.21, nmstate, jq  (installs if missing)
#    2. ensures the pull secret (install/fetch-pull-secret.sh via ocm SSO, or reuse
#       an existing secrets/pull-secret.json you scp'd over)
#    3. builds the agent ISO (install/generate-iso.sh)
#    4. serves it over HTTP so the iDRACs can mount it via Redfish, and prints the
#       ISO_URL to hand back for ./install/idrac-boot.sh boot
#
#  Usage on the build host:
#    git clone https://github.com/sankat447/ai-demo-stack-baremetal.git
#    cd ai-demo-stack-baremetal
#    ssh-keygen -t ed25519 -f secrets/ssh-key -N ''      # if not copied over
#    ./install/build-and-serve.sh [http_port]            # default port 8080
# =============================================================================
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${1:-8080}"
TARGET_VERSION="4.21"
info(){ echo "  >> $*"; }
err(){ echo "  ERROR: $*" >&2; exit 1; }

[ "$(uname -s)" = "Linux" ] || err "run this on the LINUX build host, not $(uname -s)"

# ── 1. tools ─────────────────────────────────────────────────────────────────
if ! command -v nmstatectl >/dev/null 2>&1; then
  info "installing nmstate"
  sudo dnf install -y nmstate 2>/dev/null || sudo yum install -y nmstate 2>/dev/null || err "install nmstate manually (dnf install nmstate)"
fi
command -v jq >/dev/null 2>&1 || sudo dnf install -y jq 2>/dev/null || err "install jq"
if ! command -v openshift-install >/dev/null 2>&1 || ! openshift-install version 2>/dev/null | grep -q "${TARGET_VERSION}\."; then
  info "fetching openshift-install ${TARGET_VERSION}"
  tmp="$(mktemp -d)"
  curl -fsSL "https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable-${TARGET_VERSION}/openshift-install-linux.tar.gz" \
    | tar -xz -C "$tmp" openshift-install
  sudo install -m0755 "$tmp/openshift-install" /usr/local/bin/openshift-install
fi
info "openshift-install $(openshift-install version | awk '/openshift-install/{print $2}'), nmstatectl present"

# ── 2. pull secret ───────────────────────────────────────────────────────────
if [ ! -f "${REPO_ROOT}/secrets/pull-secret.json" ]; then
  info "no pull secret — fetching via Red Hat SSO (ocm). If this host is headless,"
  info "Ctrl-C and scp secrets/pull-secret.json from where you logged in instead."
  "${REPO_ROOT}/install/fetch-pull-secret.sh"
fi
[ -f "${REPO_ROOT}/secrets/ssh-key.pub" ] || err "missing secrets/ssh-key.pub (ssh-keygen -t ed25519 -f secrets/ssh-key -N '')"

# ── 3. build ─────────────────────────────────────────────────────────────────
"${REPO_ROOT}/install/generate-iso.sh"
ISO="${REPO_ROOT}/install/_artifacts/agent.x86_64.iso"
[ -f "$ISO" ] || err "ISO not produced"

# ── 4. serve ─────────────────────────────────────────────────────────────────
# primary IP that the iDRACs would reach (prefer a 192.168.10x.x address)
HOST_IP="$(ip -4 -o addr show 2>/dev/null | awk '{print $4}' | cut -d/ -f1 | grep -E '^192\.168\.10[12]\.' | head -1)"
[ -z "$HOST_IP" ] && HOST_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
echo ""
echo "  ISO built: $ISO ($(du -h "$ISO" | cut -f1))"
echo "  Serving on http://${HOST_IP}:${PORT}/agent.x86_64.iso"
echo ""
echo "  >>> On your Mac (or here), run the boot with:"
echo "      IDRAC_PASS='...' ISO_URL='http://${HOST_IP}:${PORT}/agent.x86_64.iso' \\"
echo "        ./install/idrac-boot.sh boot"
echo ""
echo "  (Leave this server running until all 3 nodes have pulled the ISO. Ctrl-C to stop.)"
cd "${REPO_ROOT}/install/_artifacts"
exec python3 -m http.server "$PORT" --bind 0.0.0.0
