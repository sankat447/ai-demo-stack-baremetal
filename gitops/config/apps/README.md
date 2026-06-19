# gitops/config/apps — child ArgoCD Applications (one file per app)

These are per-app `Application` manifests — the granular, one-file-per-app
layout, ported from the AWS repo with the bare-metal translations.

> **Authoritative source:** the live App-of-Apps is
> [`gitops/apps/applications.yaml`](../../apps/applications.yaml) (the root-app at
> `gitops/bootstrap/root-app.yaml` points at `gitops/apps` with `recurse:false`).
> The 13 files here mirror those same workloads for reference/granular edits but
> are **not** synced on their own — edit `applications.yaml` to change the live
> tree, and keep these in step.

**Status: ported.** Data/AI/system/UI tiers are wired into the App-of-Apps
(`gitops/apps/applications.yaml`, **14 apps**, waves 1–4). Inference is parked
(`gitops/config/inference/`). DCIM/demo-specific apps live in the separate
`iis-dcim` repo (namespace `iis-ai-dcim`) — this stack stays generic.

## Translation rules when porting each app (from the brief)
- **AWS S3 → MinIO** (already in-stack) or ODF RGW/NooBaa S3.
- **AWS EFS (RWX) → `ocs-storagecluster-cephfs`** (open-webui, n8n need RWX).
- **AWS EBS (RWO) → `ocs-storagecluster-ceph-rbd`**.
- **Aurora Postgres → CloudNativePG / Crunchy Postgres** in `iis-ai-data` (pgvector).
- **ECR → internal OCP registry**; **IRSA/IAM → ServiceAccounts + Roles**.
- Drop AWS-only bits: cluster autoscaler, budget/cost Lambdas, IAM/CCO.
- Namespaces: `aitp-* → iis-ai-*`.
- Mesh-member apps with externally-reachable Routes need
  `maistra.io/expose-route: "true"` on the pod template (lesson #4).
- Any `serviceAccountName` needs the SA object + SCC binding (lesson #12).

## Deployed now (14 ArgoCD apps, waves 1–4)
namespaces · postgres+pgvector · mongodb · redis · minio · portkey ·
langchain-server (LangGraph) · vault · keycloak · mlflow · open-webui · n8n ·
grafana · cloudbeaver

## Parked / platform layers (not in the App-of-Apps yet)
jaeger/tempo · kiali · istio service mesh (`platform/04`) · RHOAI/KServe
(`platform/05`) · llama-inference · vllm-runtime (`config/inference/`, no GPU).
DCIM/Sunbird apps (dctrack-chat-ui, rack-inventory-chat, sunbird-mcp) → separate
`iis-dcim` repo.
