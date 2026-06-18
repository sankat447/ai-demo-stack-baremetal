# ─────────────────────────────────────────────────────────────────────────
# install-config.yaml — TEMPLATE (agent-based installer, OCP 4.21)
# Compact 3-node bare-metal cluster: ocp419.crucible.iisl.com
#
# Rendered by install/generate-iso.sh, which injects ${PULL_SECRET} and
# ${SSH_PUBKEY} from untracked secrets. NEVER commit the rendered file —
# it contains the pull secret. (.gitignore covers install-config.yaml.)
#
# Source of truth for every value here: docs/NETWORK_DIAGRAM.md +
# docs/HARDWARE_INVENTORY.md. Change those first, then this template.
# ─────────────────────────────────────────────────────────────────────────
apiVersion: v1
baseDomain: crucible.iisl.com
metadata:
  name: ocp419            # cluster name (cosmetic; reuses the old DNS records)

# Compact cluster: 3 control-plane nodes that ALSO run workloads.
# compute.replicas: 0 makes the control plane schedulable automatically.
controlPlane:
  name: master
  replicas: 3
  hyperthreading: Enabled    # Xeon Gold 6242R, 20C/40T per node
  architecture: amd64
compute:
- name: worker
  replicas: 0

networking:
  networkType: OVNKubernetes
  clusterNetwork:
  - cidr: 10.128.0.0/14       # pod network (default; no conflict with 192.168.x)
    hostPrefix: 23
  serviceNetwork:
  - 172.30.0.0/16             # service network (default)
  machineNetwork:
  - cidr: 192.168.102.0/24    # node network; gateway .1

platform:
  baremetal:
    # VIPs are managed on-node by keepalived (loadBalancer = OpenShiftManagedDefault).
    # These reuse the existing DNS records (verified via dig).
    apiVIPs:
    - 192.168.102.10          # api.ocp419.crucible.iisl.com  / api-int.*
    ingressVIPs:
    - 192.168.102.11          # *.apps.ocp419.crucible.iisl.com
    # No provisioning network / BMC automation: nodes are booted manually from
    # the agent ISO via iDRAC virtual media (see boot-instructions.md).

# Injected at render time (see install/secrets.example.env). Do not hardcode.
pullSecret: '${PULL_SECRET}'
sshKey: '${SSH_PUBKEY}'
