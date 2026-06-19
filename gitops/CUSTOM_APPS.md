# Custom migrated apps — deployment notes

The three custom apps captured in `migration/` (pre-wipe) redeploy onto the
fresh cluster. Their cleaned manifests in `migration/` are reused directly as
GitOps desired-state (namespace is injected by each ArgoCD Application's
`destination.namespace`).

## Auto-synced by the App-of-Apps (wave 5)
Static nginx UIs — self-contained (HTML/conf in ConfigMaps), no image build, no
secrets:

| App | Namespace | Source path |
|---|---|---|
| `dctrack-chat-ui-ai` | iis-ai-ai | `migration/iis-ai-ai/dctrack-chat-ui` |
| `dctrack-chat-ui-ui` | iis-ai-ui | `migration/iis-ai-ui/dctrack-chat-ui` |
| `rack-inventory-chat` | iis-ai-ui | `migration/iis-ai-ui/rack-inventory-chat` |

## Manual — `sunbird-mcp-server` (needs an image build first)
Not in the App-of-Apps: it runs an internally-built image (the AWS-era image
died with the old cluster) and needs a Secret. Bring it up once, then ArgoCD can
adopt it.

```bash
# 1. build the image from the reconstructed source (see migration/README.md)
cd migration/iis-ai-ai/sunbird-mcp-server/source
mv Dockerfile.reconstructed Dockerfile
mv package.json.reconstructed package.json
oc -n iis-ai-ai new-build --strategy=docker --binary --name=sunbird-mcp-server
oc -n iis-ai-ai start-build sunbird-mcp-server --from-dir=. --follow

# 2. create the credentials Secret (gitignored — from your password store)
oc -n iis-ai-ai apply -f ../secrets/secret-sunbird-credentials.yaml   # local file

# 3. apply the rest (deployment/service/routes/configmaps)
oc -n iis-ai-ai apply -f ..   # the sunbird-mcp-server dir (excluding source/)
```

> The captured `dist/` is the real running output — no TypeScript recompile
> needed. After it's healthy you can add an ArgoCD Application for it, but keep
> the build + Secret steps manual (ArgoCD won't build images or hold secrets).

## n8n workflows
After the n8n app (wave 4) is up, import the 15 captured workflows — see
`migration/README.md`. Recreate credentials inside n8n (not exported), then
re-activate the two production workflows.
