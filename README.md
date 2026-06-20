# ai-demo-stack-baremetal

Bare-metal re-creation of the AI demo stack previously built on AWS
([`sankat447/ai-demo-stack-aws`](https://github.com/sankat447/ai-demo-stack-aws)),
running on **3 Dell VxRail E560F servers** in our own data center.

Target: a compact 3-node OpenShift **4.21** cluster (masters that also run
workloads) with OpenShift GitOps (ArgoCD) + App-of-Apps deploying the core app
stack (open-webui, n8n, LangGraph, portkey, vault, keycloak, mlflow, mongodb,
redis, minio, grafana, cloudbeaver, …) — **14 ArgoCD apps** today, with RHOAI/
KServe + Service Mesh as parked platform layers — backed by **ODF** for storage
and **PostgreSQL + pgvector** for vectors. Demo/product-specific apps (DCIM/
Sunbird) live in the separate [`iis-dcim`](https://github.com/sankat447/iis-dcim) repo.

No AWS, no Terraform, no cloud IaC. Tooling: `openshift-install` (agent-based)
+ `oc` + shell, then `helm`/`kustomize` via ArgoCD.

## Status

| Phase | State |
|---|---|
| Hardware + network intake | ✅ captured from operator + live `ocp419` cluster |
| Source-of-truth docs | ✅ [HARDWARE_INVENTORY](docs/HARDWARE_INVENTORY.md), [NETWORK_DIAGRAM](docs/NETWORK_DIAGRAM.md) |
| Pre-wipe capture of n8n workflows | ✅ [migration/](migration/README.md) |
| Install configs (agent-based, OCP 4.21) | ✅ drafted — **awaiting review, nothing booted** |
| Cluster install | ⏸ blocked on review + physical access |
| Post-install (storage, gitops, identity) | ✅ scripts + platform operator layer authored |
| GitOps app tree port from AWS | ✅ data/AI/system/UI tiers (14 apps, waves 1–4); inference parked (no GPU); DCIM apps split to `iis-dcim` |

## Layout

```
ONBOARDING.md  team handoff runbook (start here if you're new)
deploy.sh      provision: build ISO → boot gate → install → postinstall → gitops
destroy.sh     tear down the app stack (full wipe = re-image via deploy.sh)
docs/        REFERENCE_ARCHITECTURE (stack contract for AI solution design),
             HARDWARE_INVENTORY, NETWORK_DIAGRAM, LESSONS_LEARNED  ← read these first
install/     agent-based installer templates + generate-iso.sh + boot-instructions.md
migration/   pre-wipe capture of 15 n8n workflows (DCIM apps -> iis-dcim repo)
postinstall/ storage, metallb, gitops, identity (Keycloak SSO + htpasswd break-glass)
gitops/      (todo) App-of-Apps tree ported from the AWS repo
secrets/     gitignored — pull secret, ssh key, iDRAC creds (see install/secrets.example.env)
```

## Key facts (full detail in `docs/`)

- Cluster `ocp419` / base domain `crucible.iisl.com`; API VIP `192.168.102.10`,
  ingress VIP `192.168.102.11`; nodes `.5/.6/.7` on `192.168.102.0/24` (gw `.1`).
- Per node: Xeon Gold 6242R (20C/40T), ~192 GB RAM, **no GPU**; BOSS boot drive +
  2× 1.6 TB SSD for ODF; dual 10G in **active-backup** bond.
- TLS: self-signed wildcard via cert-manager. NTP: public RHEL pool. Egress: direct.

## Provision

Full flow (see [ONBOARDING.md](ONBOARDING.md) for the runbook):
```bash
# 1. pull secret is automated via Red Hat SSO (deploy.sh runs install/fetch-pull-secret.sh);
#    just have an ssh key: ssh-keygen -t ed25519 -f secrets/ssh-key -N ''
# 2. install openshift-install 4.21.x on PATH
./deploy.sh        # builds ISO → pauses for iDRAC boot → installs → postinstall → gitops
```
Or just the ISO (touches no hardware): `./install/generate-iso.sh`. Boot steps:
[install/boot-instructions.md](install/boot-instructions.md) (master-0 first). Teardown: `./destroy.sh`.

> ⚠️ Booting **wipes** the existing cluster + VxRail/vSAN. Ensure
> [migration/](migration/README.md) capture is complete first.
