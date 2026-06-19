# Booting the nodes from the agent ISO (iDRAC virtual media)

> ⚠️ **This step wipes the nodes.** It destroys the existing `ocp419` cluster
> and the VxRail/vSAN config. Confirm the pre-wipe capture in
> [../migration/README.md](../migration/README.md) is complete first.
>
> Prereq: `install/generate-iso.sh` has produced
> `install/_artifacts/agent.x86_64.iso`.

## Node / iDRAC reference

| Node | hostname | host IP | iDRAC IP | boots from rendezvous? |
|---|---|---|---|---|
| 1 | master-0 | 192.168.102.5 | 192.168.101.5 | **YES — boot this one FIRST** |
| 2 | master-1 | 192.168.102.6 | 192.168.101.6 | after node 1 |
| 3 | master-2 | 192.168.102.7 | 192.168.101.7 | after node 1 |

iDRAC login: `root` / *(password in `secrets/credentials.env` — **rotate** the
one shared in chat)*.

The agent installer elects **master-0 (192.168.102.5)** as the rendezvous node
(`rendezvousIP` in agent-config). Boot it first, give it ~2 min, then boot the
other two. Order otherwise doesn't matter; all three install in parallel.

---

## Per-node procedure (repeat for each node)

**Scripted (recommended):** `install/idrac-boot.sh` does all three nodes at once
(eject → insert ISO → one-time UEFI boot → power-cycle, master-0 first). Needs the
ISO at an HTTP(S) URL the iDRACs can reach:
```bash
IDRAC_PASS='…' ISO_URL='http://<reachable-host>/agent.x86_64.iso' ./install/idrac-boot.sh boot
IDRAC_PASS='…' ./install/idrac-boot.sh status   # read-only check
IDRAC_PASS='…' ./install/idrac-boot.sh eject    # post-install cleanup (#24)
```
Verified read-only against .5/.6/.7 (all UEFI, HBA330 JBOD data disks, BOSS boot
— no RAID/vSAN prep needed; see lesson #28). Or do it by hand:

You can use the **iDRAC web UI** (simplest) or **redfish/racadm** (scriptable).

### Option A — iDRAC web UI (Virtual Media)

1. Browse to `https://<iDRAC-IP>` → log in.
2. **Configuration → Virtual Media** (or **Connect Virtual Media** on the
   console toolbar) → **Map CD/DVD** → upload/select
   `install/_artifacts/agent.x86_64.iso`. (For large ISOs over a slow link,
   use **Remote File Share** pointing at an HTTP/NFS path instead.)
3. **Configuration → BIOS Settings → Boot** — confirm **UEFI** boot mode
   (RHCOS requires UEFI on these servers). Set the **virtual CD/DVD** as the
   one-time boot device, OR use step 4.
4. **Dashboard → (Power) → "Boot" → set next boot to "Virtual CD/DVD"**, then
   **Power → Reset System (warm boot)** / Power On.
5. Open the **Virtual Console** to watch it boot the ISO → RHCOS agent comes up
   and begins the install.

> Repeat for **master-0 first**, then master-1 and master-2.

### Option B — redfish (scriptable, no clicking)

Set the ISO on an HTTP(S) share reachable by the iDRACs, then per node:

```bash
# requires curl; IDRAC_* + ISO_URL exported (see install/secrets.example.env)
IDRAC=$1                       # e.g. 192.168.101.5
AUTH="-k -u ${IDRAC_USER}:${IDRAC_PASS}"
BASE="https://${IDRAC}/redfish/v1/Managers/iDRAC.Embedded.1/VirtualMedia/CD"

# 1. (eject any existing media, ignore error)
curl $AUTH -s -X POST "${BASE}/Actions/VirtualMedia.EjectMedia" -d '{}' -H 'Content-Type: application/json' || true
# 2. insert the ISO from the HTTP share
curl $AUTH -s -X POST "${BASE}/Actions/VirtualMedia.InsertMedia" \
  -H 'Content-Type: application/json' \
  -d "{\"Image\":\"${ISO_URL}\",\"Inserted\":true,\"WriteProtected\":true}"
# 3. set one-time boot to virtual CD (UEFI)
curl $AUTH -s -X PATCH "https://${IDRAC}/redfish/v1/Systems/System.Embedded.1" \
  -H 'Content-Type: application/json' \
  -d '{"Boot":{"BootSourceOverrideEnabled":"Once","BootSourceOverrideTarget":"Cd","BootSourceOverrideMode":"UEFI"}}'
# 4. power cycle
curl $AUTH -s -X POST "https://${IDRAC}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset" \
  -H 'Content-Type: application/json' -d '{"ResetType":"ForceRestart"}'
```

> `racadm` equivalents also work if you prefer:
> `racadm remoteimage -c -l <ISO_URL>` then `racadm config -g cfgServerInfo
> -o cfgServerBootOnce 1` + `racadm serveraction powercycle`.

---

## Watch the install (from your workstation)

```bash
DIR=install/_artifacts
# bootstrap/control-plane phase:
openshift-install --dir "$DIR" agent wait-for bootstrap-complete --log-level=info
# full install:
openshift-install --dir "$DIR" agent wait-for install-complete --log-level=info
```

On success the installer prints the console URL and the `kubeadmin` password,
and writes `install/_artifacts/auth/kubeconfig` (gitignored).

```bash
export KUBECONFIG=install/_artifacts/auth/kubeconfig
oc get nodes        # expect master-0/1/2 Ready, roles control-plane,master,worker
oc get clusterversion
```

## Common gotchas (will be folded into docs/LESSONS_LEARNED.md as they bite)

- **Boot mode must be UEFI**, not legacy BIOS — RHCOS won't install otherwise.
- **Eject the virtual media after install** (or clear the one-time boot) so a
  later reboot doesn't loop back into the installer.
- If a node grabs the wrong disk for root, check the **`DELLBOSS VD` model
  match** in `agent-config.yaml` against `lsblk -o NAME,SIZE,MODEL` on that node
  — `sdX` letters differ per node (see HARDWARE_INVENTORY.md), so we match by model.
- DNS `api.`/`api-int.`/`*.apps.` must resolve to the VIPs **before** boot —
  they already do (reused records); re-verify with `dig` if anything changed.
