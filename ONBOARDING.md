# IIS-AI Demo Stack on Bare Metal — Team Onboarding

End-to-end runbook to provision and tear down the OCP 4.21 + RHOAI + ArgoCD demo
stack on our **3 Dell VxRail E560F servers**, starting from a laptop with cluster
network access.

**ETA**: ~30 min to build + boot, ~40 min unattended for install + apps.
**Cost**: none — our own hardware. (No AWS, no Terraform, no cloud bill.)

> This is the bare-metal sibling of `sankat447/ai-demo-stack-aws`. The app stack
> is the same ~28 GitOps apps; only the infrastructure layer differs.

---

## 0. What you'll get

A compact OpenShift **4.21** cluster (3 nodes that are control-plane **and**
worker) with:

- ODF (Ceph) storage — RWO block + RWX file + S3, replacing AWS EBS/EFS/S3
- In-cluster PostgreSQL 16 + pgvector (replaces Aurora)
- MinIO object store
- ~28 GitOps-managed apps (open-webui, n8n, langchain, vault, keycloak, mlflow,
  minio, portkey, redis, mongodb, grafana, cloudbeaver, RHOAI/KServe, …)
- TLS routes at `*.apps.ocp419.crucible.iisl.com`

⚠️ **No GPUs** on these servers — model serving (vLLM/llama) runs CPU-only and is
**parked** by default. See `gitops/config/inference/README.md`.

---

## 1. Prerequisites

### 1.1 Network + hardware access (ask Sanjeev)
- Reachability to the node subnet `192.168.102.0/24` and the iDRACs on
  `192.168.101.5/.6/.7` (for virtual-media boot).
- iDRAC credentials (root). The DNS records + VIPs already exist (reused).
- Full hardware/network detail: [`docs/HARDWARE_INVENTORY.md`](docs/HARDWARE_INVENTORY.md),
  [`docs/NETWORK_DIAGRAM.md`](docs/NETWORK_DIAGRAM.md).

### 1.2 Red Hat account
Sign up at https://console.redhat.com — for the **pull secret**
(https://console.redhat.com/openshift/install/pull-secret).

### 1.3 Local tools (macOS or Linux)
```bash
brew install openshift-cli openshift/openshift/openshift-install git jq gh httpd-tools gettext
oc version --client          # 4.21.x
openshift-install version    # 4.21.x  (MUST match the cluster version)
```

### 1.4 Secrets (in `secrets/`, gitignored — see install/secrets.example.env)
The **pull secret is automated** — you just SSO-login to Red Hat in a browser:
```bash
./install/fetch-pull-secret.sh         # ocm SSO login → writes secrets/pull-secret.json
ssh-keygen -t ed25519 -f secrets/ssh-key -N ''   # → secrets/ssh-key.pub (one-time)
```
`deploy.sh` / `generate-iso.sh` call `fetch-pull-secret.sh` for you if the secret
is missing, so the only manual step is the browser login. (Installs the `ocm` CLI
automatically if needed.)

---

## 2. Clone and read the lessons
```bash
git clone https://github.com/sankat447/ai-demo-stack-baremetal.git
cd ai-demo-stack-baremetal
```
**Before anything else**, skim [`docs/LESSONS_LEARNED.md`](docs/LESSONS_LEARNED.md)
— AWS carryovers (#4/#7/#9/#10/#11/#12) + bare-metal patterns (#16–27). Knowing
them in advance saves hours.

---

## 3. Provision

`./deploy.sh` orchestrates everything **except the physical boot** (that's manual
via iDRAC — bare metal can't be `terraform apply`'d).

```bash
./deploy.sh
```

| Phase | What | Duration |
|---|---|---|
| 0 | Tool + secret check | ~1 min |
| 1 | Build the agent ISO (`install/generate-iso.sh`) | ~5 min |
| 2 | **MANUAL: boot all 3 nodes from the ISO via iDRAC** (master-0 first) | ~10 min |
| 2b | Wait for bootstrap + install complete | ~30 min |
| 3 | Storage (ODF) → MetalLB → GitOps bootstrap | ~20 min |
| 4 | Identity (keeps kubeadmin; AD later) | ~1 min |

The manual boot step is [`install/boot-instructions.md`](install/boot-instructions.md).
`deploy.sh` pauses and waits for you to confirm the nodes are booting.

### 3.1 Credentials after deploy
```bash
export KUBECONFIG=$PWD/install/_artifacts/auth/kubeconfig
cat  install/_artifacts/auth/kubeadmin-password          # OCP kubeadmin login
oc get nodes                                             # expect 3x Ready, control-plane+worker
oc -n openshift-gitops get secret openshift-gitops-cluster \
   -o jsonpath='{.data.admin\.password}' | base64 -d; echo   # ArgoCD admin
oc get applications.argoproj.io -n openshift-gitops
```

**Login:** OCP console uses **kubeadmin** for now. Org Active Directory (LDAP) is
a planned follow-up — see `postinstall/04-identity.sh`.

---

## 4. Provision (Claude Code flow — recommended for first run)
```bash
claude
```
> Read `docs/LESSONS_LEARNED.md`, then run `./deploy.sh`. Pause at the boot gate
> so I can mount the ISO via iDRAC, then continue and resolve any blockers using
> the documented patterns.

The lessons are checked into git, so any fresh-clone Claude session has them.

---

## 5. Smoke test
```bash
export KUBECONFIG=$PWD/install/_artifacts/auth/kubeconfig
oc get applications.argoproj.io -n openshift-gitops \
  -o custom-columns='NAME:.metadata.name,SYNC:.status.sync.status,HEALTH:.status.health.status'
for h in open-webui-iis-ai-ui grafana-iis-ai-ui mlflow-iis-ai-system; do
  printf "%-55s " "$h"; curl -sk -m 8 -o /dev/null -w "%{http_code}\n" "https://$h.apps.ocp419.crucible.iisl.com"
done
```

---

## 6. Application URLs
All under `*.apps.ocp419.crucible.iisl.com` (host = `<route>-<namespace>`):

| Service | Route host | Notes |
|---|---|---|
| OCP Console | `console-openshift-console` | `kubeadmin` (see 3.1) |
| ArgoCD | `openshift-gitops-server-openshift-gitops` | `admin` (see 3.1) |
| Open WebUI | `open-webui-iis-ai-ui` | Chat UI |
| n8n | `n8n-iis-ai-ui` | Postgres-backed; import workflows (migration/) |
| Grafana | `grafana-iis-ai-ui` | |
| CloudBeaver | `cloudbeaver-iis-ai-ui` | finish setup wizard <1h or restart deploy (#10) |
| Portkey | `portkey-iis-ai-ai` | API-only, no UI (#11) |
| LangChain | `langchain-server-iis-ai-ai/docs` | LangGraph — UI is `/docs` (#11) |
| MinIO | `minio-console-iis-ai-data` | object store |
| MLflow | `mlflow-iis-ai-system` | |
| Vault | `vault-iis-ai-system` | dev mode, root token `Demo1234#` |
| Keycloak | `keycloak-iis-ai-system` | app SSO (not the console IdP) |

DCIM/demo apps (dctrack-chat-ui, rack-inventory-chat, sunbird-mcp) are **not** in
this stack — they live in the separate **`iis-dcim`** repo (namespace `iis-ai-dcim`).

---

## 7. Day-2 ops
- **Import n8n workflows + recreate creds**: [`migration/README.md`](migration/README.md).
- **DCIM/Sunbird apps** (dctrack-chat-ui, rack-inventory-chat, sunbird-mcp) — deployed from the separate **`iis-dcim`** repo.
- **Wire Active Directory** login later: `AD_APPLY=1 … ./postinstall/04-identity.sh`.
- **Pause to save power**: bare metal — just power the nodes off via iDRAC; ODF
  tolerates a clean shutdown of all 3 (cordon/drain first for graceful).

---

## 8. Deprovision / rebuild
```bash
./destroy.sh        # type 'destroy-demo' to confirm
```
Bare metal can't be "destroyed" like cloud infra. `destroy.sh` removes the app
stack (ArgoCD apps → namespaces → PVCs, handling zombie PVCs per #9) and
optionally ODF. A **full cluster wipe = re-image the nodes** by re-running
`deploy.sh` (boot the ISO again) — that reformats them.

---

## 9. What's in this repo
```
deploy.sh / destroy.sh      # entry points (provision / teardown)
docs/                       # HARDWARE_INVENTORY, NETWORK_DIAGRAM, LESSONS_LEARNED (READ FIRST)
install/                    # agent-based installer templates + generate-iso.sh + boot-instructions.md
postinstall/                # 01-storage 02-metallb 03-gitops 04-identity (+ optional-keycloak-sso)
gitops/                     # App-of-Apps (apps/) + platform operators + config/ (28-app stack)
migration/                  # pre-wipe capture: 15 n8n workflows (DCIM apps -> iis-dcim repo)
secrets/                    # gitignored: pull secret, ssh key, AD/iDRAC creds
```

---

## 10. Where to get help
- **Lessons / common errors**: [`docs/LESSONS_LEARNED.md`](docs/LESSONS_LEARNED.md)
- **Sanjeev**: `skumar@iisl.com` — original author, deep context
- **Red Hat Support**: case via console.redhat.com for OCP / RHOAI / ODF issues
