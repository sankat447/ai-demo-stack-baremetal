#!/usr/bin/env bash
# 01 — Storage: Local Storage Operator → LocalVolumeSet → ODF StorageCluster.
# Produces RWO (ceph-rbd), RWX (cephfs), and S3 (RGW/NooBaa) storage classes.
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
preflight

info "=== Local Storage Operator ==="
oc apply -f "${GITOPS}/platform/01-local-storage/local-storage-operator.yaml"
wait_csv openshift-local-storage local-storage-operator

info "=== LocalVolumeSet (claims the 1.6 TB SSDs as block PVs) ==="
oc apply -f "${GITOPS}/platform/01-local-storage/localvolumeset.yaml"
info "waiting for localblock PVs to appear (one per SSD, expect ~6 across 3 nodes)..."
for i in $(seq 1 30); do
  n="$(oc get pv 2>/dev/null | grep -c localblock || true)"
  info "  localblock PVs: ${n}"
  [ "${n:-0}" -ge 3 ] && break
  sleep 10
done
[ "${n:-0}" -ge 3 ] || err "expected >=3 localblock PVs; got ${n:-0}. Check disks (lsblk) + LocalVolumeSet selectors."

info "=== ODF operator ==="
oc apply -f "${GITOPS}/platform/02-odf/odf-operator.yaml"
wait_csv openshift-storage odf-operator

info "=== ODF StorageCluster (Rook-Ceph internal) ==="
oc apply -f "${GITOPS}/platform/02-odf/storagecluster.yaml"
info "waiting for StorageCluster to be Ready (this takes several minutes)..."
oc -n openshift-storage wait --for=jsonpath='{.status.phase}'=Ready \
  storagecluster/ocs-storagecluster --timeout=900s \
  || err "StorageCluster not Ready — inspect: oc -n openshift-storage get storagecluster,cephcluster,pods"

info "=== resulting StorageClasses ==="
oc get sc
cat <<EOF

NEXT:
  - Set the default SC if desired (RWX cephfs for the stack):
      oc patch storageclass ocs-storagecluster-cephfs \\
        -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
  - Reminder (lesson #7): StorageClass params are immutable — to change one,
    'oc delete storageclass X && oc apply', never 'oc apply' alone.
  - Then run ./postinstall/02-metallb.sh
EOF
