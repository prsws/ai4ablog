---
title: Memory Scheme Evaluation Roster
description: Recon-grade evaluation of external memory schemes and adjacent mechanisms against Pepa's Memory Arm — what to harvest, what to reject, and why. No architectural commitment implied.
template: doc
draft: true
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

**Working Note**

> Companion to *Pepa Memory Architecture* (pending). _Recon-grade_ evaluation of external memory schemes and adjacent mechanisms. **No architectural commitment implied by any entry yet.** 

**Compilation started:** 2026-07-28 · **Items:** 18 numbered candidates (13 memory models, 5 mechanism/non-memory) + an unattributed-harvest section · **Last added:** 2026-08-26

## Purpose

Pepa's memory system is intended to work on a 20 year horizon. This register holds our initial quick evaluation of existing agentic memory models as we find them.

**Rank** = applicability to Pepa, 0 (nothing to take) to 10 (adopt substantially as-is).

**Feature** - describes what attracted us to it

**Entry holds** - what the memory entry entails 

**Take** - a summary of applicability to Pepa

**Source** - where it's at

**NOTE**: Don't worry if initially you don't understand our findings. They're a very concise summary 
of our research which is not yet published. Shall you have questions about any specific item please write us.

## Roster

### 1. Home Agent (Home Assistant add-on)(Radlein) · starting point

**Rank 2/10 · Memory model · discovery #1**

**Feature.** Low latency ReAct loop; Type-and-TTL memory capture inside Home Assistant.

**Entry holds.** content + type (fact / preference / context / event) + fixed TTL

**Take.** Type labels as secondary metadata only. Reject TTL-as-lifecycle — the 68°F anti-pattern; a wrong `fact` never expires. Still the ETL source of truth.

**Source.** OUR fork: [github.com/prsws/pepa-sensory-arm](http://github.com/prsws/pepa-sensory-arm); upstream URL [github.com/aradlein/hass-agent-llm](http://github.com/aradlein/hass-agent-llm);

### 2. MemoriesDB

**Rank 5/10 · Memory model · discovery #2**

**Feature.** Session-chained memory with compute-at-the-data.

**Entry holds.** not fully captured; `_src` chains walked backward through sessions

**Take.** Locality principle → SurrealDB embedded functions. Traversal model orthogonal to supersession.

**Source.** paper [arxiv.org/abs/2511.06179](https://arxiv.org/abs/2511.06179) · example repo [gitlab.com/circleclicklabs/ai-lab/memoriesdb](https://gitlab.com/circleclicklabs/ai-lab/memoriesdb)

### 3. Memora (MSR, ICML 2026)

**Rank 7/10 · Memory model · discovery #3**

**Feature.** Abstraction-keyed memory that merges instead of duplicating.

**Entry holds.** full value (never embedded) + primary abstraction (6–8 words, = merge key) + cue anchors (entity+aspect)

**Take.** Index the abstraction, not the value. Reject naive value-merging — must preserve per-contribution provenance inside merged entries.

**Source.** [github.com/microsoft/Memora](http://github.com/microsoft/Memora)

### 4. Honcho

**Rank 3/10 · Memory model · discovery #4**

**Feature.** Offline consolidation into a derived user model.

**Entry holds.** verbatim interaction record (lower stratum) + derived model of the person (upper); queries hit the derived model

**Take.** Consolidation rhythm only. Reject: erases the observation/interpretation line by design.

**Source.** [github.com/plastic-labs/honcho](https://github.com/plastic-labs/honcho)

**Remarks.** ⚠️ License: listed AGPL-3.0 in one index, historically Apache-2.0-style in another — confirm before treating as a donor (AGPL matters).

### 5. Holographic (Hermes Agent option)

**Rank 8/10 · Memory model · discovery #5**

**Feature.** Trust-scored facts with decay and supersession.

**Entry holds.** content + category + **trust float 0–1** • entities + relation triples + decay half-life + `superseded_by`

**Take.** Closest cousin; dynamic-trust pattern already absorbed. Caveat: silently degrades to keyword search when math dep missing.

**Source.** [github.com/bysc1000/holographic-memory](https://github.com/bysc1000/holographic-memory) (in Chinese)

**Remarks.** URL corrected 2026-07-28: was jramapuram (neural HRR demo — wrong system); now bysc1000 (Hermes SQLite fact store, matches).

### 6. GBrain

**Rank 6/10 · Memory model · discovery #6**

**Feature.** Entity-page graph with LLM-free extraction.

**Entry holds.** entity page (prose) + chunks/embeddings + typed edges + source tier + backlinks

**Take.** **Zero LLM in extraction path** — nothing confabulated enters the graph. Also per-stage retrieval attribution.

**Source.** [github.com/garrytan/gbrain](https://github.com/garrytan/gbrain)

### 7. kongbrain

**Rank 5/10 · Memory model · discovery #7**

**Feature.** Typed cognitive nodes + intent-budgeted injection.

**Entry holds.** typed node (concept / correction / preference / decision / reflection…) + embedding + self-adjusted score, on agent/project/task/session spine

**Take.** Retrieval-side reference: tiered injection with intent→budget routing = the latency ladder implemented.

**Source.** [github.com/42U/kongcode](https://github.com/42U/kongcode)

### 8. PAM (Portable Agent Memory)

**Rank 7/10 · Memory model · discovery #8**

**Feature.** Cryptographically verifiable, operator-owned portable memory.

**Entry holds.** content-addressed ID (hash of self) + parent IDs (provenance DAG) + timestamp; per component: episodic (actor / observation / salience / tags), semantic (S-P-O + confidence + source links), procedural, working, identity

**Take.** Provenance-as-structure; derivation is a first-class verifiable operation. Memory re-injected in typed frames so it can't read as instructions.

**Source.** paper [arxiv.org/abs/2605.11032](http://arxiv.org/abs/2605.11032) · adjacent project (not PAM's impl) [github.com/EverMind-AI/EverOS](https://github.com/EverMind-AI/EverOS)

**Remarks.** Verified 2026-07-28: real paper — PAM by S.K. Ravindran (Microsoft); roster description matches. "PERMEAR" was a phantom label, no system by that name. EverOS is an adjacent project, not this paper's implementation.

### 9. MNEMOS

**Rank 6/10 · Memory model · discovery #9**

**Feature.** Memory *operating system*: versioning, lifecycle, audit.

**Entry holds.** content + category + ownership/permissions + source_model / provider / session / agent + recall telemetry; KG triples with temporal validity

**Take.** Rollbackable consolidation runs (run-ID tagged); transformation receipts; audit outlives artifact; writer-model provenance. Reject as platform. Zero epistemics.

**Source.** [github.com/ncz-os/mnemos](http://github.com/ncz-os/mnemos)

### 10. Celiums Memory

**Rank 6/10 · Memory model · discovery #10**

**Feature.** MCP cognitive engine: memory + journal + ethics + biological clock.

**Entry holds.** content + importance + lifecycle decay + **affective PAD coords** • circadian modulation; vector / full-text / affect retrieval

**Take.** Clean abstention on missing capability; triple orthogonal gate before irreversible ops; hash-chained journal as third category; circadian **as query-time input only**. Reject affect-weighted recall.

**Source.** [github.com/terrizoaguimor/celiums-memory](http://github.com/terrizoaguimor/celiums-memory)

### 11. Memory Decay Engine

**Rank 7/10 · Memory model · discovery #11**

**Feature.** Ebbinghaus retention with usage reinforcement.

**Entry holds.** item + stability S (reinforced per recall); R = e^(−t/S); evict below threshold

**Take.** Reimplement the math (~40 lines, no dep). **Stability = salience, never feeds trust.** Safety-critical entries exempt from decay entirely.

**Source.** [github.com/Emmimal/memory-decay-engine](http://github.com/Emmimal/memory-decay-engine)

### 12. Safe prompt pruning layer

**Rank 8/10 · Mechanism · discovery #12**

**Feature.** Deterministic, idempotent pruning of the assembled prompt.

**Entry holds.** n/a — operates on the message list, not stored memory

**Take.** Expired-tool-result pass keyed on structured tool identity. Insert in `agent/core.py` pre-serialization, **not** the entity sensor. Revive dead `context_optimizer.py` as the boundary, gutted and refitted.

**Source.** example repo [github.com/Emmimal/prompt-pruning-layer](https://github.com/Emmimal/prompt-pruning-layer)

### 13. Self-Harness

**Rank 6/10 · Mechanism · discovery #13**

**Feature.** Agent proposes its own harness edits, verifier-grounded.

**Entry holds.** n/a — operates on harness surfaces, not memory

**Take.** Weakness Mining for the PSA confabulation diagnostic (HA device-state log as verifier). Promotion rule = independent-corroboration principle. Hermes only; never on the actuation path.

**Source.** [arxiv.org/abs/2606.09498](http://arxiv.org/abs/2606.09498)

### 14. MS Agent Framework 1.0

**Rank 1/10 · Mechanism · discovery #14**

**Feature.** Multi-agent orchestration patterns (LangGraph competitor).

**Entry holds.** n/a — orchestration layer

**Take.** Nothing operational. Magentic's shape (plan / delegate / ledger / replan / capped resets) as conceptual reference for the Head, cribbed into LangGraph.

**Source.** [devblogs.microsoft.com/agent-framework](http://devblogs.microsoft.com/agent-framework)

### 15. DBOS / Transact

**Rank 6/10 · Mechanism · discovery #15**

**Feature.** Durable execution as a DB-backed library — workflows are data, no external orchestrator.

**Entry holds.** n/a — workflow_status + step_outputs tables (workflow ID, inputs/outputs, status; per-step checkpoints)

**Take.** Corroborates the RabbitMQ-out / DB-as-orchestrator decision. Port the *pattern* (checkpoint-and-resume) into SurrealDB for the Head and especially the nightly consolidation pass — survives a LUMA outage mid-run. Composes with MNEMOS (run-ID rollback for *bad* runs; fork for bug-mid-pass). LLM step becomes deterministic on replay → zero re-inference cost. Reject Transact itself: Postgres-native, a new moving part. Requires idempotent/deterministic consolidation steps.

**Source.** InfoQ talk (Edberg & Li) · [github.com/dbos-inc](http://github.com/dbos-inc); MIT (Python/TS/Go/Java)

### 16. Engraphis

**Rank 6/10 · Memory model · discovery #16**

**Feature.** Local-first coding-agent memory; standout is the interactive, inspectable knowledge-graph / recall-route display.

**Entry holds.** content + workspace/repo scope + bi-temporal validity (retained/active) + graph links + lexical & reinforced ranking signals; SQLite (SQLCipher at rest)

**Take.** Reject as platform (SQLite store, coding-agent/code-graph design center). Harvest: **`why`** callable recall-trace (agent-queryable retrieval rationale — instrumentation for the confabulation diagnostic & retrieval-≠-authority gate); **validate-before-store** admission gate w/ deterministic fallback — but the validator must be independent of the proposing model (LLM self-validation ≠ causally-independent corroboration); **`pin`** = decay-exemption verb (concretizes "what must never fade"); **privacy receipts** • explicit local-only boundary. Moderate epistemics: bi-temporal + conflict resolution, but no trust float / epistemic class.

**Source.** [engraphis.com](https://engraphis.com) · repo [github.com/Coding-Dev-Tools/engraphis](https://github.com/Coding-Dev-Tools/engraphis); Apache-2.0 local core (open-core)

**Remarks.** The interactive graph-display UI is the main draw here. ⚠️ Direct repo fetch 404'd 2026-08-06 (transient/gated); characterized from search-indexed README + product pages; star count/adoption unconfirmed.

### 17. NOOA (NVIDIA Labs)

**Rank 7/10 · Memory model · discovery #17**

**Feature.** Agent-curated typed relational memory inside an object-oriented harness.

**Entry holds.** record + type + importance + tags; typed relationships **supports / contradicts / derived-from** forming a knowledge graph (not a flat log); single human-readable SQLite file; records may reference **live agent state**

**Take.** Strongest external validation of harness-quality thesis — NVIDIA: harness design alone drives double-digit benchmark swings on the same model (3rd leg after HarnessX, Self-Harness). Memory subsystem measured **+11.8 RHAE over file-based notes** — typed relational memory beats flat notes, measured. `derived-from` = provenance edge; `contradicts` = conflict detection; **reflection pass** (merge dupes, link, distill, prune) = nightly consolidation. **Agent-curated writes + spontaneous surfacing** = bounded proactive surfacing shipped; pairs with Engraphis `pin`/`correct`. Records referencing live state = one structural answer to 68°F staleness. **Pass-by-reference** (tool results stay live objects, model sees bounded typed preview) = stronger answer than prompt-pruning: stale state never *enters* context as text; no compaction needed, ~half tokens at parity. Target shape for any real PSA context rewrite (doesn't displace #12, which is small and immediate). Reject as framework: whole-harness commitment (LangGraph replacement), research preview, NVIDIA-ecosystem gravity.

**Source.** blog [developer.nvidia.com — six agent harness capabilities](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/) · report [arxiv.org/abs/2607.20709](https://arxiv.org/abs/2607.20709) · code [github.com/nvidia-nemo/labs-OO-Agents](https://github.com/nvidia-nemo/labs-OO-Agents)

**Remarks.** ⚠️ Caution: agent-curated writes with no independent verifier = model self-validation; Pepa's write path still needs a verifier independent of the proposing model. ⚠️ Benchmarks are frontier cloud models (GPT-5.5/5.6, Opus 4.6) — token-efficiency numbers do not transfer to local gemma-on-mmm4 unexamined.

### 18. reasoning_library (open-notebook fork)

**Rank 5/10 · Mechanism · discovery #18**

**Feature.** Three-tier routing for repeated structured classification: hardcoded rule → compressed "script centroid" system prompt → full reasoning fallback.

**Entry holds.** n/a — operates on the classification call path, not stored memory. Persists accumulated reasoning traces compressed into per-task scripts (distilled criteria from ~20 prior examples) + centroid for routing match.

**Take.** The **pattern only**, not the code. Maps directly onto the nightly consolidation pass classifying into fact / context / preference / event and observation / interpretation / prediction — repeated structured classification over structurally similar inputs is its stated problem. Compress criteria once, put a deterministic fast path in front. Complements the existing fast-path / LLM-path split in `pepa_behavioral_capture.py`. **Reject the implementation entirely.** Note the same verifier gap as #17: compressing your own prior traces is self-validation — the criteria must be reviewable as a flat file, not silently accreted.

**Source.** [github.com/ganzuul/open-notebook](https://github.com/ganzuul/open-notebook) · `scripts/pipeline/reasoning_library/`; MIT (inherited from lfnovo/open-notebook)

**Remarks.** Recon 2026-08-25 · verdict **log, do not adopt.** Functionally net-new tooling built alongside an open-notebook fork for an unrelated code-indexing project, not a memory contribution to it — the only upstream change is a compose edit to `network_mode: host` (would break our open-notebook LXC). ⚠️ Headline claim — ~97% reasoning-token reduction (24 words vs 1,015 mean) — is a single unvalidated measurement against an unverified model name. Directional at best; must be re-measured on gemma-4-e2b before it means anything for Pepa. Adjacent interest: uses Open Notebook as an *orchestration substrate* (sources = content store, notes = semantic index, transformations = the LLM boundary, search = retrieval) — structurally close to the Knowledge Arm framing.

## Unattributed harvest

Some useful patterns surfaced from sources found informally — blog posts, forum threads, social media, product pages, single-author repos — that are not carried as named entries above. They are omitted by name for a mix of reasons: unclear or restrictive licensing, incomplete attribution, or because a named entry would characterize a specific individual or small operation more than a public recon should. The patterns below are recorded as *techniques*, not endorsements of any source; nothing here reproduces source code or text, and no claim about any source's quality or veracity is implied by inclusion. This section is append-only: future finds that can't or shouldn't be named land here.

A standing caution travels with everything in this bucket, because these sources tend to share a failure mode: **self-reported numbers are not results.** Headline metrics from an unaudited source — accuracy figures, token-reduction ratios, "100% / zero-failure" claims — are directional at best and mean nothing for Pepa until re-measured on Pepa's own hardware. Watch especially for a guarantee that is *logged but not enforced* (a check that records "would-pass / would-correct / would-drop" while passing the output through unaltered), and for a headline benchmark of a configuration that isn't actually running. 100% on anything is a measurement smell.

| Pattern | What it is | Where it maps in Pepa |
| --- | --- | --- |
| Ordered companion filter | A fixed deterministic gate between "an observation matches a standing interest" and "actually interrupt": quiet-hours → activity gate → rate limit → per-intent cooldown → semantic dedup → consent grade, evaluated in order | Bounded proactive surfacing; a direct, implementable answer to the Flat Access surfacing problem |
| Deterministic pre-LM intent routing | Intent classified by a governed deterministic component before the model is invoked — "the model is the last thing called, not the first" | Independent data point for the unresolved deterministic-supervisor vs. model-in-loop Head question |
| Blind renderer | The response/expression stage receives only typed reasoning packets and never sees the raw user text, so it cannot re-decide truth downstream | Relates to the verbatim-utterance-injection rule — same worry (a downstream model silently re-deciding), opposite remedy; resolve deliberately, may differ by stage |
| Corroborate-before-anchoring | An identity fact must be corroborated across multiple sessions before it is anchored as stable | The independent-corroboration principle, reached from a different direction |
| Dual-family review | Two different model families must each independently approve every code change, and the second reviewer specifically checks whether the first's fix introduced a new regression | The causally-independent-verifier gap (flagged on #16, #17, #18) actually implemented; the reviewer is independent of the author by construction. This one is Apache-2.0 and public, and merits its own recon later |
| Specialist graduation | A lifecycle that migrates narrow specialists from expensive frontier calls to smaller locally-trained models over time, fine-tuned on the validated corpus the system itself generates | An explicit cloud→local promotion path per arm, rather than a one-time placement decision |
| Outbound-only home relay | A remote-access topology where a cloud node handles telephony/provisioning only and never sees memory; the home node dials out, so there is no inbound port into the home network | Screenless, landline-reachable remote access with no inbound exposure — a senior-accessible modality and a clean answer to the remote-access attack surface |

## Ranked, top down
| Name       | Rank |
|------------|---|
|Holographic|8|
|prompt pruning|8|
|Memora|7|
|PAM| 7|
|Ebbinghaus| 7|
|NOOA| 7|
|GBrain| 6|
|MNEMOS| 6|
|Celiums| 6|
|Self-Harness| 6|
|DBOS/Transact| 6|
|Engraphis| 6|
|MemoriesDB| 5|
|kongbrain| 5|
|reasoning_library| 5|
|Honcho| 3|
|Home Agent| 2|
|MAF| 1|


## Open items on this roster

- **Ranking is single-axis.** A second axis (immediacy vs. eventual value) would separate items that are codeable now (12) from those already absorbed (5) — both currently score 8.

## Cross-cutting patterns

- **Nobody covers more than one axis well.** Holographic and PAM anchor the epistemic axis; MNEMOS anchors the operational axis; Memora anchors representation; GBrain and kongbrain anchor retrieval. This is the argument for a composite target design rather than adopting any single scheme.
- **Salience ≠ veracity** recurs as the central discipline. Recall telemetry (MNEMOS), affective resonance (Celiums), and usage-reinforced stability (Ebbinghaus) are all legitimate salience signals and all become false-memory-climb accelerants if allowed to feed a trust score. Keep on separate axes.
- **Safety-critical entries need blanket exemption** from every salience, decay, and modulation mechanism on this roster — the "what must never fade" dimension. An allergy stated once and never queried decays exactly like noise under Ebbinghaus, and surfaces differently by hour under circadian modulation.
- **Explicit abstention over silent degradation** appears on both sides: as a design principle (Celiums), and as a failure (Holographic's math-dependency fallback; the fork's unreferenced `context_optimizer.py`).

## Porting note

This page was restructured from the Notion source (a single wide table) into one section per candidate, so it reads on the web without a spreadsheet-width table. No candidate's evaluation content was dropped in that conversion; only the layout changed. Two editorial changes distinguish this published version from the internal ledger:

- One source that would have characterized a specific small operation more than a public recon should is not carried as a named entry. Its genuinely useful patterns are preserved, unattributed, under **Unattributed harvest** above.
- One single-author repository is cited for its useful pattern and its verdict, with incidental commentary on the author and the repository's housekeeping trimmed.

The internal ledger remains the complete record; this is the curated public view. Corrections land as their own commits.