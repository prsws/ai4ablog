---
title: Pepa Bench Notes - Sizing the Sensory and Reasoning Arms
description: A working session comparing model architecture, hardware tier, and the small-model roadmap for Pepa.
sidebar:
  label: Bench- Pepa Arm LLM Sizing
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge collaborative-mess">Collaborative Mess</span>
</p>

25-Jul-2026

*A working session comparing model architecture, hardware tier, and the small-model roadmap for Pepa, an AI aging-in-place cognitive assistant described at AI4Aging.org.*

## Why this session happened

Four `rapid-mlx bench` runs came in over the course of the conversation — two models on mmm4 (PSA - Pepa Sensory Arm), two on the Mac Studio (the Reasoning Arm) — plus a live production signal (>95% end-to-end task success on PSA over several days). Taken together they let us separate three things that are easy to conflate: model architecture, hardware tier, and context length. Each has a different effect on latency, and only one of them is actually the long-term constraint.

## The four benchmarks

| Machine | Model | Decode (short/long) | Prefill (short/long) | TTFT (short/long) |
| --- | --- | --- | --- | --- |
| mmm4 (M4, 24GB) | qwen3.5-9b-4bit (dense) | 21.36 / 20.64 tok/s | 215 / 210 tok/s | 2485 / 10227 ms |
| mmm4 (M4, 24GB) | gemma-4-e2b-4bit (sparse) | 67.35 / 65.18 tok/s | 2015 / 2088 tok/s | 264 / 1020 ms |
| Mac Studio (M1 Ultra, 64GB) | qwen3.5-9b-4bit (dense) | 74.52 / 73.03 tok/s | 437 / 466 tok/s | 1224 / 4617 ms |
| Mac Studio (M1 Ultra, 64GB) | gemma-4-31b-8bit (dense) | 14.56 / 14.28 tok/s | 105 / 109 tok/s | 5059 / 19537 ms |

## What the numbers say

**mmm4's decode tracks its memory-bandwidth roofline almost exactly** (~120 GB/s ÷ model size), on both models tested. No thrashing, no thermal roll-off between short and long buckets — the M4 is running at its physical ceiling, cleanly.

**The Mac Studio's decode sits at roughly half its theoretical roofline** on a single request stream (~800 GB/s), on both models tested. That's not a problem — UltraFusion's second die goes underused by one sequential consumer. It means the Studio has headroom for concurrency it isn't using today, not that it's underperforming.

**Architecture beat hardware tier outright.** The 24 GB Mac mini running the sparse e2b model was within 10% of the 64 GB Ultra on decode, and **4.6× faster on prefill and time-to-first-token**, running a model roughly a sixth the size. A well-matched small architecture on modest hardware beat a larger dense model on premium hardware, on the metric — responsiveness — that actually matters for a voice assistant.

**The dense 31B model on the Studio is the one number in this session that's actually concerning**: 19.5 second TTFT on long context, on the machine serving Hermes' agentic coding work. That's a plausible explanation for the previously-documented 900s Hermes timeout — not a client-side bug, but a dense model doing what dense models do under long prefill. It also produced a benign-but-real incident: benching a 31 GB model while a different 31 GB model was already resident briefly pushed the Studio to 129% projected memory utilization. It survived (weights are mmap'd read-only, so pages can be evicted and reread rather than swapped), but it wasn't margin — it was luck of allocation pattern.

## Decisions and map updates made this session

- **PSA's production model is now gemma-4-e2b-4bit**, replacing gemma-4-e4b-6bit. Verified clean over several days in llmfm (our custom monitoring application available at https://github.com/prsws/llm-fleet-monitor) with no thrashing, and >95% end-to-end task success in production — meeting or exceeding the prior model's quality at roughly 3× the decode speed and ~9× the prefill speed.
- **The Mac Studio's serving model is explicitly *not* settled**, and shouldn't be assumed in future sessions. Rapid-MLX can't hot-swap models, so José manually stops and starts the server per task: a dense model (e.g. gemma-4-31b-8bit) for reasoning work, the coder MoE (qwen3-coder-30b-a3b-instruct-8bit) for Hermes. This manual switching is a standing friction point, not a settled design.

## Where the wind is blowing (2026 → 2027 outlook)

Three trends currently favor Pepa's small-model strategy, and none of them require new hardware:

1. **Sparse MoE architectures are decoupling quality from active compute.** Gemma 4's E-series pattern (small active parameter count, larger effective quality) is the direct explanation for e2b's disproportionate prefill advantage over dense qwen3.5-9b on identical hardware. This is the lever most likely to keep improving through 2027.
2. **Quantization continues to compound.** Quantization-aware training is already shrinking 4B-class models to ~2.6 GB at int4 with quality held close to full precision. Effective capacity per gigabyte of RAM is still rising without any hardware change.
3. **The sub-4B quality curve hasn't flattened**, though it is decelerating. Current-generation small models are matching prior-generation models twice their size.

**The industry's own framing has moved to meet this architecture.** The current thinking on on-device agentic systems is that the model isn't doing open-ended reasoning — it's doing the same narrow jobs repeatedly (route, extract, decide, escalate). That's a description of the Sensory Arm punting to the head. "Edge" is a deployment tier, not a capability ceiling — Pepa's numbers already make that case.

**The actual long-term constraint is KV cache growth under long context, not model size or "edge" classification.** As context grows, the dominant memory cost shifts from model weights to the KV cache, and that cost scales linearly with sequence length — a model needing a couple of GB of KV at 4K tokens can need tens of GB at 128K. This reframes the hardware question:

- **mmm4 is safe well past 2027.** PSA's context is bounded by design (short turns, retrieved snippets, no accumulation), which is exactly the profile that unified memory handles gracefully. Small model, short context, cheap prefill — nothing here scales badly with time.
- **The Mac Studio is where pressure will land**, and it's a model-choice problem before it's a hardware problem. Agentic coding is the workload that accumulates context across turns and tool calls. Moving Hermes permanently to the coder MoE and capping context deliberately should relieve the squeeze on the hardware that's already there.
- **If a 2027 hardware spend is warranted, it belongs on the Reasoning Arm** (bandwidth and memory headroom for long-context concurrency), not on the Sensory Arm, which is already correctly matched to its job.

**What would invalidate this thesis:** if the open-weight ecosystem consolidates around models assuming 128GB+ and the sub-8B tier stops receiving frontier attention, or if agentic frameworks make very-long context table stakes rather than optional. Neither appears imminent, but both are worth watching for.

## Open threads (not resolved this session)

- What exactly the >95% PSA accuracy figure is measured against (bounded task success vs. softer quality read) — worth pinning down so future model swaps have a repeatable yardstick, and so context-widening experiments have a way to detect regression.
- Whether Qwen3.5-9B's multimodal build (vision encoder present in the file manifest) is worth investigating for the camera change-detection pipeline — Mac Studio class work, not mmm4.
- Benching `qwen3-coder-30b-a3b-instruct-8bit` directly, to size the Hermes context cap against its actual serving model rather than inferring from a dense-model bench.