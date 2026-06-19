#!/usr/bin/env bash
# =============================================================================
#  preflight-network.sh — read-only network validation before an OCP install.
#  Verifies DNS (forward + the api-int record), DNS-server + gateway reach, NTP,
#  and internet egress for image pulls. Safe to run anytime; changes nothing.
#
#  Run from a workstation with `dig` (does DNS + reverse checks), and — if a
#  cluster is currently up — also probes from a node via `oc debug` (gateway,
#  NTP, egress). Mirrors what was verified 2026-06-18 (see docs/NETWORK_DIAGRAM.md).
# =============================================================================
set -uo pipefail
DNS1=192.168.2.100
BASE=ocp419.crucible.iisl.com
API_VIP=192.168.102.10 ; INGRESS_VIP=192.168.102.11
NODES=(192.168.102.5 192.168.102.6 192.168.102.7)
GW=192.168.102.1
pass=0; fail=0
ok(){ echo "  ✔ $*"; pass=$((pass+1)); }
no(){ echo "  ✘ $*"; fail=$((fail+1)); }

echo "== Forward DNS (install-critical) =="
for rec in "api.$BASE:$API_VIP" "api-int.$BASE:$API_VIP" "x.apps.$BASE:$INGRESS_VIP" \
           "master-0.$BASE:${NODES[0]}" "master-1.$BASE:${NODES[1]}" "master-2.$BASE:${NODES[2]}"; do
  name=${rec%:*}; want=${rec#*:}; got=$(dig +short "$name" @"$DNS1" 2>/dev/null | head -1)
  [ "$got" = "$want" ] && ok "$name -> $got" || no "$name -> '${got:-(none)}' (expected $want)"
done

echo "== Reverse PTRs (informational) =="
for ip in "${NODES[@]}" "$API_VIP" "$INGRESS_VIP"; do
  echo "  $ip -> $(dig +short -x "$ip" @"$DNS1" 2>/dev/null | tr '\n' ' ')"
done

# Node-side checks only if a cluster + oc are available.
if command -v oc >/dev/null 2>&1 && oc whoami >/dev/null 2>&1; then
  echo "== Node-side (via oc debug master-0) =="
  oc debug node/master-0 -- chroot /host bash -c '
    timeout 3 bash -c "echo > /dev/tcp/'"$DNS1"'/53" 2>/dev/null && echo "  ✔ DNS '"$DNS1"':53" || echo "  ✘ DNS '"$DNS1"':53"
    ping -c1 -W2 '"$GW"' >/dev/null 2>&1 && echo "  ✔ gateway '"$GW"'" || echo "  ✘ gateway '"$GW"'"
    chronyc tracking 2>/dev/null | grep -q "Leap status *: Normal" && echo "  ✔ NTP synced" || echo "  ✘ NTP not synced"
    for u in quay.io registry.redhat.io api.openshift.com; do
      timeout 5 bash -c "echo > /dev/tcp/$u/443" 2>/dev/null && echo "  ✔ egress $u:443" || echo "  ✘ egress $u:443"
    done
  ' 2>/dev/null
else
  echo "== Node-side checks skipped (no live cluster / not logged in) =="
fi

echo "== summary: ${pass} ok, ${fail} failed (DNS checks) =="
[ "$fail" -eq 0 ]
