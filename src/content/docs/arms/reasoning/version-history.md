---
title: Reasoning Arm Version History
description: How Pepa's Reasoning Arm is evolving
template: doc
sidebar:
  label: Version History
draft: false
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

This is a record of Pepa deployments. Currently under construction, more structure and details will follow.

Far shorter than the [Sensory Arm's](/arms/sensory/version-history/), and that is
itself informative: this arm has changed rarely. It sat out the Apple-STT
migration, the ChromaDB relocation, and most of the model churn that reshaped
Sensory across six versions.

A caveat on sourcing. Because changes here were recorded as they affected the
Sensory Arm's escalation tier, most of what is known about this box currently
lives in *that* history. The entries below are reconstructed from it. Where an
entry is thin, it is thin because the record is, not because nothing happened.

### RV2 (current)

*Extended tier serving `qwen3.6-27b-8bit` under rapid-mlx.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** rapid-mlx, OpenAI-compatible endpoint

**Model:** `qwen3.6-27b-mlx-8bit`, qwen3_coder_xml parser

**What changed:** Escalation/extended-tier model swapped from `gemma-4-26b` to
`qwen3.6-27b-mlx-8bit` on a recommendation — under evaluation. A
`wyoming-apple-speech` install is parked on this host but **not in the path**;
it belongs to the Sensory Arm's STT experiments, not to reasoning.
Version alignment: as of 2026-08-10 both hosts run rapid-mlx 0.12.7; the earlier
skew against mmm4 is closed.

### RV1

*Inference backend switched from Ollama to rapid-mlx.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** rapid-mlx (replacing Ollama)

**What changed:** Moved to rapid-mlx for backend consistency with mmm4 — the same
switch applied across both hosts at once, so this arm and the Sensory Arm have
shared an inference stack since.

### RV0

*Ollama on the Mac Studio, serving the escalation tier.*

**Host:** Mac Studio M1 Ultra, 64 GB

**Serving:** Ollama

**Model:** `gemma-4-26b`

**What changed:** The original standing-up of the arm as a network-reachable
inference endpoint for queries the local Sensory model punted on.

