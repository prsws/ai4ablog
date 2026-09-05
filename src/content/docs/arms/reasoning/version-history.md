---
title: The Reasoning Arm
description: Reasoning as a bounded, replaceable capability — the argument for why control never moves here, and an honest account of how little is actually built.
template: doc
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

In Pepa's architecture, the Reasoning Arm is not the system's ruler — it is its
cognitive engine. Its role is simple: interpret, suggest, and assist. It does not
decide, orchestrate, or execute. That authority belongs to the Head or is embedded
within the autonomy of any requesting Arm.

This separation is intentional.

By isolating reasoning as a replaceable, bounded capability, Pepa avoids the common
trap of overloading a single LLM instance with responsibility. The Reasoning Arm
suggests; the Head decides. The Reasoning Arm explores; the Head constrains. Think
of it as "Reasoning as a Service" — the Head, Beak, or any other Arm can request
that it think through something with a specific model as needed.

## What is actually built

Here is the honest version, because the section above describes a boundary rather
than a mechanism, and the two are at very different stages.

**We do not yet know how a Reasoning Arm is supposed to work.** So it starts as the
smallest thing that serves: a Mac Studio running an OpenAI-compatible inference
endpoint. Nothing more. No agent loop, no planner, no state, no orchestration.
A request goes in, a completion comes out.

That is less than the name suggests, and it is deliberate rather than
embarrassing. A box that answers inference requests and decides nothing **is** the
arm as specified — the whole architectural claim is that reasoning should be a
bounded capability behind an endpoint, deliberately stripped of authority. If it
were doing more, that would be the failure this design exists to avoid.

The real gap is not in the arm. It is that **the caller doesn't exist yet.**
"Reasoning as a Service" presumes a Head that requests reasoning, and the LangGraph
Head is unbuilt. Today the Mac Studio is reached by the Sensory Arm's escalation
path — a punt from the local model when it judges a query beyond itself — rather
than by an orchestrator asking for cognition. The service half is real. The
architectural half is waiting on the cognition plane.

What that means in practice: the boundary is decided, the mechanism is not. Nothing
below this line should be read as a settled design.

## Why this hardware

With the boundary in place, the hardware question becomes straightforward. The
Reasoning Arm needs reliable, low-latency local inference. Not a cluster. Not the
cloud. Just enough consistent compute to run modern language models well. Just as
important, it is not only a runtime — it is a testbed, because the field is
evolving rapidly.

We chose the Apple ecosystem (currently a single Mac Studio M1 Ultra with 64 GB
RAM) to keep things simple compared to discrete GPU setups. Its unified memory
design avoids the constant shuttling of data between CPU and GPU over PCIe, which
simplifies local inference workloads and many hardware choices.

The trade-off is lack of upgradeability, so initial RAM sizing matters. By
contrast, GPU-based systems offer more headroom and flexibility. Emerging options
like AMD's Strix Halo bridge the gap by combining unified memory with the openness
of the x86 ecosystem, which we are watching closely.

Frameworks like MLX (on Apple Silicon) and CUDA-based stacks (on NVIDIA) enable
rapid iteration on models, quantization strategies, and inference pipelines. This
keeps the Reasoning Arm adaptable without destabilizing the rest of the system.
Models can evolve, improve, or be replaced entirely, while the Head continues to
enforce the same constraints and orchestration logic.

In Pepa, intelligence is modular. Control is not.

## Version history

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

<!--
  TODO — José to fill in:
  - Acquisition date of the Mac Studio; whether it ran anything before Pepa.
  - Whether RV0 is really the beginning, or whether there was an earlier
    pre-Ollama state worth an RV-minus-one.
  - The versioning scheme itself (RV0/RV1/RV2) is a placeholder invented here to
    avoid colliding with PepaV0-V6, which numbers the whole system by way of the
    Sensory Arm. If a different scheme is wanted, rename before this page goes
    live — per CONVENTIONS.md the URL is permanent once published, but heading
    anchors are cheap to change while draft.
  - Any Reasoning-side changes not visible in the Sensory history.
-->

## Open questions

- **What does a Reasoning Arm actually do beyond serving completions?** Unanswered
  by design rather than by neglect. The current shape is a floor, not a target.
- **Who calls it?** Today, only the Sensory Arm's escalation path. The intended
  caller — the Head — does not exist yet.
- **Does it need state?** Serving completions is stateless. Whether reasoning
  worth the name requires memory of its own, or should stay stateless and read
  from the Memory Arm, is undecided.
- **Strix Halo and the x86 unified-memory path** — watched, not evaluated. No
  recon has been run.