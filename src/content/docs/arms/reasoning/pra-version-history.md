---
title: Pepa Reasoning Arm Version History
description: How Pepa's Reasoning Arm evolved — the escalation tier on the Mac Studio, version by version, with what changed and why.
template: doc
sidebar:
  label: PRA Version History
draft: false
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

This is a record of Pepa deployments. Currently under construction, more structure and details will follow.

Shorter than the [Sensory Arm's](/arms/sensory/psa-version-history/), which is itself informative:
for most of its life this arm changed rarely. It sat out the Apple-STT migration, the ChromaDB
relocation, and most of the model churn that reshaped Sensory across six versions. That changed in
October 2026. In a few weeks the Studio went from one model started by hand to something closer to a
small inference server: several models in sized slots, a text-to-speech endpoint, and a single door
in front of them, still under evaluation.

A caveat on sourcing. Because changes here were recorded as they affected the
Sensory Arm's escalation tier, most of what is known about this box currently
lives in *that* history. The entries below are reconstructed from it. Where an
entry is thin, it is thin because the record is, not because nothing happened.
From RV3 on, entries come from this arm's own records.

### RV4 (current)

*One door in front of the slots: llama-swap, under evaluation.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** rapid-mlx 0.16.8 behind llama-swap, a model-routing proxy, listening on port 7999
(`http://192.168.10.5:7999/v1`). Clients see one OpenAI-compatible endpoint. Each rapid-mlx instance
listens on loopback only, so nothing can bypass the door. There are three slot groups (large, middle,
small), one model loaded per slot, and slots never evict each other.

**Model:** Large slot: `qwen3.8-27b-4bit` or `muse-glimmer-30b-4bit`. Middle slot:
`gemma-4-12b-qat-4bit`. Small slot: `gemma-4-e2b-4bit`.

**What changed:** RV3's slots had to be managed by hand, and clients such as OpenCode wanted a single
endpoint. On 2026-10-23 a proxy at port 7999 was decided on. It was first planned as a new `mlxsw`
service, but llama-swap turned out to do the same job and could replace `mlxsw` entirely, leaving
nothing of ours to maintain. The rule throughout: as long as rapid-mlx stays, the design follows
rapid-mlx's constraints, and the proxy only routes.

Each model was tested alone through the proxy (chat, streaming, a tool call, unload) and passed. The
proxy added no measurable overhead: the same 200-token request took 7.24 s direct and 7.25 s through
the proxy, about 27.6 tokens/s. Memory did not budge. The OpenCode container was pointed at the proxy
the same day.

**Status:** under evaluation, no final decision. Not yet tested: two models swapping inside one slot,
and all three slots resident together in 64 GB. Not yet a boot-time service.

### RV3

*Extended tier moved to Qwen 3.8, the Studio's models arranged in slots, and a text-to-speech
endpoint added.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** rapid-mlx (0.16.0 as of 2026-10-12), OpenAI-compatible endpoint. rapid-mlx serves one
model per instance, so from 2026-10-20 the Studio's models are loaded into three slots (large,
middle, small) on ports 8000, 8001 and 8002 using `mlxsw`, a model switcher built for the purpose.
Endpoints that are not language models live in a separate port block starting at 8100.

**Model:** `qwen3.8-27b-4bit` (MTP build, qwen3_coder_xml parser). The earliest dated record is its
benchmark on 2026-10-09; it was serving as of 2026-10-12.

**What changed:** The extended-tier model moved from `qwen3.6-27b-mlx-8bit` to `qwen3.8-27b-4bit`.
The quantization changed as part of experimentation, to find out what fits for more accurate
inference. On 2026-10-12 eight candidate models were surveyed on this hardware. Speed was measured;
answer quality was not. With speculative decoding off, Qwen 3.8 wrote about 24 tokens/s, and the
smaller mixture-of-experts models wrote 2–5× faster.

Also on 2026-10-20, `pepa-tts` was deployed on this host as its first non-language-model endpoint,
on port 8100. It is a Piper text-to-speech service. A requester sends text as a Markdown file and
gets back a WAV with metadata, or an error. It runs on demand rather than staying resident, and is
started by hand.

### RV2

*Extended tier serving `qwen3.6-27b-8bit` under rapid-mlx.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** rapid-mlx, OpenAI-compatible endpoint

**Model:** `qwen3.6-27b-mlx-8bit`, qwen3_coder_xml parser

**What changed:** Escalation/extended-tier model swapped from `gemma-4-26b` to
`qwen