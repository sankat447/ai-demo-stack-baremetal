#!/usr/bin/env bash
# =============================================================================
#  idrac-boot.sh — mount the agent ISO on each node's iDRAC virtual media,
#  set a one-time UEFI boot to the virtual CD, and power-cycle. This is the
#  "prepare fresh + start install" step — it OVERWRITES the existing cluster.
#
#  Assessed hardware state (read-only, 2026-06-18): all 3 nodes are VxRail E560F,
#  BIOS 2.20.1, ALREADY in UEFI mode, data SSDs on HBA330 in JBOD (no RAID/vSAN
#  to clear), boot = BOSS-S1 mirror. So no BIOS/RAID prep is needed — just boot.
#
#  Redfish InsertMedia needs the ISO at an HTTP(S) URL reachable BY THE iDRACs
#  (192.168.101.0/24). Host install/_artifacts/agent.x86_64.iso somewhere on that
#  network (simple: `python3 -m http.server` on a reachable box) and pass its URL.
#
#  Usage:
#    IDRAC_PASS='...' ISO_URL='http://<host>/agent.x86_64.iso' ./install/idrac-boot.sh boot
#    IDRAC_PASS='...' ./install/idrac-boot.sh eject     # post-install: clear media (lesson #24)
#    IDRAC_PASS='...' ./install/idrac-boot.sh status    # read-only: power + media state
#
#  Creds: IDRAC_USER (default root) + IDRAC_PASS. Put them in secrets/credentials.env
#  (gitignored) and `source` it, or pass inline. NEVER commit the password.
# =============================================================================
set -euo pipefail

IDRAC_USER="${IDRAC_USER:-root}"
: "${IDRAC_PASS:?set IDRAC_PASS (iDRAC root password; do not hardcode)}"
# master-0 FIRST = rendezvous node (192.168.102.5). Order matters for boot.
NODES=("192.168.101.5" "192.168.101.6" "192.168.101.7")

ACTION="${1:-status}"
au=(-sk -u "${IDRAC_USER}:${IDRAC_PASS}")
sys() { echo "https://$1/redfish/v1/Systems/System.Embedded.1"; }
vm()  { echo "https://$1/redfish/v1/Managers/iDRAC.Embedded.1/VirtualMedia/CD"; }

status() {
  for ip in "${NODES[@]}"; do
    echo "=== $ip ==="
    curl "${au[@]}" "$(sys "$ip")" 2>/dev/null | python3 -c "import sys,json;d=json.load(sys.stdin);print('  Power:',d.get('PowerState'),'| NextBoot:',d.get('Boot',{}).get('BootSourceOverrideTarget'),d.get('Boot',{}).get('BootSourceOverrideEnabled'))" 2>/dev/null || echo "  unreachable/auth"
    curl "${au[@]}" "$(vm "$ip")" 2>/dev/null | python3 -c "import sys,json;d=json.load(sys.stdin);print('  CD Inserted:',d.get('Inserted'),'| Image:',d.get('Image'))" 2>/dev/null || true
  done
}

eject() {
  for ip in "${NODES[@]}"; do
    echo ">> ejecting media on $ip"
    curl "${au[@]}" -X POST "$(vm "$ip")/Actions/VirtualMedia.EjectMedia" \
      -H 'Content-Type: application/json' -d '{}' >/dev/null 2>&1 || true
    # clear one-time boot override so reboots don't loop into the installer
    curl "${au[@]}" -X PATCH "$(sys "$ip")" -H 'Content-Type: application/json' \
      -d '{"Boot":{"BootSourceOverrideEnabled":"Disabled"}}' >/dev/null 2>&1 || true
  done
  echo "media ejected + boot override cleared."
}

boot() {
  : "${ISO_URL:?set ISO_URL (http(s) ISO reachable by the iDRACs)}"
  echo "!!  This OVERWRITES the existing cluster on all 3 nodes. Ctrl-C now to abort."
  read -r -p "    Type 'wipe-and-install' to proceed: " c
  [ "$c" = "wipe-and-install" ] || { echo "aborted"; exit 1; }
  for ip in "${NODES[@]}"; do
    echo ">> $ip : eject any media"
    curl "${au[@]}" -X POST "$(vm "$ip")/Actions/VirtualMedia.EjectMedia" -H 'Content-Type: application/json' -d '{}' >/dev/null 2>&1 || true
    echo ">> $ip : insert ISO"
    curl "${au[@]}" -X POST "$(vm "$ip")/Actions/VirtualMedia.InsertMedia" -H 'Content-Type: application/json' \
      -d "{\"Image\":\"${ISO_URL}\",\"Inserted\":true,\"WriteProtected\":true}" >/dev/null \
      || { echo "  InsertMedia failed on $ip"; continue; }
    echo ">> $ip : one-time UEFI boot from virtual CD"
    curl "${au[@]}" -X PATCH "$(sys "$ip")" -H 'Content-Type: application/json' \
      -d '{"Boot":{"BootSourceOverrideEnabled":"Once","BootSourceOverrideTarget":"Cd","BootSourceOverrideMode":"UEFI"}}' >/dev/null
    echo ">> $ip : power cycle (ForceRestart if on, else On)"
    pw=$(curl "${au[@]}" "$(sys "$ip")" 2>/dev/null | python3 -c "import sys,json;print(json.load(sys.stdin).get('PowerState','Off'))" 2>/dev/null || echo Off)
    rt="On"; [ "$pw" = "On" ] && rt="ForceRestart"
    curl "${au[@]}" -X POST "$(sys "$ip")/Actions/ComputerSystem.Reset" -H 'Content-Type: application/json' -d "{\"ResetType\":\"${rt}\"}" >/dev/null
    echo "   $ip booting from ISO."
    # master-0 is the rendezvous node — give it a head start before the others
    [ "$ip" = "${NODES[0]}" ] && { echo "   (rendezvous node — pausing 120s before next)"; sleep 120; }
  done
  echo "All nodes booting. Watch: openshift-install --dir install/_artifacts agent wait-for bootstrap-complete"
}

case "$ACTION" in
  status) status ;;
  boot)   boot ;;
  eject)  eject ;;
  *) echo "usage: $0 {status|boot|eject}"; exit 1 ;;
esac
