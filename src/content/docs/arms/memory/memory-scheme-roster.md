---
title: Memory Scheme Evaluation Roster
description: Recon-grade evaluation of external memory schemes and adjacent mechanisms against Pepa's Memory Arm — what to harvest, what to reject, and why. No architectural commitment implied.
template: doc
sidebar:
  label: Memory Scheme Roster
  order: 1
  badge:
    text: Upd
    variant: caution
draft: false
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

> Companion to *Pepa Memory Architecture* (pending). _Recon-grade_ evaluation of external memory schemes and adjacent mechanisms. **No architectural commitment implied by any entry yet.** 

**Compilation started:** 2026-07-28 · **Items:** 21 numbered candidates (15 memory models, 6 mechanism/non-memory) + an unattributed-harvest section · **Last added:** 2026-09-28

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

**Source.** OUR fork: [github.com/prsws/pepa-sensory-arm](https://github.com/prsws/pepa-sensory-arm); upstream URL [github.com/aradlein/hass-agent-llm](https://github.com/aradlein/hass-agent-llm);

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

**Source.** [github.com/microsoft/Memora](https://github.com/microsoft/Memora)

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

**Source.** paper [arxiv.org/abs/2605.11032](https://arxiv.org/abs/2605.11032) · adjacent project (not PAM's impl) [github.com/EverMind-AI/EverOS](https://github.com/EverMind-AI/EverOS)

**Remarks.** Verified 2026-07-28: real paper — PAM by S.K. Ravindran (Microsoft); roster description matches. "PERMEAR" was a phantom label, no system by that name. EverOS is an adjacent project, not this paper's implementation.

### 9. MNEMOS

**Rank 6/10 · Memory model · discovery #9**

**Feature.** Memory *operating system*: versioning, lifecycle, audit.

**Entry holds.** content + category + ownership/permissions + source_model / provider / session / agent + recall telemetry; KG triples with temporal validity

**Take.** Rollbackable consolidation runs (run-ID tagged); transformation receipts; audit outlives artifact; writer-model provenance. Reject as platform. Zero epistemics.

**Source.** [github.com/ncz-os/mnemos](https://github.com/ncz-os/mnemos)

### 10. Celiums Memory

**Rank 6/10 · Memory model · discovery #10**

**Feature.** MCP cognitive engine: memory + journal + ethics + biological clock.

**Entry holds.** content + importance + lifecycle decay + **affective PAD coords** • circadian modulation; vector / full-text / affect retrieval

**Take.** Clean abstention on missing capability; triple orthogonal gate before irreversible ops; hash-chained journal as third category; circadian **as query-time input only**. Reject affect-weighted recall.

**Source.** [github.com/terrizoaguimor/celiums-memory](https://github.com/terrizoaguimor/celiums-memory)

### 11. Memory Decay Engine

**Rank 7/10 · Memory model · discovery #11**

**Feature.** Ebbinghaus retention with usage reinforcement.

**Entry holds.** item + stability S (reinforced per recall); R = e^(−t/S); evict below threshold

**Take.** Reimplement the math (~40 lines, no dep). **Stability = salience, never feeds trust.** Safety-critical entries exempt from decay entirely.

**Source.** [github.com/Emmimal/memory-decay-engine](https://github.com/Emmimal/memory-decay-engine)

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

**Source.** [arxiv.org/abs/2606.09498](https://arxiv.org/abs/2606.09498)

### 14. MS Agent Framework 1.0

**Rank 1/10 · Mechanism · discovery #14**

**Feature.** Multi-agent orchestration patterns (LangGraph competitor).

**Entry holds.** n/a — orchestration layer

**Take.** Nothing operational. Magentic's shape (plan / delegate / ledger / replan / capped resets) as conceptual reference for the Head, cribbed into LangGraph.

**Source.** [devblogs.microsoft.com/agent-framework](https://devblogs.microsoft.com/agent-framework)

### 15. DBOS / Transact

**Rank 6/10 · Mechanism · discovery #15**

**Feature.** Durable execution as a DB-backed library — workflows are data, no external orchestrator.

**Entry holds.** n/a — workflow_status + step_outputs tables (workflow ID, inputs/outputs, status; per-step checkpoints)

**Take.** Corroborates the RabbitMQ-out / DB-as-orchestrator decision. Port the *pattern* (checkpoint-and-resume) into SurrealDB for the Head and especially the nightly consolidation pass — survives a LUMA outage mid-run. Composes with MNEMOS (run-ID rollback for *bad* runs; fork for bug-mid-pass). LLM step becomes deterministic on replay → zero re-inference cost. Reject Transact itself: Postgres-native, a new moving part. Requires idempotent/deterministic consolidation steps.

**Source.** InfoQ talk (Edberg & Li) · [github.com/dbos-inc](https://github.com/dbos-inc); MIT (Python/TS/Go/Java)

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

### 19. MemPalace

**Rank 6/10 · Memory model · discovery #19**

**Feature.** Verbatim local-first store with structured scoping — explicitly never summarizes, extracts, or paraphrases.

**Entry holds.** **verbatim text, unmodified.** Five-level index: Wing (person/project) → Hall (memory type: facts / events / discoveries / preferences / advice) → Room (topic) → Closet (summary) → Drawer (verbatim original); **Tunnels** = cross-wing connections. Separate temporal entity-relationship **knowledge graph with validity windows** (add / query / invalidate / timeline) on local SQLite.

**Take.** Reject as platform: backends are chroma / sqlite_exact / rust_exact / milvus / qdrant / pgvector — **no SurrealDB**; thin epistemics (no trust float, no provenance class, no epistemic class, no confidence — Halls are Home Agent's category axis lightly enriched; KG validity windows are supersession-adjacent, cf. MNEMOS). Best read as **a well-engineered bronze layer plus retrieval, with no silver layer at all.** Harvest: **(a) verbatim-never-paraphrase** as the bronze-layer principle — GBrain's zero-LLM-extraction arrived at from the other side: GBrain won't let a model *extract*, MemPalace won't let it *rewrite*. Nothing paraphrased ⇒ nothing confabulated at rest, by construction. **(b) LLM-free retrieval** — 96.6% R@5 on LongMemEval with no LLM at any stage: retrieval quality is a harness property, not a model property. **(c) `mempalace mine --mode convos`** as a concrete corpus-ETL utility for a prior-AI-conversation corpus (⚠️ also a prompt-injection surface — content arriving through a channel the system is supposed to ingest). **(d) Default embedder `embeddinggemma-300m`, multilingual across 100+ languages** — independent corroboration of the bilingual embedder choice already running on mmm4; embeddings can point at any OpenAI-compatible `/v1/embeddings` endpoint, so nothing leaves the LAN.

**Source.** [github.com/MemPalace/mempalace](https://github.com/MemPalace/mempalace) · docs [mempalaceofficial.com](https://mempalaceofficial.com); MIT. Found via the [PiSugar whisplay-ai-chatbot wiki](https://github.com/PiSugar/whisplay-ai-chatbot/wiki/MemPalace).

**Remarks.** Recon 2026-09-18 · **Most-adopted entry on the roster by a wide margin: 59.1k ★, 7.6k forks, 2,038 commits, v3.10.0, MIT.** ⚠️ **Direct tension with the Flat Access field finding** — it is a *memory palace*, a five-level spatial mnemonic, which is precisely the nested structure that finding argues against. The mitigation is real (hierarchy is search *scoping*, not a navigation path; retrieval is semantic; Tunnels cross wings) but the design center remains spatial organization. Recorded as the roster's counter-example. Benchmark methodology is honest in ways worth respecting: the held-out figure is reported as the generalisable one, they decline to headline 100% because the last 0.6% came from inspecting wrong answers ("teaching to the test," flagged in their own docs), and they refuse side-by-side comparisons with other systems as dishonest metric-mixing. Runs on a Pi (hence the Whisplay wiki) and multi-arch Docker including Apple Silicon. ⚠️ README carries an impostor-domain malware warning — verify the source before installing anything.

### 20. SurrealDB Agent Memory

**Rank 8/10 · Memory model · discovery #20**

**Feature.** Six typed memory kinds over one multi-model store, with tritemporal audit and provenance on every row. Announced alongside a Mastra integration; the memory layer itself is a hosted service.

**Entry holds.** One raw record plus five typed categories — **episodic** (sessions and turns verbatim, in order), **identity** (durable facts, low decay), **knowledge** (learned or shared, decays without reinforcement), **context** (active topics, short retention), **instructions** (behavioural, applied at prompt assembly), **uncertainty** (explicit "not yet known" rows). Every entity, attribute, relation, instruction and uncertainty row carries a `source`: kind, reference, **trust**, **byte span into the episodic record**, location, `derived_from`. Three independent clocks — **system time** (substrate changed), **known time** (first believed), **valid time** (held in the world) — each queryable on its own. Supersession sets `valid_until`; history stays queryable; `forget` is an explicit verb with a separate hard-removal flag.

**Take.** Harvest heavily, adopt nothing. **(a) Uncertainty as a row type** — explicit abstention promoted from principle to schema; a gap that is written down can be queried, surfaced and counted. The strongest single idea here. **(b) Known time, the third clock** — the epistemic axis given a timestamp of its own, distinct from when a fact became true and from when the bytes changed. **(c) Byte-span provenance** — every derived fact cites a byte range in the raw record, a harder anchor than a timestamp plus a state reference, and it makes "show me why you believe this" mechanically answerable. **(d) Answer invalidation keyed on cited facts** — cached responses are keyed on the facts they cited, so superseding one fact invalidates every answer built on it: cache invalidation by provenance. **(e) Keyword bridges** — a no-model-call keyword pass with scored edges gives cheap structural recall for rare terms that embeddings underweight, which is directly what Flat Access demands of a medication name or a nickname. Reject the platform: **hosted-only** — fact extraction, recall and the accumulating user profile run off-box, which is disqualifying for a no-cloud system holding a person's health history, and it places a vendor dependency at the most load-bearing point in the design. Note also the **inverted degradation polarity**: their fallback keeps the transcript local and the *remembering* remote; degraded mode here requires the opposite. **No MANDATE and no gate** — trust is a weight feeding calibration and ranking, never a gate on action; this is memory for systems that answer, not systems that act. And **"instructions" as an extracted memory category** is content becoming authority by design.

**Source.** [surrealdb.com/agent-memory](https://surrealdb.com/agent-memory) · technical deep-dive [surrealdb.com/agent-memory/deep-dive](https://surrealdb.com/agent-memory/deep-dive) · Mastra integration announced 2026-09-03, package `@surrealdb/mastra-ai`. Requires SurrealDB v3.

**Remarks.** Recon 2026-09-27 · verdict **harvest, do not adopt.** ⚠️ **Not shipping** — waitlist only, free sandbox and paid plans from $30/month "at launch." No source, no paper, no benchmarks, no schema; the deep-dive is marketing written at a high technical register and nothing on it is externally verifiable. The customer logo wall belongs to the database, not to this product. ⚠️ **Two mechanisms to read carefully before admiring.** *Elaboration* — a background job finds entities sharing context but no relation, has a model propose the link, and accrues a proof count — is a machine for generating non-independent corroboration on a schedule, the same verifier gap flagged on #17 and #18. *Trace-derived ranking* boosts rows that proved useful for similar queries; the page also says lineage downgrades trust, leaving it ambiguous whether retrieval history touches the trust axis or only rank. If it touches trust, salience and veracity share an axis and the climb is industrialised. Unanswerable from public material. ⚠️ **Substrate note:** this is the vendor of Pepa's own canonical store repositioning around agent memory. The engine remains self-hostable and will keep gaining graph, vector and temporal capability, but the differentiated memory features are landing in a hosted tier — worth confirming the core engine's licence terms from the source before treating it as settled ground for a 20-year horizon.

### 21. CLM — Contrastive Language Models

**Rank 7/10 · Mechanism · discovery #21**

**Feature.** A scorer, not a generator: two encoders trained with a contrastive objective so a state's embedding aligns with the action actually taken. Returns a probability distribution over a closed candidate set, with no generation and no sampling.

**Entry holds.** n/a — operates on the decision call path, not stored memory. A state encoder and an action encoder, each a frozen 8B backbone plus a 20M-parameter trainable projection head (75 MB), trained with bidirectional InfoNCE. Inference is one embedding per fresh text and a dot product per cached candidate. Three question types: `Noul` (boolean → probability), `Choice` (labelled options with descriptions → distribution), `Score` (ordered rubric → expected level), each returning a `confidence` figure defined as top probability minus the mean of the rest.

**Take.** **(a) The punt threshold.** Escalation today is model-decided, with the tool description and a system-prompt routing rule as the only controls — an unexaminable decision sitting on the escalation seam, and a standing No-Trust-Me-Bro violation. A calibrated `confidence` on a typed question converts that into a bounded, observable, tunable gate with a number attached. Highest-value fit. **(b) The gap in the tier ladder.** Canned-phrase matching is fast but semantically blind and registers nowhere; the full agent path is an order of magnitude slower. This lands in the sub-100ms band *with semantics*, and unlike the canned tier it emits an artifact every time. **(c) Entity disambiguation before the action** rather than after — `rank` over the device catalog, which is a mostly-fixed candidate set and therefore exactly the case the vector cache is built for: embed once, reuse until the catalog changes. **(d) Classification currently wearing a generation costume** — the epistemic classes (observation / interpretation / prediction / policy) are a closed enum, which is a `Choice` question, not a job for a generative model; likewise retrieval shortlisting and corroboration judgments. **(e) Fine-tuning trains only the 20M heads against a frozen encoder,** and the training format is *state paired with the action taken* — which is what the utterance ledger already is. A head trained on real bilingual household traffic is the home-grown specialist, at 20M parameters rather than a full fine-tune. **Discipline:** it proposes and scores, it never authorizes. A calibrated probability is still probabilistic; Doctrine and Mandate still gate actuation. It cannot generate, so it complements the model and never replaces it.

**Source.** [github.com/Contrastive-LM/CLM](https://github.com/Contrastive-LM/CLM) · Hugging Face [Contrastive-LM](https://huggingface.co/Contrastive-LM); **Apache-2.0 for both code and weights.** Published as a blog post at [contrastive-lm.notion.site](https://contrastive-lm.notion.site), not as a paper.

**Remarks.** Recon 2026-09-28 · **Gated on one empirical question: can an MLX server serve 8B embeddings with the exact pooling the released head was trained against?** The projection heads run happily on CPU; the encoder expects a vLLM-served GPU endpoint, and there is no CUDA host in this homelab. `clm-serve --emb-url` accepts any OpenAI-compatible `/v1/embeddings` endpoint, so an Apple-Silicon path exists in principle — but a head only makes sense with the encoder and pooling it was trained against, so substituting a different embedder means training a head from scratch and discarding the pre-training recipe. Until that question is answered this is a good idea needing hardware that isn't here. ⚠️ Blog-only publication with no peer review, despite a strong author list. ⚠️ Verifier benchmarks are 38 and 30 held-out tasks — small. ⚠️ The named comparison baseline could not be independently verified and is not repeated here. ⚠️ Nine days old at recon, 8 commits; 2k stars in that window is velocity, not validation. ⚠️ States truncate at 2048 tokens by default, and the published latency figures are from a discrete NVIDIA GPU — expect worse over a LAN hop, though still far below either existing tier. Counterweight: Apache-2.0 on code *and* weights, 75 MB head, nothing to call out to — a rare licence posture for a 20-year no-cloud system.
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
| Name                   | Rank |
| ---------------------- | ---- |
| Holographic            | 8    |
| prompt pruning         | 8    |
| SurrealDB Agent Memory | 8    |
| Memora                 | 7    |
| PAM                    | 7    |
| Ebbinghaus             | 7    |
| NOOA                   | 7    |
| CLM                    | 7    |
| GBrain                 | 6    |
| MNEMOS                 | 6    |
| Celiums                | 6    |
| Self-Harness           | 6    |
| DBOS/Transact          | 6    |
| Engraphis              | 6    |
| MemPalace              | 6    |
| MemoriesDB             | 5    |
| kongbrain              | 5    |
| reasoning\_library     | 5    |
| Honcho                 | 3    |
| Home Agent             | 2    |
| MAF                    | 1    |

## Open items on this roster

- **Ranking is single-axis.** A second axis (immediacy vs. eventual value) would separate items that are codeable now (12) from those already absorbed (5) — both currently score 8.
- **A rank can now mean two different things.** #20 scores 8 on the applicability of its *design*, but it is the first entry that cannot be obtained at any price — there is no artifact to port. Every other high-ranked entry is something that could in principle be adopted. Either the scale needs an availability axis, or entries like this need a separate register.

## Cross-cutting patterns

- **Nobody covers more than one axis well.** Holographic and PAM anchor the epistemic axis; MNEMOS anchors the operational axis; Memora anchors representation; GBrain and kongbrain anchor retrieval. This is the argument for a composite target design rather than adopting any single scheme.
- **Salience ≠ veracity** recurs as the central discipline. Recall telemetry (MNEMOS), affective resonance (Celiums), and usage-reinforced stability (Ebbinghaus) are all legitimate salience signals and all become false-memory-climb accelerants if allowed to feed a trust score. Keep on separate axes.
- **Safety-critical entries need blanket exemption** from every salience, decay, and modulation mechanism on this roster — the "what must never fade" dimension. An allergy stated once and never queried decays exactly like noise under Ebbinghaus, and surfaces differently by hour under circadian modulation.
- **Explicit abstention over silent degradation** appears on both sides: as a design principle (Celiums), and as a failure (Holographic's math-dependency fallback; the fork's unreferenced `context_optimizer.py`).
