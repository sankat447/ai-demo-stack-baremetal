# Network Diagram & IP Plan — ai-demo-stack-baremetal

> **Source of truth.** Compiled 2026-06-18 from operator notes + harvested live
> from the existing `ocp419` cluster. We **reinstall in place reusing the same
> cluster name, base domain, VIPs, and DNS records** — so DNS needs no changes.

## Cluster identity

| Field | Value | Source |
|---|---|---|
| Cluster name | `ocp419` | existing (reused) |
| Base domain | `crucible.iisl.com` | existing (reused) |
| API URL | `api.ocp419.crucible.iisl.com` → **192.168.102.10** | DNS / infra |
| Apps wildcard | `*.apps.ocp419.crucible.iisl.com` → **192.168.102.11** | DNS / infra |
| Topology | **Compact 3-node** (each master also a worker) | live |
| Network type | **OVNKubernetes** | live |
| Current version | **4.16.0** (being replaced) | live |
| Target version | **TBD** — 4.17 EUS / 4.21 / keep 4.x to match name | open decision |

> The name `ocp419` is cosmetic and does not need to match the OCP version.

## Subnets

| Subnet | CIDR | Gateway | Purpose |
|---|---|---|---|
| Management / iDRAC | `192.168.101.0/24` | (mgmt) | BMC, virtual media, PXE |
| **Node / machine network** | `192.168.102.0/24` | **192.168.102.1** | OCP nodes + VIPs |
| DNS network | `192.168.2.0/24` | (routed) | nameservers (L3 reachable from nodes) |
| Pod network (cluster) | `10.128.0.0/14` (hostPrefix 23) | — | OVN pods |
| Service network | `172.30.0.0/16` | — | ClusterIP services |

> Pod/Service CIDRs are the OCP defaults and do **not** conflict with the
> 192.168.x.x physical networks — kept as-is.

## IP assignments (192.168.102.0/24)

| IP | Host / role | MAC (bond primary) |
|---|---|---|
| 192.168.102.1 | Default gateway | — |
| 192.168.102.5 | `master-0` (Node 1) | BC:97:E1:D4:9D:C0 |
| 192.168.102.6 | `master-1` (Node 2) | BC:97:E1:D4:B6:80 |
| 192.168.102.7 | `master-2` (Node 3) | BC:97:E1:D5:17:10 |
| **192.168.102.10** | **API VIP** (`api.`) | platform-managed (keepalived) |
| **192.168.102.11** | **Ingress VIP** (`*.apps`) | platform-managed (keepalived) |

## Load balancing — built-in, NOT MetalLB for VIPs

The bare-metal platform handles the **api + ingress VIPs natively** via
on-node keepalived/haproxy (`infrastructure.status...loadBalancer.type =
OpenShiftManagedDefault`). No external LB, no MetalLB needed for these.

➡️ **MetalLB is only required for *additional* `Service type=LoadBalancer`**
(e.g. istio-ingressgateway, or any app wanting its own L2 VIP). If we add it,
its `IPAddressPool` must carve out **free IPs in 192.168.102.0/24 that do NOT
overlap** .5–.7, .10, .11, or the gateway. **Reserve a pool range with the
operator before enabling MetalLB** (e.g. 192.168.102.20–.40 — TBD/confirm free).

## DNS

- Nameservers: **192.168.2.100**, **192.168.2.101** (type: **TBD** — AD / BIND / dnsmasq).
- These live on a different subnet (192.168.2.x) than the nodes — **L3 routing
  confirmed working** (nodes already resolve via 192.168.2.100).
- **Records already exist and are reused** (verified via `dig`):
  - `api.ocp419.crucible.iisl.com`        → `192.168.102.10`
  - `*.apps.ocp419.crucible.iisl.com`     → `192.168.102.11`
  - Forward + PTR for `master-0/1/2`      → `.5 / .6 / .7`
- ⚠️ Agent-based install does **not** require `api-int` to differ; ensure
  `api-int.ocp419.crucible.iisl.com` also resolves to the API VIP (standard OCP req).

## Time (NTP)

- Egress is **direct to the internet** (see below), and the existing nodes sync
  against **public NTP** (`0.rhel.pool.ntp.org` + a large server list via chrony).
- ⚠️ **No internal NTP server was identified.** Recommend pointing chrony at an
  internal/authoritative source if one exists; otherwise the agent-config will
  use the public RHEL pool (requires egress, fine here). **Operator: confirm a
  preferred NTP server or accept the public pool.**

## Internet egress

- **Direct — no proxy** (`proxy/cluster` httpProxy/httpsProxy/noProxy all empty,
  and nodes reach public NTP). ➡️ **No mirror registry / air-gap handling needed.**
- We will still need a Red Hat **pull secret** (from console.redhat.com) at
  install time — stored untracked in `secrets/`.

## Switching (physical)

- Two Arista switches **SW1 / SW2**, 10G **DAC** cabling.
- Each node: NIC port1→SW1, port2→SW2 → host **`bond0` active-backup** (no LACP/MLAG
  presented to host). iDRACs split across SW1/SW2.

```
              ┌──────────── 192.168.2.0/24 (DNS) ─────────────┐
              │  ns1 192.168.2.100      ns2 192.168.2.101      │
              └───────────────────────▲───────────────────────┘
                                       │ (L3 routed)
   192.168.101.0/24 (iDRAC/mgmt)       │        192.168.102.0/24 (nodes)  gw .1
   ┌─────────────────────────┐         │        ┌──────────────────────────────┐
   │ iDRAC .5  .6  .7         │         │        │ API VIP .10   Ingress VIP .11 │
   └────┬────────┬───────┬────┘         │        └──────────────────────────────┘
        │        │       │              │
   ┌────▼───┐ ┌──▼─────┐ ┌▼───────┐     │   each node: port1→SW1  port2→SW2
   │ Node1  │ │ Node2  │ │ Node3  │  bond0 active-backup → br-ex (OVN)
   │master-0│ │master-1│ │master-2│
   │ .102.5 │ │ .102.6 │ │ .102.7 │
   └────────┘ └────────┘ └────────┘
       └──── 10G DAC → Arista SW1 / SW2 ────┘
```

## Verified live (2026-06-18, against the running ocp419 cluster)

Confirmed read-only via `oc debug node` + `dig` + iDRAC Redfish — see
`install/preflight-network.sh` to re-run. The fresh install reproduces this.

| Item | Result |
|---|---|
| Bond | `bond0` **active-backup**, slaves `eno1np0`+`eno2np1`, both UP @ 10 Gb |
| Bridge | OVN `br-ex` (+`br-int`) auto-created on bond0; node IP lives on `br-ex` |
| MTU | **1500** everywhere (no jumbo) · **no VLAN** (untagged/access) |
| Gateway | `192.168.102.1` via `br-ex` — reachable |
| Forward DNS | `api`/`api-int`→.10, `*.apps`→.11, `master-0/1/2`→.5/.6/.7 ✅ |
| DNS servers | `192.168.2.100`/`.101` reachable on :53 ✅ |
| NTP | synced, stratum 3, Leap Normal ✅ |
| Egress | direct to quay.io / registry.redhat.io / api.openshift.com :443 ✅ |
| VIPs | `.10`/`.11` float as `/32` on br-ex via keepalived (platform-managed) |

> ⚠️ Minor (non-blocking) DNS hygiene to clean up later:
> - Nodes `.5/.6/.7` have **double PTRs** (`master-N` + `crnp-rhgnodeNs`).
> - Ingress VIP `.11` has **stale PTRs from a prior cluster** (`*.apps.ocp414`).
>   Forward resolution — all the installer needs — is correct.

## Open network decisions

- [ ] Target **OCP version** (4.17 EUS / 4.21 / other).
- [ ] **DNS server type** (AD / BIND / dnsmasq) — affects how we'd add records if any change.
- [ ] **NTP** source — internal server or accept public RHEL pool.
- [ ] **MetalLB** pool range (only if we expose extra LoadBalancer services).
- [ ] **TLS** strategy: internal CA / cert-manager+Let's Encrypt / self-signed wildcard.
