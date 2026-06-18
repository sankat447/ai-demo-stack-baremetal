#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────
# generate-iso.sh — render the agent-based installer configs and build the
# single bootable ISO for the ocp419 compact bare-metal cluster.
#
# It does NOT touch any hardware. Output: install/_artifacts/agent.x86_64.iso,
# which you then boot on each node via iDRAC virtual media (boot-instructions.md).
#
# Prereqs (see install/secrets.example.env):
#   - openshift-install 4.21.x on PATH (MUST match target OCP version)
#   - secrets/pull-secret.json   (from console.redhat.com → Downloads → pull secret)
#   - secrets/ssh-key.pub        (public key for node SSH/debug access)
# ─────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INSTALL_DIR="${REPO_ROOT}/install"
SECRETS_DIR="${REPO_ROOT}/secrets"
WORK_DIR="${INSTALL_DIR}/_artifacts"
TARGET_VERSION="4.21"

err()  { echo "ERROR: $*" >&2; exit 1; }
info() { echo ">> $*"; }

# ── 1. tool + version check ───────────────────────────────────────────────
command -v openshift-install >/dev/null 2>&1 || err "openshift-install not on PATH.
  Get the ${TARGET_VERSION} installer:
    https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable-${TARGET_VERSION}/"
GOT_VER="$(openshift-install version | awk '/openshift-install/{print $2}')"
case "$GOT_VER" in
  ${TARGET_VERSION}.*) info "openshift-install $GOT_VER OK" ;;
  *) err "openshift-install is $GOT_VER but target is ${TARGET_VERSION}.x — version MUST match the cluster." ;;
esac

# ── 2. secrets ─────────────────────────────────────────────────────────────
PULL_SECRET_FILE="${SECRETS_DIR}/pull-secret.json"
SSH_KEY_FILE="${SECRETS_DIR}/ssh-key.pub"
[ -f "$PULL_SECRET_FILE" ] || err "missing $PULL_SECRET_FILE (see install/secrets.example.env)"
[ -f "$SSH_KEY_FILE" ]     || err "missing $SSH_KEY_FILE (see install/secrets.example.env)"
python3 -c "import json,sys; json.load(open('$PULL_SECRET_FILE'))" \
  || err "$PULL_SECRET_FILE is not valid JSON"
export PULL_SECRET="$(cat "$PULL_SECRET_FILE")"
export SSH_PUBKEY="$(cat "$SSH_KEY_FILE")"

# ── 3. render templates into a fresh work dir ──────────────────────────────
# openshift-install CONSUMES (deletes) the yaml files, so we always render into
# a clean copy and keep the .tpl files pristine.
info "rendering configs into ${WORK_DIR}"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"
envsubst '${PULL_SECRET} ${SSH_PUBKEY}' \
  < "${INSTALL_DIR}/install-config.yaml.tpl" > "${WORK_DIR}/install-config.yaml"
# agent-config has no secrets to inject; copy verbatim.
cp "${INSTALL_DIR}/agent-config.yaml.tpl" "${WORK_DIR}/agent-config.yaml"

# Keep a recoverable copy, since the installer deletes the originals from WORK_DIR.
cp "${WORK_DIR}/install-config.yaml" "${WORK_DIR}/install-config.yaml.bak"
cp "${WORK_DIR}/agent-config.yaml"   "${WORK_DIR}/agent-config.yaml.bak"

# ── 4. build the ISO ───────────────────────────────────────────────────────
info "building agent ISO (this downloads the ${TARGET_VERSION} RHCOS image on first run)"
openshift-install --dir "$WORK_DIR" agent create image

ISO="${WORK_DIR}/agent.x86_64.iso"
[ -f "$ISO" ] || err "ISO not produced — check installer output above"
info "DONE: $ISO  ($(du -h "$ISO" | cut -f1))"
cat <<EOF

Next steps (NOTHING has touched the hardware yet):
  1. Review ${WORK_DIR}/*.bak one more time.
  2. Follow install/boot-instructions.md to mount this ISO on each node's
     iDRAC virtual media and boot — master-0 (192.168.102.5) FIRST (rendezvous).
  3. Watch progress:  openshift-install --dir "$WORK_DIR" agent wait-for install-complete
EOF
