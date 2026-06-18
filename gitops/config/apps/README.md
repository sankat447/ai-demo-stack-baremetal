# gitops/config/apps — child ArgoCD Applications (one file per app)

The App-of-Apps root (`gitops/bootstrap/root-app.yaml`) recurses this directory
and creates one ArgoCD `Application` per `*.yaml`. This is where the ~28-app
stack lands, ported from the AWS repo with the bare-metal translations.

**Status: not yet ported.** The old cluster's ArgoCD never actually synced these
(its App-of-Apps pointed at a placeholder repo), so each app's manifests are
being authored fresh — grounded in `sankat447/ai-demo-stack-aws/gitops` and the
live-cluster reality captured in `migration/` — once the cluster is up.

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

## Planned apps (28)
open-webui · n8n · langchain-server (LangGraph) · portkey · vault · keycloak ·
mlflow · mongodb · redis · minio · cloudbeaver · grafana · jaeger/tempo · kiali ·
istio service mesh · llama-inference · vllm-runtime · postgres+pgvector · …
plus the custom apps from `migration/` (dctrack-chat-ui, rack-inventory-chat,
sunbird-mcp-server).
