# gitops/ — ArgoCD App-of-Apps tree

```
gitops/
├── bootstrap/
│   └── root-app.yaml          # the App-of-Apps; ArgoCD syncs this, it syncs the rest
├── platform/                  # cluster operators + their CRs (applied by postinstall/)
│   ├── 01-local-storage/      #   Local Storage Operator + LocalVolumeSet (1.6 TB SSDs)
│   ├── 02-odf/                #   ODF operator + StorageCluster (RWO/RWX/S3)
│   ├── 03-metallb/            #   MetalLB + IPAddressPool (extra LB svcs only)
│   ├── 04-service-mesh/       #   Istio / OpenShift Service Mesh operator
│   └── 05-rhoai/              #   Red Hat OpenShift AI + DataScienceCluster (CPU-only)
└── config/
    ├── namespaces.yaml        # iis-ai-ai / -ui / -data / -system / -vms
    └── apps/                  # one ArgoCD Application per app (28-app stack — TODO)
```

## Order of operations
1. `postinstall/01-storage.sh` — applies `platform/01-local-storage` then
   `platform/02-odf`, waiting for operators + the StorageCluster to go Ready.
2. `postinstall/02-metallb.sh` — applies `platform/03-metallb`
   (**confirm the IP pool range first**).
3. `postinstall/03-gitops.sh` — installs OpenShift GitOps, applies
   `config/namespaces.yaml`, then `bootstrap/root-app.yaml`. From here ArgoCD
   owns `config/apps/`.
4. `postinstall/04-identity.sh` — htpasswd admin now; Keycloak/RH-SSO OIDC later.
5. Service Mesh + RHOAI (`platform/04`, `platform/05`) can be applied by GitOps
   as platform Applications, or manually during bring-up.

## Conventions
- **Platform vs config:** `platform/` = things that need cluster-admin and a
  specific apply order (operators, storage). `config/` = everything ArgoCD can
  reconcile freely once operators exist.
- **Version pinning:** operator channels target **OCP 4.21** (ODF `stable-4.21`).
- **VIPs are platform-managed**, not MetalLB (lesson #20).
