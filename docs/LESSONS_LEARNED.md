# Lessons Learned — ai-demo-stack-baremetal

Two sections: **(A)** patterns carried over verbatim from the AWS build
(`sankat447/ai-demo-stack-aws` → `docs/LESSONS_LEARNED.md`) that still bite on
bare metal, and **(B)** new lessons surfaced during *this* build. Append to (B)
the moment something new bites — that discipline is why the AWS second install
went smoothly.

---

## A. Carried over from AWS (still apply)

> Numbering keeps the original AWS IDs so cross-references line up.

**#4 — Service Mesh STRICT mTLS + NetworkPolicy needs `maistra.io/expose-route`.**
Any deployment in a mesh-member namespace whose Route must be reachable from the
OCP router MUST carry `maistra.io/expose-route: "true"` on the **pod template**.
Without it the TLS handshake completes but routing silently times out. (Platform-
independent — applies identically here.)

**#7 — StorageClass parameters are immutable.** Changing parameters (on bare
metal: Ceph `monitors`, `pool`, `fsName`, etc.) requires
`oc delete storageclass X && oc apply`, not `oc apply` alone.

**#9 — PVC zombies survive a storage rebuild.** If you wipe the storage backend
(here: re-provision ODF/Ceph), PVs referencing old volume handles linger as
`Bound` and pods hang in `ContainerCreating`. Delete the PVC/PV and remove the
finalizer to free them. Especially relevant because **this whole project is a
storage-backend rebuild** (local-nvme → ODF).

**#10 — CloudBeaver self-locks after 1 h** if the admin setup wizard wasn't
completed. `oc rollout restart deploy/cloudbeaver` unlocks it.

**#11 — Several apps are API-only / have no UI** — don't report them as broken
in team docs: `portkey` (gateway; dashboard is a separate product),
`langchain-server`/LangGraph (use `/docs` Swagger), `prometheus-k8s` &
`alertmanager-main` (UIs moved to OCP Console → Observe), `istio-ingressgateway`
(mesh-internal; `503` on `/` is normal).

**#12 — `serviceAccountName` requires the SA object + SCC binding.** Any
Deployment with `serviceAccountName: foo` must also ship `kind: ServiceAccount`.
If the pod runs as a fixed non-default UID (e.g. n8n as 1000), add a RoleBinding
to `system:openshift:scc:anyuid`.

**#15 — Targeted teardown must include all dependents.** (If we ever script
teardown.) Anything that interpolates X's outputs must be torn down with X, or
it blocks the chain. On bare metal this maps to ArgoCD App-of-Apps ordering and
finalizers rather than terraform `-target`.

> AWS-only lessons #1,#2,#3,#5,#6,#8,#13,#14 do **not** apply (VPC/IAM/RDS/
> openshift-install-destroy specifics). The #3 (use `awk` not BSD `sed` for
> multi-line injection) and #8/#14 (`grep -E`) hygiene tips are still good
> practice generally.

---

## B. New — bare-metal build (append as they surface)

**#16 — These are VxRail appliances, not plain PowerEdge.** 3× VxRail E560F.
Going bare-metal means abandoning VxRail Manager + vSAN; the data SSDs must be
wiped for ODF, and there's no VxRail support story afterward. (docs/HARDWARE_INVENTORY.md)

**#17 — No GPUs.** RHOAI/KServe/vLLM/llama-inference run **CPU-only** on Xeon
Gold 6242R. Size model serving to small quantized models or add a GPU node;
this diverges from the GPU assumptions in the AWS stack.

**#18 — Match disks by MODEL, never `sdX`.** Device letters differ across the
three nodes already (boot drive is `sdb` on node1, `sdc` on node2, `sda` on
node3). `rootDeviceHints.model: "DELLBOSS VD"` is uniform and stable; ODF device
selection must likewise use model/WWN/by-path. (docs/HARDWARE_INVENTORY.md)

**#19 — Bond is active-backup, not LACP.** The two 10G ports go to a switch pair
(SW1/SW2) that is **not** presented as one MLAG peer, so the host bond is
`mode: active-backup`. agent-config models bond0 accordingly; OVN's `br-ex` is
auto-created on top — do not hand-define br-ex.

**#20 — VIPs are platform-managed, not MetalLB.** The bare-metal platform runs
keepalived/haproxy on-node for the api + ingress VIPs
(`loadBalancer.type: OpenShiftManagedDefault`). MetalLB is only needed for
*extra* `LoadBalancer` services and must use a non-overlapping pool in
192.168.102.0/24. Don't double-assign the VIPs.

**#21 — Internally-built images die with the cluster.** `sunbird-mcp-server`
was an OpenShift `Binary + Docker` build — the build context (Dockerfile,
real `package.json`) is stored **nowhere** in the cluster. Before any wipe,
capture the running image's artifacts: pull `dist/` + `package-lock.json` from
the pod, and reconstruct the Dockerfile from `oc get istag … -o jsonpath`
`.image.dockerImageMetadata.Config` (gives User/WorkDir/Cmd/Env/Ports). See
migration/README.md.

**#22 — Files written by the image build can be mode 0600.** `package.json` in
the sunbird pod was `-rw-------` owned by `nodejs`; under OpenShift's arbitrary
UID our `oc exec`/`oc cp` couldn't read it, and `oc debug --as-root` was blocked
by SCC. Workaround: reconstruct from the world-readable `package-lock.json` +
image metadata. World-readable files (`package-lock.json`, `dist/`) copy fine.

**#23 — `n8n export:workflow` does NOT export credentials.** Credentials are
stored separately and encrypted; exported workflows import but show "credential
not found" until you recreate the credentials on the fresh n8n. Export workflows
**and** plan a credential re-entry pass. n8n here is Postgres-backed
(`iis-ai-postgres-primary.iis-ai-data`); the CLI export works regardless of backend.

**#24 — Boot mode must be UEFI.** RHCOS on these E560F nodes installs only under
UEFI; set the one-time virtual-CD boot in UEFI mode and **eject the media after
install** so reboots don't loop back into the installer. (install/boot-instructions.md)
