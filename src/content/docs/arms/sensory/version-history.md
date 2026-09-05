---
title: Sensory Arm Version History
description: Sensory Arm Version History
template: doc
sidebar:
  label: Version History
  order: 1
  badge:
    text: New
    variant: tip
draft: false
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

This is a record of Pepa deployments. Currently under construction, more structure and details will follow.

## PepaV6 (current - Sep 2026)

*ChromaDB moved off pve2 onto mmm4, making PSA standalone-deployable (i.e. an appliance) for the first time.*

**Host:** mmm4 + Mac Studio

**Software / Backend:** rapid-mlx + wyoming-apple-speech + ChromaDB (local)

**What Changed:** ChromaDB relocated from pve2 (`192.168.10.19`) to mmm4 — PSA's vector store is now co-resident with inference and the HA VM on a single host, and PSA repointed to the local instance. This restores Radlein's original topology intent (Chroma alongside HA and out of band of it, rather than across the LAN) and makes PSA standalone-deployable for the first time — which is the premise the SBOM's D3 boundary ruling rests on. Vector queries no longer traverse the LAN. System prompt edited ~2026-07-28 — content of the edit not yet recorded (TODO). No crashes observed through 2026-07-30; UAT window still short. Rolling UAT moves from V5 to V6. *(Source: José direct, Jul 30 2026.)*

**Update 2026-08-10 —** rapid-mlx has been bumped every couple of days since the V6 entry was written, as the only change in the window (no model, prompt, or topology changes alongside it). Both hosts are now on rapid-mlx 0.12.7 — mmm4 and Mac Studio matched; the V5 version skew is closed. *(Source: José direct, Aug 10 2026.)*

## PepaV5

*STT went fully on-device on mmm4 via Apple SpeechAnalyzer, Whisper was disabled, and the local model was downsized again to e2b.*

**Host:** mmm4 + Mac Studio

**Software / Backend:** rapid-mlx + wyoming-apple-speech

**What Changed:** `wyoming-apple-speech` now runs **locally on mmm4** (moved from Mac Studio); STT is on-device via Apple SpeechAnalyzer — cable-test confirmed no cloud egress. Whisper STT daemon **fully disabled** (login item off in macOS security — will not respawn on reboot); RAM reclaim unconfirmed by top/Activity Monitor (Metal/unified-memory not attributable per-process). TTS: Piper `:10200` (`es_AR-daniela-high`, Pepa's eventual-voice path) • kokoro bridge `:10201` (`wyoming_openai` → rapid-mlx, restored from a port collision as a parallel audition endpoint). Local LLM: `gemma-4-e4b-4bit` `:8000` (`--enable-audio`, embeddinggemma, 1024MB cache). Mac Studio = revised extended tier (`qwen3.6-27b-8bit`, qwen3_coder_xml parser) + parked apple-speech install (not in path). Instrumentation: `llm-fleet-monitor` gained a rapid-mlx probe (`/v1/status` monotonic request-counter latch + cache/Metal stats; gui.py escalation-delta counter). ~~rapid-mlx upgraded on mmm4 to 0.15.0 (Mac Studio remains 0.12.0 — versions intentionally unmatched; mmm4 now leads the Studio).~~ **[Struck 2026-08-10 — 0.15.0 is wrong. Retained, not erased. The actual mmm4 version at the time of the V5 entry is unrecorded.]** The then-current rapid-mlx crashed at boot loading gemma-4-e4b's audio tower (shape mismatch on the conformer SubSampleConv, via mlx-vlm 0.6.4). Fix: added `--text-only` to skip the unused audio tower; kept `--enable-audio` so the kokoro bridge's `/v1/audio/*` routes still mount. PSA input is already text (Apple STT upstream), so the audio tower was dead weight. Local LLM downsized again: `gemma-4-e4b-4bit` → `mlx-community/gemma-4-e2b-4bit` — no memory pressure observed at this size; capability (tool-call fidelity, PR-Spanish/Spanglish, escalation rate vs Studio extended tier) under evaluation — "can it still do the mission" is open. *(Source: José direct, Jul 21 2026.)*

## PepaV4.5

*First trial of Apple's STT — installed on the Mac Studio to test whether it could replace Whisper's RAM footprint.*

**Host:** mmm4 + Mac Studio

**Software / Backend:** rapid-mlx + wyoming-apple-speech

**What Changed:** Whisper disabled on mmm4; `wyoming-apple-speech` installed on Mac Studio to use Apple's STT foundation model; PSA's STT pointed at apple-speech. Goal: replace Whisper's ~2GB RAM footprint with built-in macOS STT if recognition proves reliable — under evaluation.

## PepaV4

*Both model tiers changed at once — local downsized to 4-bit, escalation swapped to qwen3.6.*

**Host:** mmm4

**Software / Backend:** rapid-mlx

**What Changed:** Downsized PSA's local LLM from `gemma-4-e4b-6bit` → `gemma-4-e4b-4bit` (monitoring for reduced thrashing). Escalation/external LLM changed from `gemma-4-26b` → `qwen3.6-27b-mlx-8bit` on a recommendation — under evaluation.

## PepaV3 rapid-mlx

*Inference and speech backends switched from Ollama to rapid-mlx across both hosts.*

**Host:** mmm4 + Mac Studio

**Software / Backend:** rapid-mlx (replacing Ollama)

**What Changed:** Inference/speech services switched from Ollama to rapid-mlx on both hosts, for backend consistency.

## PepaV3

*The first PAHA→PSA refactor, and the point where entity context began being injected into the system prompt.*

**Host:** mmm4

**Software / Backend:** Ollama

**What Changed:** First PAHA refactor into PSA — added `sensor.pepa_entity_context` pyscript for entity-context ingestion into the system prompt.

## PepaV2

*Moved off the experimental NUC onto mmm4 under UTM; the NUC became pve3/Hermes.*

**Host:** mmm4, under UTM

**Software / Backend:** Radlein's `hass-agent-llm` code

**What Changed:** NUC7i5 repurposed as pve3/Hermes around this point.

## PepaV1

*The experimental configuration became the live production pipeline, and remains the documented rollback baseline.*

**Host:** Same experimental box, became live config

**Software / Backend:** Home Agent (Radlein's `hass-agent-llm`)

**What Changed:** Became the live/production HA Assist Pipeline configuration. Still on record as of Jul 2026 as the rollback baseline. *(Source: Notion, Mar–Jul 2026)*

## PepaV0

*The original sandbox box — feature experiments deliberately kept off Casa Delta's production HA.*

**Host:** NUC7i5 (experimental)

**Software / Backend:** Home Assistant + Home Agent

**What Changed:** Sandbox box for Pepa feature vibing, tool-calling, orchestration experiments — kept separate from Casa Delta's production HA. Voice satellite: FutureProofHomes Satellite1. *(Source: Notion, Feb 2026)*

Original PepaV0 record

As of Mar-2026 this is the home automation testbed for Pepa, called PepaV0.

Hardware Topology
Wired
Mac Studio (M1 Ultra) → Big brain. Serves Ollama alongside mlx_lm.server to the network. For experimentation at the model/behavior level. No HA, no voice, no ops glue.

PepaV0 (NUC7i5) → Experimental HA. Runs Home Assistant + Home Agent specifically for Pepa feature development: tool calling, orchestration experiments, web access, memory, etc. This is where we break things on purpose.

Casa Delta (separate NUC7i5) → Production HA. Real house automation, IoT, cams, autonomous today. Eventually subservient to Pepa, but until then: hands off unless it’s actually broken.

Cubi (MSI Cubi 1MG, PVE 9.1) → Support layer. Datastores and coordinators:

PostgreSQL + pgvector
ChromaDB
future LangGraph / “messiah coordinator”
other back-end functions Pepa may call into. No HA, no voice.
NAS (TerraMaster F4 SSD, TOS7) → Storage. :

SMB, iSCSI
runs Proxmox Backup Server

Protectli (Vault V1610) → Network Master. OPNsense, VLANs, routing, firewall, traffic discipline.

Workstations:
  - Mac mini M4 (daily driver)
  - Dell G7 7700 (temporarily benched, proven, available as ringer)

Wireless:
  - WiFi Access Points
  - Engenius EAP300 + Cisco WAP4410 for 2.4GHz multi ssid-to-lan mapping
  - TP-Link Archer BE6500 for 5GHz bands
  - Zigbee
  - SONOFF Zigbee 3.0 USB Dongle Plus-E Gateway
  - Aeotec Range Extender Zi
  - Matter/Thread IKEA Dirigera
  - Espressif ESP Thread Border Router/Zigbee Gateway Board (just show for now but it’s detected)

Voice Satellites:
  - FutureProofHomes Satellite1 → PepaV0 voice
  - HA Voice Preview Edition → Casa Delta control group (do not touch)
  - M5Stack Atom Echo → roaming test probe

---

**Open threads to resolve later:**

- V4 model swap outcomes (thrashing reduction, qwen3.6-27b quality vs gemma-4-26b) — pending observation.
- V4.5 apple-speech reliability recon — pending observation, decides whether Whisper gets retired.
- V5 apple-speech now live locally on mmm4 — Spanglish/PR-Spanish recognition audition (real utterances, code-switching) is the open test; Whisper plist kept disabled-not-deleted as rollback.
- V5 cache thrashing — confirmed to persist on `gemma-4-e4b-4bit` too, so the V4 4-bit downsize was **not** the fix; thrashing later observed absent but cause unidentified (candidates: reboot/fresh cache state, daemon restore). Watch for recurrence.
- V5 escalation anomaly — local tier answering queries that previously punted to extended; `total_requests_processed` on the Studio card is the latch to disambiguate "model improved" vs "timeout stopped firing."
- ~~V5 rapid-mlx version skew — mmm4 on 0.15.0, Mac Studio on 0.12.0 (recorded baseline of 0.10.5 was stale). mmm4 now leads; any cross-host behavior comparison spans engine versions. The `--text-only` boot fix is 0.15.0-specific; expect the same gemma audio-tower crash if the Studio is ever bumped to 0.15.0 while serving a multimodal model.~~ **[Struck 2026-08-10 — 0.15.0 is wrong. Retained, not erased. Correct mmm4 version at V5 unrecorded, so the `--text-only` boot fix is no longer attributable to a confirmed version number. As of 2026-08-10 both hosts are on 0.12.7 and the skew is closed; the audio-tower crash hazard on a multimodal model is unchanged in substance, only its version anchor is lost.]**
- V5 e2b downsize — local LLM moved from e4b-4bit to e2b-4bit; memory pressure gone, but capability at this size is the open question ("can it do the mission"). Watch: tool-call fidelity/auto-recovery rate, escalation-counter delta on the Studio card (more punts = mission failing), and cache hit-rate movement now that the model footprint shrank.
- V6 unified-memory contention — Chroma's HNSW index must be resident in RAM, and on Apple Silicon that RAM is the same pool Metal draws from, so Chroma's footprint comes straight out of inference headroom. Chroma's own guidance sets a floor of ~2GB *regardless of collection size*; at Casa Delta's scale (thousands of records, not millions) the index itself is negligible — **the fixed floor is the cost, not the data**. Per the standing caveat, whole-system Used/Avail and the GPU line are the only trustworthy readings; btop per-process MemB cannot attribute Metal buffers.
- V6 blast radius — with Chroma co-resident, a runaway index no longer degrades PSA in isolation; it competes with inference. Chroma's documented failure mode is not graceful: once a collection exceeds available memory the OS begins swapping, the index layout does not tolerate swapping, and the system becomes unusable quickly. On pve2 that was a degraded arm; on mmm4 it is a mute house. Nightly consolidation is what bounds the buffer — **silent consolidation failure now has a much larger consequence**. Self-Monitor candidate.
- V6 confounded window — the system prompt edit (~Jul 28) and the Chroma relocation (Jul 30) are both in flight in the same UAT window. They were sequenced rather than simultaneous, so the Jul 28–30 interval is the discriminator *if* behavior was observed in it. If it wasn't, any behavior change from here has two candidate causes.
- V6 birthday-recall retest — the open diagnostic (unknown whether the failure sat at ChromaDB retrieval after the Context Mode switch, or at the model layer) is worth rerunning now. The relocation forces a fresh client initialization, which is precisely the suspected fault path. Cheapest available test and it discriminates between the two candidates.
- V6 BOM variance — the PSA Bill of Materials (v0.1, 30-Jul) records rapid-mlx at **0.11.1**; V5 records mmm4 at ~~0.15.0~~ **[struck 2026-08-10 — wrong]** and the Mac Studio at **0.12.0**; as of 2026-08-10 both hosts are on **0.12.7**. The BOM matches neither host. Reconcile before the SBOM is authored — this is exactly the variance class the BOM exists to catch.