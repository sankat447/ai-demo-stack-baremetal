# Pre-wipe capture — custom apps & n8n workflows

> Captured **2026-06-18** from the live `ocp419` cluster *before* the bare-metal
> reinstall, so these custom apps can be **redeployed fresh** and the n8n
> workflows re-imported. Manifests are cleaned (no `status`, `uid`,
> `resourceVersion`, `managedFields`, namespace) so they re-apply onto the new
> cluster. Re-apply with `oc apply -n <ns> -f <dir>` after the namespaces exist.

## ⚠️ Secrets & sensitive notes
- `migration/**/secrets/` is **gitignored** — the one captured Secret
  (`sunbird-credentials`) lives there locally but will **not** be pushed.
  Re-create it on the new cluster from your password store, or copy the local
  file manually. **Rotate** these credentials since the cluster is being rebuilt.
- n8n **credentials are NOT exported** by `export:workflow` (n8n stores them
  separately, encrypted). Workflows referencing credentials will import but show
  "credential not found" until you re-create the credentials in the new n8n.

---

## aitp-ai (custom apps to redeploy fresh)

### `dctrack-chat-ui`  → route `dctrack-chat.apps...`
Static chat UI served by `nginxinc/nginx-unprivileged:1.27-alpine`. All content
is in ConfigMaps (HTML + nginx conf + prompt). No build, no secrets.
- `deployment`, `service`, `route`
- configmaps: `dctrack-chat-ui-html`, `dctrack-chat-ui-nginx`,
  `dctrack-chat-brs-html`, `dctrack-chat-prompt-html`
- *(Note: namespace also had `dctrack-chat-prompt` and `dctrack-template`
  ConfigMaps not referenced by the deployment — grab separately if needed.)*

### `sunbird-mcp-server`  → routes `sunbird-mcp.apps...`, `dcim-mcp-api.apps...`
DCIM MCP server (Node 20, Express, `@modelcontextprotocol/sdk`). **Internally
built image** (`Binary + Docker` build) — the build context was lost with the
cluster, so it's **reconstructed** under `source/`:
- `deployment`, `service` (+ `-headless`), both `route`s
- configmaps: `sunbird-mcp-config`, `sunbird-mcp-code` (legacy `index.js`)
- `buildconfig`/`imagestream`: `sunbird-mcp-build`, `sunbird-mcp-server`
- **secret** `sunbird-credentials` (gitignored)
- `source/` — **reproducible build**:
  - `dist/` (268 files) — the actual compiled output pulled from the running pod
  - `package-lock.json` — world-readable, full dependency tree
  - `package.json.reconstructed` — rebuilt from lock + image metadata
    (the real `package.json` was mode 0600 / unreadable under the OpenShift UID)
  - `Dockerfile.reconstructed` — from image metadata: node 20.20.2, user `nodejs`,
    workdir `/app`, `CMD ["node","dist/main.js"]`, `NODE_ENV=production`,
    `MCP_PORT=8080`, port 8080
  - `index.js` — verbatim copy of the `sunbird-mcp-code` ConfigMap

  **Rebuild:** rename the two `*.reconstructed` files to `Dockerfile` /
  `package.json`, then:
  ```
  oc -n aitp-ai new-build --strategy=docker --binary --name=sunbird-mcp-server
  oc -n aitp-ai start-build sunbird-mcp-server --from-dir=source/ --follow
  oc -n aitp-ai apply -f deployment-sunbird-mcp-server.yaml
  ```
  The captured `dist/` runs as-is; you do not need to recompile TypeScript.

---

## aitp-ui (custom apps to redeploy fresh)

### `dctrack-chat-ui`  *(no route — internal/embedded)*
`nginxinc/nginx-unprivileged:alpine`. configmaps: `dctrack-chat-ui`,
`dctrack-chat-nginx-conf`. `deployment`, `service`.

### `rack-inventory-chat`  → route `rack-inventory-chat.apps...`
`nginxinc/nginx-unprivileged:alpine`. configmaps: `rack-inventory-chat-html`,
`rack-inventory-chat-nginx`. `deployment`, `service`, `route`.

---

## n8n workflows (for re-import into fresh n8n)

Source: n8n **2.25.7**, Postgres backend (`aitp-postgres-primary.aitp-data`).
**15 workflows** exported via `n8n export:workflow --all`.

- `n8n/n8n-workflows.json` — single bundle (import all at once)
- `n8n/workflows-separate/<id>.json` — one file per workflow (selective import)

**Re-import on the fresh n8n:**
```
# bundle (all 15):
oc -n <ns> cp n8n-workflows.json <n8n-pod>:/tmp/wf.json
oc -n <ns> exec <n8n-pod> -- n8n import:workflow --input=/tmp/wf.json
# or per-file from a copied dir:
oc -n <ns> exec <n8n-pod> -- n8n import:workflow --separate --input=/tmp/wfsep
```

| Workflow | id | nodes | active |
|---|---|---:|:--:|
| Rack Equipment Inventory - Image to Excel (Portkey Edition) | KshP3yOIpExW2ZeptkRsu | 17 | |
| Simple Test | 9qevrpZBgXycGxx5 | 2 | |
| Create Support Ticket | ToEQZ3cQF6h12T5X | 3 | |
| DCIM-Alert-Ingestion-Router | n3zXfCEVDcDfPxaB | 13 | |
| SFM PDF to Excel Converter | QTjGgVIJQhBWH84Y | 11 | |
| DCIM-Asset-Reconciliation | 42b0SdMFtr7rQA2I | 12 | |
| DCIM-PUE-Thermal-Monitor | KFsz5u04EYNTdLLE | 12 | |
| RAG Knowledge Search | e7fXwJI9ZZkXeTdB | 4 | |
| Sunbird MCP Server - Complete Test | KyPLfThtpSriGgJniJiZ2 | 11 | |
| Sunbird DCIM AI Assistant v2 (Dynamic MCP) | HeeaSeveP67DepnRYJKyw | 12 | ✅ |
| IIS Tech – Rack Discovery to dcTrack (Integrated) | FI-EkrRXrkE4NOmAtcnlu | 28 | ✅ |
| ITIL AI Agentic Server Patching Workflow | m0m4mQ6cNz9g0BE9 | 43 | |
| dcTrack AI Assistant - Main Workflow V1.0 | HuddMiD3koVfmIB6 | 11 | |
| dcTrack AI Assistant - Main Workflow v2.0 | LoYL8X7pAzxKBMOn | 15 | |
| My workflow | oDuHprFdD9XxhtV2Iz7Ln | 13 | |

> The two **active** workflows (Sunbird DCIM AI Assistant v2, IIS Tech Rack
> Discovery) are the production ones — re-activate them first after import and
> after their credentials + the Sunbird MCP server are back up.
