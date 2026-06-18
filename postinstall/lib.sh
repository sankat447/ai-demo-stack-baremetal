#!/usr/bin/env bash
# Shared helpers for postinstall/*.sh. Source this at the top of each script.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GITOPS="${REPO_ROOT}/gitops"

# Use the installer-generated kubeconfig unless the caller already set one.
export KUBECONFIG="${KUBECONFIG:-${REPO_ROOT}/install/_artifacts/auth/kubeconfig}"

info() { echo -e ">> $*"; }
err()  { echo -e "ERROR: $*" >&2; exit 1; }

preflight() {
  command -v oc >/dev/null 2>&1 || err "oc not on PATH"
  [ -f "$KUBECONFIG" ] || err "kubeconfig not found at $KUBECONFIG (set KUBECONFIG=...)"
  oc whoami >/dev/null 2>&1 || err "not authenticated to the cluster (KUBECONFIG=$KUBECONFIG)"
  info "cluster: $(oc whoami --show-server)  user: $(oc whoami)"
}

# wait_csv <namespace> <csv-name-prefix>  — block until an operator CSV is Succeeded
wait_csv() {
  local ns="$1" prefix="$2" tries=60
  info "waiting for CSV '${prefix}*' in ${ns} to be Succeeded..."
  while ((tries--)); do
    local phase
    phase="$(oc -n "$ns" get csv -o jsonpath="{.items[?(@.metadata.name=~\"${prefix}.*\")].status.phase}" 2>/dev/null || true)"
    # jsonpath regex isn't universal; fall back to grep
    phase="$(oc -n "$ns" get csv 2>/dev/null | awk -v p="$prefix" '$1 ~ p {print $NF}' | head -1)"
    [ "$phase" = "Succeeded" ] && { info "  ${prefix} CSV Succeeded"; return 0; }
    sleep 10
  done
  err "timed out waiting for ${prefix} CSV in ${ns}"
}
