# gitops/config/inference — model serving (PARKED, CPU caveats)

> ⚠️ **These manifests are intentionally NOT wired into the App-of-Apps sync.**
> The cluster has **no GPUs** (lesson #17). The AWS originals assumed a T4 GPU,
> Knative Serverless, and `nvidia.com/gpu` scheduling — none of which exist here.

What changed vs. the AWS versions:
- `deploymentMode: Serverless` → **`RawDeployment`** (we run KServe without
  Knative; see the RHOAI `DataScienceCluster` — `serving: Removed`).
- Removed all `nvidia.com/gpu` requests/limits, GPU tolerations, and the
  `nvidia.com/gpu.present` nodeSelector.
- `storageUri` repointed from AWS S3 to MinIO (`s3://rhoai-models/...`).
- Namespace `ai-demo` → `iis-ai-ai`.

### The honest limitation
`vllm-runtime` uses a CUDA image (`quay.io/modh/vllm`) that **will not run on
CPU**, and an 8B model on CPU is impractical for interactive use regardless.
Before enabling these you must either:

1. **Add a GPU node** (recommended) — then restore the GPU stanzas + a GPU vLLM
   image and flip the model serving back on; OR
2. **Swap to a CPU-viable path** — replace the ServingRuntime image with a
   CPU-capable server (e.g. a CPU vLLM build, llama.cpp, or run **Ollama** as a
   plain Deployment in `iis-ai-ai`) and serve a **small** model
   (e.g. `qwen2.5-0.5b`, `llama-3.2-1b`). open-webui/portkey already target an
   OpenAI-compatible endpoint, so a CPU OpenAI server drops in.

### To enable later
Add Applications for `vllm-runtime` and `llama-inference` to
`gitops/apps/applications.yaml` (wave 5, namespace `iis-ai-ai`), after RHOAI +
KServe (`platform/05-rhoai`) are healthy and a real model is staged in MinIO.
