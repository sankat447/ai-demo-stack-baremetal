# Hardware Inventory — ai-demo-stack-baremetal

> **Source of truth.** Compiled 2026-06-18 from the operator's hand-off notes
> **and** harvested live from the existing `ocp419` cluster (`oc debug node/...`,
> `oc get node ...`) which we are wiping and reinstalling in place.
> All three nodes are **near-identical** (one minor disk asymmetry on Node 3).

## Platform note — these are VxRail appliances repurposed as bare metal

The servers are **Dell EMC VxRail E560F** appliances (1U, 14th-gen PowerEdge
R640-class). For this project we **abandon VxRail Manager and vSAN entirely**
and treat them as plain bare-metal PowerEdge servers running RHCOS. There is no
VxRail/vSAN support story once OpenShift owns the disks. **The NVMe/SAS data
drives must be wiped** before ODF/local-storage can consume them.

---

## Per-node specification

| | Node 1 | Node 2 | Node 3 |
|---|---|---|---|
| Model | Dell VxRail E560F | Dell VxRail E560F | Dell VxRail E560F |
| OCP node name | `master-0` | `master-1` | `master-2` |
| Role | control-plane + worker (compact) | same | same |
| CPU | 1× Intel Xeon **Gold 6242R** (20C / 40T @ 3.10 GHz) | same | same |
| Logical CPUs | 40 | 40 | 40 |
| RAM | ~192 GB (196,440,880 Ki ≈ 187 GiB) | same | same |
| **GPU** | **none** | **none** | **none** |
| iDRAC IP | 192.168.101.5 | 192.168.101.6 | 192.168.101.7 |
| Host/node IP | 192.168.102.5 | 192.168.102.6 | 192.168.102.7 |
| Rack elevation | Row 2 / Rack 3 / U27 | Row 2 / Rack 3 / U27 ⚠️ | Row 2 / Rack 3 / U27 ⚠️ |

> ⚠️ The hand-off notes list all three nodes at the same elevation (Row2/Rack3/U27).
> That is physically impossible — needs correcting against the actual rack. Recorded
> as-provided pending confirmation.

> ⚠️ **GPU = none on all nodes.** RHOAI + KServe + vLLM/llama-inference will run
> **CPU-only**. Expect large LLMs to be slow/infeasible; size model choices to CPU
> inference (small quantized models) or plan to add a GPU node later. This is a
> material change from the AWS build — flag to stakeholders.

---

## Storage drives (per node)

Device letters (`sd*`) are **NOT stable** across reboots/nodes — see the per-node
table below; they differ already. **`rootDeviceHints` and ODF device selection
MUST key off model / WWN / by-path, never `sdX`.**

| Drive role | Model | Size | Notes |
|---|---|---|---|
| **Boot / root** | `DELLBOSS VD` | 223.5 GB | Dell BOSS M.2 RAID1 card → RHCOS root target |
| **Data ×2** | Samsung `MZILT1T6HBJR0D3` | 1.6 TB (shows 1.5T) | SAS SSD (PM1643a class). **ODF / local-storage data devices** |
| Internal SD | `IDSDM` 59.8 GB | — | Internal Dual SD Module — leave unused |
| Node 3 extra | Kioxia `KPM5XMUG400G` | 372.6 GB | **Only on Node 3** — spare SSD, asymmetric |
| Virtual media | Virtual Floppy / Virtual CD/DVD | — | iDRAC virtual media (used to boot the install ISO) |

Raw `lsblk` per node (note the shuffled letters — do not hardcode):

```
master-0:  sda 1.5T MZILT1T6  | sdb 223.5G DELLBOSS(boot) | sdc 1.5T MZILT1T6 | sdd 59.8G IDSDM
master-1:  sda 1.5T MZILT1T6  | sdb 1.5T MZILT1T6         | sdc 223.5G DELLBOSS(boot) | sdd 59.8G IDSDM
master-2:  sda 223.5G DELLBOSS(boot) | sdb 59.8G IDSDM | sdd 1.5T MZILT1T6 | sde 1.5T MZILT1T6 | sdf 372.6G KPM5XMUG400G
```

**Storage plan:** boot on the BOSS card; dedicate the **two 1.6 TB Samsung SSDs
per node** to **ODF Internal (Rook-Ceph)** → provides RWO block + RWX CephFS + S3
(RGW). This replaces AWS EBS/EFS/S3. (Existing cluster instead used
`LocalVolume` → `local-nvme*` StorageClasses, RWO-only; we are upgrading to ODF
for the RWX that open-webui / n8n need — see translation table in the brief.)

---

## Network interfaces (per node)

| | Node 1 | Node 2 | Node 3 |
|---|---|---|---|
| NIC port 1 MAC | `BC:97:E1:D4:9D:C0` | `BC:97:E1:D4:B6:80` | `BC:97:E1:D5:17:10` |
| NIC port 2 MAC | `BC:97:E1:D4:9D:C1` | `BC:97:E1:D4:B6:81` | `BC:97:E1:D5:17:11` |
| Port 1 → switch | SW1 P11 | SW1 P12 | SW1 P13 |
| Port 2 → switch | SW2 P11 | SW2 P12 | SW2 P13 |
| iDRAC → switch | SW1 P19 | SW2 P19 | SW1 P20 |

- **Speed/medium:** 10G Arista DAC cables.
- **Bond:** existing cluster runs `bond0` = **active-backup (mode 1)** over
  `eno1np0` + `eno2np1`, with `br-ex` (OVN) on top. The two switches are **not**
  presented as a single MLAG/LACP peer to the host, hence active-backup (no LACP).
  We will reproduce **active-backup bonding** in the agent-based install config.
- Linux interface names on RHCOS: **`eno1np0`** (port 1) and **`eno2np1`** (port 2).

---

## BMC / management

- **iDRAC:** `192.168.101.5/.6/.7`, user `root`.
- **Credentials are NOT stored in git.** Real values live in untracked
  `secrets/credentials.env` (gitignored). See [NETWORK_DIAGRAM.md](NETWORK_DIAGRAM.md).
- iDRAC virtual-media (Virtual CD/DVD) is the boot path for the agent ISO.

---

## Confirmations still required from the operator

- [ ] OK to **wipe vSAN/VxRail config** and the two 1.6 TB data SSDs per node.
- [ ] **Rotate** the iDRAC `root` and (old) `kubeadmin` passwords after rebuild —
      both were shared in plaintext during intake.
- [ ] Correct the **rack elevation** (all three currently say U27).
- [ ] Confirm Node 3's extra 400 GB Kioxia SSD: leave as spare, or add to ODF?
