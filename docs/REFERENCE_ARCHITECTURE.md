# Reference Architecture — IIS-AI Bare-Metal Stack

> **Purpose.** A single, authoritative description of the running stack so that any
> future solution/demo is designed **strictly to run on it**. Section 8 is a
> copy-paste **prompt block** to drop into an AI design prompt; sections 1–7 are
> the human-readable detail behind it.
>
> Source of truth, harvested live from cluster `ocp419` (OCP 4.21.6) on 2026-06-19.
> Diagram: [`reference-architecture.svg`](reference-architecture.svg).
> Deeper detail: [HARDWARE_INVENTORY](HARDWARE_INVENTORY.md) ·
> [NETWORK_DIAGRAM](NETWORK_DIAGRAM.md) · [LESSONS_LEARNED](LESSONS_LEARNED.md).

![Reference architecture](reference-architecture.svg)

---

## 1. Platform at a glance

| Property | Value |
|---|---|
| Distribution | OpenShift Container Platform **4.21.6** (OKD-class, RHCOS nodes) |
| Topology | **Compact 3-node** — every node is control-plane **and** worker; no separate worker pool |
| Cluster name / domain | `ocp419` / `crucible.iisl.com` |
| API | `https://api.ocp419.crucible.iisl.com:6443` (VIP `192.168.102.10`) |
| Apps wildcard | `*.apps.ocp419.crucible.iisl.com` (ingress VIP `192.168.102.11`) |
| Network plugin | **OVN-Kubernetes**; pods `10.128.0.0/14`, services `172.30.0.0/16` |
| Ingress | Built-in OpenShift router (HAProxy); VIPs are **platform-managed (keepalived)**, not MetalLB |
| TLS | **Self-signed wildcard** on routes (edge). No public CA — clients must trust it or use `-k` |
| GitOps | OpenShift GitOps (ArgoCD), **App-of-Apps** — `gitops/apps/applications.yaml`, 14 apps, sync waves 1–4 |
| Egress | **Direct to internet, no proxy, no air-gap** — pulls from quay.io / registry.redhat.io are fine |
| Identity | `kubeadmin` today; AD/LDAP planned (`postinstall/04-identity.sh`). Keycloak is an *app*, not the console IdP |

## 2. Hardware & capacity (the hard ceiling)

3× **Dell VxRail E560F** repurposed as plain bare metal (VxRail Manager / vSAN abandoned).

| Per node | Value |
|---|---|
| CPU | 1× Intel **Xeon Gold 6242R** — 20 cores / 40 threads @ 3.10 GHz |
| RAM | ~**187 GiB** (196 GB) |
| **GPU** | **NONE** — on any node |
| Boot | Dell BOSS M.2 RAID1 (223 GB) → RHCOS root |
| Data disks | 2× Samsung **1.6 TB SAS SSD** → consumed by ODF/Ceph (Node 3 has a spare 400 GB Kioxia) |
| Network | 2× 10G Arista DAC → **`bond0` active-backup** (no LACP), MTU 1500, no VLAN |

**Cluster totals (shared with the control plane):** ~120 vCPU / ~560 GiB RAM / ~9.6 TB raw SSD
(Ceph replica-3 ⇒ usable ~3.2 TB). Budget workloads against *worker headroom*, not the raw totals.

## 3. Storage classes (what to put in `storageClassName`)

| Class | Access | Backed by | Use for |
|---|---|---|---|
| `ocs-storagecluster-ceph-rbd` | **RWO** block | Ceph RBD | **default** — databases, single-writer PVCs |
| `ocs-storagecluster-cephfs` | **RWX** file | CephFS | shared volumes (open-webui, n8n, anything multi-pod) |
| `ocs-storagecluster-ceph-rgw` | S3 (OBC) | Ceph RGW | S3 object storage via ObjectBucketClaim |
| `openshift-storage.noobaa.io` | S3 (OBC) | NooBaa/MCG | alternative S3 / multi-cloud gateway |
| in-stack **MinIO** | S3 API | MinIO pod (`iis-ai-data`) | app-facing S3 the demos already point at |

`ocs-storagecluster-ceph-rbd` is the **default** StorageClass — omit `storageClassName` and you get RWO block.
Need shared/RWX → you **must** name `ocs-storagecluster-cephfs` explicitly.

## 4. Platform operators available to build on

| Operator | Version | State / notes |
|---|---|---|
| **Red Hat OpenShift AI (RHOAI)** | rhods-operator **2.25.7** | `DataScienceCluster` managed: dashboard, workbenches, **KServe**, data-science-pipelines. **KServe `defaultDeploymentMode: RawDeployment`** (no Knative/Serverless dependency). Dashboard: `rhods-dashboard-redhat-ods-applications.apps.ocp419…` |
| **OpenShift Service Mesh** | servicemeshoperator **2.6.17** (Istio) | Available. Mesh-member apps with external routes need `maistra.io/expose-route: "true"` (lesson #4). DSCI runs with `serviceMesh: Removed` for RHOAI |
| **OpenShift Pipelines (Tekton)** | **1.22.3** | Installed cluster-wide (`openshift-pipelines`); Pipelines-as-Code + Tekton Results available |
| **OpenShift GitOps (ArgoCD)** | bundled | App-of-Apps owner of the stack. Default instance granted cluster-admin (lesson #34) |
| **ODF / Ceph (Rook)** | **4.21.8** | StorageCluster Ready; provides the storage classes above |
| **MetalLB** | available | **Only** for extra `type=LoadBalancer` services; reserve a pool in `192.168.102.0/24` first (avoid .5–.7/.10/.11) |
| Local Storage Operator | 4.21 | Feeds raw SSDs to ODF |

## 5. The 14-app core stack (what's already running)

All routes: `https://<route>-<namespace>.apps.ocp419.crucible.iisl.com` unless noted.

| Namespace (tier) | App | Role | Storage / notes |
|---|---|---|---|
| `iis-ai-data` | **postgres + pgvector** | relational + **vector DB** | RWO; the vector store for RAG |
| `iis-ai-data` | **mongodb** | document DB | RWO |
| `iis-ai-data` | **redis** | cache / queue | RWO |
| `iis-ai-data` | **minio** | S3 object store | RWO; console route `minio-console-…` |
| `iis-ai-ai` | **portkey** | **LLM gateway** | API-only, no UI (lesson #11) — route to LLM providers/models through it |
| `iis-ai-ai` | **langchain-server** | LangGraph agent server | UI is `/docs` (Swagger) |
| `iis-ai-system` | **vault** | secrets | dev mode, root token `Demo1234#` (demo only) |
| `iis-ai-system` | **keycloak** | app SSO/OIDC | for *apps*, not the OCP console |
| `iis-ai-system` | **mlflow** | experiment / model registry | |
| `iis-ai-ui` | **open-webui** | chat UI | **RWX cephfs** |
| `iis-ai-ui` | **n8n** | workflow automation | **RWX cephfs**, Postgres-backed; 15 demo workflows in `migration/` |
| `iis-ai-ui` | **grafana** | dashboards | |
| `iis-ai-ui` | **cloudbeaver** | DB web client | finish setup wizard <1h or restart (lesson #10) |
| (all) | **namespaces** | the 5 namespaces below | sync wave 1 |

Namespaces: `iis-ai-ai` (gateway/agents) · `iis-ai-ui` (user-facing) · `iis-ai-data` (stateful) ·
`iis-ai-system` (platform glue) · `iis-ai-vms` (KubeVirt, if used).

## 6. Inference / model-serving reality

- **No GPU anywhere.** RHOAI/KServe serve **CPU-only**. Inference apps (`vllm`, `llama`) are **parked**
  by default — see `gitops/config/inference/`.
- Design for **small / quantized** models (e.g. ≤7–8B Q4 GGUF, embeddings models, small rerankers) or
  call **external LLM APIs through the in-stack `portkey` gateway**. Do **not** assume large-model local
  serving — it will be slow or infeasible.
- pgvector (in `iis-ai-data` Postgres) is the supported vector store for RAG.

## 7. Hard constraints for any solution designed for this stack

1. **No GPU** → CPU-only inference; small/quantized models or external APIs via `portkey`.
2. **RWX requires `ocs-storagecluster-cephfs`**; default class is RWO `ceph-rbd`.
3. **Self-signed wildcard TLS** — no public CA; in-cluster clients should trust the ingress CA or skip verify for demos.
4. **Compact 3-node** — no dedicated workers; respect that control-plane shares the nodes. No node has a special role to schedule onto.
5. **VIPs are platform-managed**, not MetalLB. Extra `LoadBalancer` svcs need a reserved MetalLB pool.
6. **Service Mesh members** exposing routes need `maistra.io/expose-route: "true"`; any `serviceAccountName` needs the SA + SCC binding (lessons #4, #12).
7. **GitOps is the deploy path** — everything ships as an ArgoCD `Application` under `gitops/apps/applications.yaml` (waves 1–4), not `oc apply` by hand. Removing an app must also delete its orphaned resources (lesson #35).
8. **Namespaces are fixed** (`iis-ai-*`). New workloads land in the matching tier; they do **not** invent new namespaces casually.
9. **Keep it generic** — demo/product-specific apps (DCIM/Sunbird) live in the separate `iis-dcim` repo / `iis-ai-dcim` namespace, **not** here.
10. **Reuse what's running** — Postgres+pgvector, Redis, MinIO/S3, MLflow, Keycloak, Vault, portkey, n8n are already in-cluster. Prefer them over new infra.

---

## 8. Prompt block — paste this into a future AI solution prompt

```text
TARGET RUNTIME — design strictly for this existing stack. Do not assume any
capability not listed here.

PLATFORM
- OpenShift 4.21.6, compact 3-node (each node control-plane + worker). OVN-Kubernetes.
- Cluster ocp419 / domain crucible.iisl.com. Apps at
  https://<route>-<namespace>.apps.ocp419.crucible.iisl.com (self-signed wildcard TLS).
- Deploy via GitOps ONLY: add an ArgoCD Application to gitops/apps/applications.yaml
  (App-of-Apps, sync waves 1-4) in repo sankat447/ai-demo-stack-baremetal. No manual oc apply.

HARDWARE CEILING
- 3x Dell VxRail E560F: 20C/40T Xeon Gold 6242R + ~187 GiB RAM each. NO GPU anywhere.
- ~9.6 TB raw SSD via ODF/Ceph (replica-3 => ~3.2 TB usable), shared with control plane.

STORAGE (set storageClassName explicitly when not default)
- ocs-storagecluster-ceph-rbd  : RWO block, DEFAULT (databases, single-writer)
- ocs-storagecluster-cephfs    : RWX file (shared/multi-pod volumes)
- ocs-storagecluster-ceph-rgw / openshift-storage.noobaa.io : S3 via ObjectBucketClaim
- In-stack MinIO (iis-ai-data) : app-facing S3

NAMESPACES (use the matching tier; do not invent new ones)
- iis-ai-ai (LLM gateway / agents), iis-ai-ui (user-facing UIs),
  iis-ai-data (postgres+pgvector, mongodb, redis, minio),
  iis-ai-system (vault, keycloak, mlflow), iis-ai-vms (KubeVirt).

REUSE THESE RUNNING SERVICES (don't add duplicates)
- LLM access: portkey gateway (iis-ai-ai, API-only) -> external model providers.
- Vector store: PostgreSQL + pgvector (iis-ai-data).
- Also available: redis, mongodb, MinIO/S3, mlflow, keycloak (app OIDC),
  vault (dev), n8n (workflows), open-webui (chat UI), langchain-server (LangGraph),
  grafana, cloudbeaver.
- Model serving: RHOAI / KServe RawDeployment, CPU-ONLY. Pipelines: Tekton. Mesh: Istio (optional).

INFERENCE CONSTRAINT
- CPU-only. Use small/quantized models (<=7-8B Q4, embeddings, small rerankers) OR
  call external LLM APIs through portkey. Do NOT assume large local model serving.

PLATFORM GOTCHAS
- Self-signed TLS: trust the ingress CA or skip-verify in demos.
- Service-mesh apps with external routes need maistra.io/expose-route: "true".
- Any serviceAccountName needs the SA object + SCC binding (e.g. anyuid for fixed UIDs).
- VIPs are platform-managed; extra LoadBalancer svcs need a reserved MetalLB pool in 192.168.102.0/24.

OUT OF SCOPE
- Keep the stack generic. DCIM/Sunbird demo apps live in the separate iis-dcim repo
  (namespace iis-ai-dcim) — do not add product-specific objects to this stack.

DELIVERABLE EXPECTATION
- Provide Kubernetes/OpenShift manifests (Deployment/Service/Route/PVC/ConfigMap/Secret)
  wired into the GitOps App-of-Apps, with correct storageClassName, namespace, and the
  gotchas above handled. Target CPU-only resource requests/limits that fit the node budget.
```
