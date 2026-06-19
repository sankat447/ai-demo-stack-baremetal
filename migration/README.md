# Pre-wipe capture — n8n workflows

> Captured **2026-06-18** from the live cluster before the bare-metal rebuild.
> The **DCIM/Sunbird demo apps** that were also captured here (dctrack-chat-ui,
> rack-inventory-chat, sunbird-mcp-server) have **moved to the separate
> `iis-dcim` repo** (`https://github.com/sankat447/iis-dcim.git`, namespace
> `iis-ai-dcim`) — this stack keeps only generic, reusable workloads.
> What remains here: the **n8n workflow export**, to re-import into the fresh n8n.

## n8n workflows (for re-import into fresh n8n)
Source: n8n **2.25.7**, Postgres backend (`iis-ai-postgres-primary.iis-ai-data`).
**15 workflows** exported via `n8n export:workflow --all`.

- `n8n/n8n-workflows.json` — single bundle (import all at once)
- `n8n/workflows-separate/<id>.json` — one file per workflow (selective import)

**Re-import on the fresh n8n (namespace iis-ai-ui):**
```
oc -n iis-ai-ui cp n8n-workflows.json <n8n-pod>:/tmp/wf.json
oc -n iis-ai-ui exec <n8n-pod> -- n8n import:workflow --input=/tmp/wf.json
```
> ⚠️ Credentials are NOT in the export (n8n stores them separately/encrypted) —
> recreate them inside n8n after import. Workflows that call the DCIM MCP/dcTrack
> will need the `iis-dcim` workloads deployed to function.

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
