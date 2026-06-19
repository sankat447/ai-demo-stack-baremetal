# Handoff prompt — Sunbird/DCIM MCP server → `iis-dcim` repo

Paste the block below into a fresh Claude Code session opened in the new
`iis-dcim` repo. It is self-contained.

---

You are setting up a **new independent repository `iis-dcim`** (remote:
`https://github.com/sankat447/iis-dcim.git`) for the **Sunbird DCIM MCP server** —
a Model Context Protocol (MCP) server that exposes Sunbird **dcTrack** + **PowerIQ**
(data-center infrastructure management) tools over HTTP. It must be built into a
clean repo and deployed to our existing on-prem OpenShift cluster.

## Background
This MCP server already ran on a previous cluster but only ever existed as an
OpenShift *binary Docker build* — there is **no source repo**; the build context
was lost. During a bare-metal cluster rebuild it was **reconstructed** from the
running pod (real compiled `dist/`, the lockfile) plus image metadata, and parked
for a dedicated effort — this one. Your job: give it a proper home in `iis-dcim`,
build it cleanly, and deploy it.

## Reconstructed artifacts (read these first — they're on this same machine)
All under: `/Users/sanjeevkumar/GitHub/ai-demo-stack-baremetal/migration/iis-ai-ai/sunbird-mcp-server/`
- `source/dist/`              — the real compiled JS (Node, 268 files; entry `dist/main.js`)
- `source/package-lock.json`  — full dependency tree (authoritative)
- `source/package.json.reconstructed` — rebuilt manifest (the original was mode 0600/unreadable)
- `source/Dockerfile.reconstructed`   — from image metadata (node 20.20.2, USER nodejs, CMD `node dist/main.js`)
- `source/index.js`           — verbatim copy of the legacy `sunbird-mcp-code` ConfigMap (older single-file source)
- `deployment-sunbird-mcp-server.yaml`, `service-…`, `route-sunbird-mcp.yaml`, `route-sunbird-mcp-api.yaml`
- `configmap-sunbird-mcp-config.yaml`, `configmap-sunbird-mcp-code.yaml`
- `buildconfig-*.yaml`, `imagestream-*.yaml`
- `secrets/secret-sunbird-credentials.yaml`  — **gitignored / may be local-only; recreate from your password store**
- See also `gitops/CUSTOM_APPS.md` and `migration/README.md` in that repo.

## Tech facts (from the reconstructed image + manifests)
- Runtime: **Node 20.20.2**, `WORKDIR /app`, `USER nodejs`, `CMD ["node","dist/main.js"]`, `NODE_ENV=production`
- Listens on **port 8080** (`MCP_PORT=8080`, container port name `http`)
- Deps: `@modelcontextprotocol/sdk`, `express`, `axios`, `zod`, `node-cache`, `pino`, `pino-pretty`, `dotenv`
- Tool groups in `dist/tools/`: `dctrack/`, `poweriq/`, `combined/` (DCIM read + write tools)
- **Config** (ConfigMap `sunbird-mcp-config`, non-secret): `DCTRACK_BASE_URL`, `MCP_HOST`, `MCP_PORT`,
  `MCP_SERVER_NAME`, `NODE_ENV`, `LOG_LEVEL`, `CACHE_ENABLED`, `CACHE_TTL_SECONDS`,
  `SUNBIRD_TIMEOUT`, `SUNBIRD_REJECT_UNAUTHORIZED`
- **Secret** (`sunbird-credentials`, sensitive): `DCTRACK_BASE_URL`, `POWERIQ_BASE_URL`,
  `SUNBIRD_BASE_URL`, `SUNBIRD_USERNAME`, `SUNBIRD_PASSWORD`
- Deployment uses `envFrom: [secretRef: sunbird-credentials, configMapRef: sunbird-mcp-config]`, SA `default`

## Target cluster (already running — do NOT reinstall)
- OpenShift **4.21.6**, API `https://api.ocp419.crucible.iisl.com:6443`
- Admin kubeconfig: `/Users/sanjeevkumar/GitHub/ai-demo-stack-baremetal/install/_artifacts/auth/kubeconfig`
  (`export KUBECONFIG=…`; or `oc login` as kubeadmin). Confirm with `oc whoami`.
- Deploy into namespace **`iis-ai-ai`** (already exists; the rest of the AI stack — portkey,
  langchain, open-webui, n8n — is already running and can consume this MCP).
- Internal registry image target: `image-registry.openshift-image-registry.svc:5000/iis-ai-ai/sunbird-mcp-server:latest`
- Target Routes (edge TLS) — already defined in the captured manifests:
  - MCP: `https://sunbird-mcp.apps.ocp419.crucible.iisl.com`
  - API: `https://dcim-mcp-api.apps.ocp419.crucible.iisl.com`

## Your tasks
1. **Initialize `iis-dcim`** with a clean, sensible layout (e.g. `src/` or `dist/`, `Dockerfile`,
   `k8s/` for the manifests, `README.md`, `.gitignore` that excludes secrets). Set the git remote
   to `https://github.com/sankat447/iis-dcim.git`. Commit only when asked.
2. **Bring in the app**: copy `dist/`, `package.json` (rename `package.json.reconstructed`),
   `package-lock.json`, and `Dockerfile` (rename `Dockerfile.reconstructed`) from the artifacts path.
   Decide with the user whether to also recover/rebuild from TypeScript source later — the captured
   `dist/` runs as-is and is sufficient to deploy now.
3. **Build the image** on-cluster (the proven path):
   ```
   export KUBECONFIG=/Users/sanjeevkumar/GitHub/ai-demo-stack-baremetal/install/_artifacts/auth/kubeconfig
   oc -n iis-ai-ai new-build --strategy=docker --binary --name=sunbird-mcp-server
   oc -n iis-ai-ai start-build sunbird-mcp-server --from-dir=. --follow
   ```
4. **Create the credentials Secret** `sunbird-credentials` in `iis-ai-ai` from the user's real
   dcTrack/PowerIQ/Sunbird endpoints + creds (keys listed above) — never commit it.
   Apply the `sunbird-mcp-config` ConfigMap (non-secret values).
5. **Deploy**: apply the Deployment/Service/Routes from the captured manifests (port 8080, `envFrom`
   secret+configmap). Confirm the pod is Running and both Routes respond (an MCP server may return
   404/406 on `/` — verify the MCP/health/SSE endpoint the code actually serves, see `dist/transport/http.js`).
6. **Verify the MCP works**: exercise a dcTrack/PowerIQ tool through the MCP endpoint, and confirm an
   in-cluster client (e.g. open-webui/n8n/langchain via portkey) can reach
   `http://sunbird-mcp-server.iis-ai-ai.svc:8080`.
7. Write a real `README.md` (what it is, build/deploy, the two URLs, config/secret keys).

## Gotchas / lessons (carried over)
- The original `package.json` was unreadable (mode 0600 under OpenShift's arbitrary UID); the
  `.reconstructed` one was built from `package-lock.json` + image metadata — verify before trusting a
  `tsc` rebuild. The captured `dist/` is the genuine running output.
- This is an internally built image — it dies with the cluster. Keep this repo as the durable source.
- OpenShift arbitrary-UID: the image runs as `nodejs`; if you hit permission issues, the deployment
  used SA `default` and ran fine — no anyuid needed previously.
- Don't deploy to the wrong namespace; everything keys off `iis-ai-ai`.

Start by reading the artifacts at the path above and `oc whoami` against the cluster, then propose
the `iis-dcim` repo layout before copying anything.
