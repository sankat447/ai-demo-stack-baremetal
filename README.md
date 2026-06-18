# ai-demo-stack-baremetal

Bare-metal re-creation of the AI demo stack previously built on AWS
([`sankat447/ai-demo-stack-aws`](https://github.com/sankat447/ai-demo-stack-aws)),
running on **3 Dell VxRail E560F servers** in our own data center.

Target: a compact 3-node OpenShift **4.21** cluster (masters that also run
workloads) with OpenShift GitOps (ArgoCD) + App-of-Apps deploying the same
~28-app stack (open-webui, n8n, LangGraph, portkey, vault, keycloak, mlflow,
mongodb, redis, minio, grafana, jaeger/tempo, kiali, istio, RHOAI/KServe,
vLLM, …), with **ODF** for storage and **PostgreSQL + pgvector** for vectors.

No AWS, no Terraform, no cloud IaC. Tooling: `openshift-install` (agent-based)
+ `oc` + shell, then `helm`/`kustomize` via ArgoCD.

## Status

| Phase | State |
|---|---|
| Hardware + network intake | ✅ captured from operator + live `ocp419` cluster |
| Source-of-truth docs | ✅ [HARDWARE_INVENTORY](docs/HARDWARE_INVENTORY.md), [NETWORK_DIAGRAM](docs/NETWORK_DIAGRAM.md) |
| Pre-wipe capture of custom apps + n8n workflows | ✅ [migration/](migration/README.md) |
| Install configs (agent-based, OCP 4.21) | ✅ drafted — **awaiting review, nothing booted** |
| Cluster install | ⏸ blocked on review + physical access |
| Post-install (storage, gitops, identity) | ⬜ |
| GitOps app tree port from AWS | ⬜ |

## Layout

```
docs/        HARDWARE_INVENTORY, NETWORK_DIAGRAM, LESSONS_LEARNED  ← read these first
install/     agent-based installer templates + generate-iso.sh + boot-instructions.md
migration/   pre-wipe capture of custom apps (dctrack/sunbird) + 15 n8n workflows
postinstall/ (todo) storage, metallb, gitops, identity bootstrap
gitops/      (todo) App-of-Apps tree ported from the AWS repo
secrets/     gitignored — pull secret, ssh key, iDRAC creds (see install/secrets.example.env)
```

## Key facts (full detail in `docs/`)

- Cluster `ocp419` / base domain `crucible.iisl.com`; API VIP `192.168.102.10`,
  ingress VIP `192.168.102.11`; nodes `.5/.6/.7` on `192.168.102.0/24` (gw `.1`).
- Per node: Xeon Gold 6242R (20C/40T), ~192 GB RAM, **no GPU**; BOSS boot drive +
  2× 1.6 TB SSD for ODF; dual 10G in **active-backup** bond.
- TLS: self-signed wildcard via cert-manager. NTP: public RHEL pool. Egress: direct.

## To build the install ISO (does NOT touch hardware)

```bash
# 1. create secrets/ (see install/secrets.example.env): pull-secret.json + ssh-key.pub
# 2. install openshift-install 4.21.x on PATH
./install/generate-iso.sh          # → install/_artifacts/agent.x86_64.iso
# 3. boot each node from the ISO via iDRAC virtual media:
#    see install/boot-instructions.md  (master-0 FIRST — rendezvous node)
```

> ⚠️ Booting **wipes** the existing cluster + VxRail/vSAN. Ensure
> [migration/](migration/README.md) capture is complete first.
