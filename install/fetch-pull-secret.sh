#!/usr/bin/env bash
# =============================================================================
#  fetch-pull-secret.sh — get the Red Hat pull secret via SSO, no manual copy.
#
#  You only do a browser SSO login to Red Hat (console.redhat.com). The script:
#    1. ensures the `ocm` CLI is present (installs via brew or GitHub release)
#    2. `ocm login --use-auth-code`  → opens a browser for Red Hat SSO (no token
#       paste). Skipped if you already have a valid ocm session.
#    3. pulls the registry pull secret from the accounts API → secrets/pull-secret.json
#
#  Idempotent: if secrets/pull-secret.json already exists + is valid, it exits
#  unless you pass --force.
# =============================================================================
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SECRETS_DIR="${REPO_ROOT}/secrets"
OUT="${SECRETS_DIR}/pull-secret.json"
FORCE="${1:-}"
info(){ echo "  >> $*"; }
err(){ echo "  ERROR: $*" >&2; exit 1; }

valid() { python3 -c "import json,sys; d=json.load(open('$1')); sys.exit(0 if d.get('auths') else 1)" 2>/dev/null; }

mkdir -p "$SECRETS_DIR"
if [ "$FORCE" != "--force" ] && [ -f "$OUT" ] && valid "$OUT"; then
  info "valid pull secret already at $OUT (use --force to refresh)"; exit 0
fi

# ── 1. ensure ocm CLI ────────────────────────────────────────────────────────
if ! command -v ocm >/dev/null 2>&1; then
  info "ocm CLI not found — installing"
  if command -v brew >/dev/null 2>&1; then
    brew install ocm 2>/dev/null || brew install openshift-online/ocm/ocm 2>/dev/null || true
  fi
  if ! command -v ocm >/dev/null 2>&1; then
    os="$(uname -s | tr '[:upper:]' '[:lower:]')"; arch="$(uname -m)"
    case "$arch" in x86_64) arch=amd64;; aarch64|arm64) arch=arm64;; esac
    url="https://github.com/openshift-online/ocm-cli/releases/latest/download/ocm-${os}-${arch}"
    info "downloading $url"
    mkdir -p "${REPO_ROOT}/bin"
    curl -fsSL "$url" -o "${REPO_ROOT}/bin/ocm" && chmod +x "${REPO_ROOT}/bin/ocm"
    export PATH="${REPO_ROOT}/bin:$PATH"
  fi
  command -v ocm >/dev/null 2>&1 || err "could not install ocm — install manually: https://github.com/openshift-online/ocm-cli/releases"
fi
info "ocm: $(command -v ocm)"

# ── 2. SSO login (browser auth-code; skip if a session is already valid) ─────
if ! ocm whoami >/dev/null 2>&1; then
  info "opening browser for Red Hat SSO login..."
  ocm login --use-auth-code || err "ocm SSO login failed"
fi
info "logged in to Red Hat as: $(ocm whoami 2>/dev/null | python3 -c 'import json,sys;print(json.load(sys.stdin).get("email","?"))' 2>/dev/null || echo '?')"

# ── 3. fetch the pull secret from the accounts API ───────────────────────────
info "fetching pull secret → $OUT"
ocm post /api/accounts_mgmt/v1/access_token > "$OUT" 2>/dev/null || err "failed to fetch access_token (pull secret)"
valid "$OUT" || err "fetched file is not a valid pull secret (no .auths)"
chmod 600 "$OUT"
info "OK — $(python3 -c "import json;print(len(json.load(open('$OUT'))['auths']),'registries')" 2>/dev/null) entitled. $OUT is gitignored."
