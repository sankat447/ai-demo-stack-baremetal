# ─────────────────────────────────────────────────────────────────────────
# agent-config.yaml — TEMPLATE (agent-based installer, OCP 4.21)
# Per-host networking + disk hints for the 3 VxRail E560F nodes.
#
# Network model (from the live cluster): each node bonds its two 10G ports
# (eno1np0 + eno2np1) as bond0 in ACTIVE-BACKUP (no LACP/MLAG on the switch
# pair). OVN's br-ex is created automatically on top of bond0 — do NOT define
# br-ex here. Static IPs, no DHCP.
#
# rootDeviceHints pins RHCOS to the Dell BOSS card (223 GB) so the two 1.6 TB
# Samsung SSDs stay free for ODF. `sdX` names are unstable. NOTE: matching by
# `model: "DELLBOSS VD"` does NOT work — the agent installer's disk inventory
# doesn't match that string and apply-host-config loops forever (lesson #30).
# Instead match by attributes: the BOSS is the ONLY rotational disk >=200 GB
# (data disks are non-rotational SAS 1.6 TB; the IDSDM is <100 GB).
# ─────────────────────────────────────────────────────────────────────────
apiVersion: v1beta1
kind: AgentConfig
metadata:
  name: ocp419

# Node that bootstraps the install. Must be one of the host IPs below and
# must be powered on / booted from the ISO first.
rendezvousIP: 192.168.102.5

# NTP: public RHEL pool (egress is direct). Replace with an internal server
# here if one becomes available — see docs/NETWORK_DIAGRAM.md.
additionalNTPSources:
- 0.rhel.pool.ntp.org
- 1.rhel.pool.ntp.org
- 2.rhel.pool.ntp.org
- 3.rhel.pool.ntp.org

hosts:
# ── Node 1 ──────────────────────────────────────────────────────────────
- hostname: master-0
  role: master
  rootDeviceHints:
    rotational: true
    minSizeGigabytes: 200
  interfaces:
  - name: eno1np0
    macAddress: bc:97:e1:d4:9d:c0
  - name: eno2np1
    macAddress: bc:97:e1:d4:9d:c1
  networkConfig:
    interfaces:
    - name: bond0
      type: bond
      state: up
      ipv4:
        enabled: true
        dhcp: false
        address:
        - ip: 192.168.102.5
          prefix-length: 24
      link-aggregation:
        mode: active-backup
        options:
          miimon: "100"
        port:
        - eno1np0
        - eno2np1
    dns-resolver:
      config:
        server:
        - 192.168.2.100
        - 192.168.2.101
    routes:
      config:
      - destination: 0.0.0.0/0
        next-hop-address: 192.168.102.1
        next-hop-interface: bond0

# ── Node 2 ──────────────────────────────────────────────────────────────
- hostname: master-1
  role: master
  rootDeviceHints:
    rotational: true
    minSizeGigabytes: 200
  interfaces:
  - name: eno1np0
    macAddress: bc:97:e1:d4:b6:80
  - name: eno2np1
    macAddress: bc:97:e1:d4:b6:81
  networkConfig:
    interfaces:
    - name: bond0
      type: bond
      state: up
      ipv4:
        enabled: true
        dhcp: false
        address:
        - ip: 192.168.102.6
          prefix-length: 24
      link-aggregation:
        mode: active-backup
        options:
          miimon: "100"
        port:
        - eno1np0
        - eno2np1
    dns-resolver:
      config:
        server:
        - 192.168.2.100
        - 192.168.2.101
    routes:
      config:
      - destination: 0.0.0.0/0
        next-hop-address: 192.168.102.1
        next-hop-interface: bond0

# ── Node 3 ──────────────────────────────────────────────────────────────
- hostname: master-2
  role: master
  rootDeviceHints:
    rotational: true
    minSizeGigabytes: 200
  interfaces:
  - name: eno1np0
    macAddress: bc:97:e1:d5:17:10
  - name: eno2np1
    macAddress: bc:97:e1:d5:17:11
  networkConfig:
    interfaces:
    - name: bond0
      type: bond
      state: up
      ipv4:
        enabled: true
        dhcp: false
        address:
        - ip: 192.168.102.7
          prefix-length: 24
      link-aggregation:
        mode: active-backup
        options:
          miimon: "100"
        port:
        - eno1np0
        - eno2np1
    dns-resolver:
      config:
        server:
        - 192.168.2.100
        - 192.168.2.101
    routes:
      config:
      - destination: 0.0.0.0/0
        next-hop-address: 192.168.102.1
        next-hop-interface: bond0
