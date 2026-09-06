---
title: Recon — UC1/UC7 Convergence and the Minimum End-to-End Path
description: Written when the question shifted from "who do we talk to" back to "what do we finish."
template: doc
sidebar:
  label: Recon- UC1/UC7 Convergence
  badge:
    text: New
    variant: tip
draft: false
---
<p>
  <span class="a4a-badge collaborative-mess">Collaborative Mess</span>
</p>

21-Aug-2026

> Working session capture, not a decision. Written after a five-channel academic outreach push, when the question shifted from "who do we talk to" back to "what do we finish."
>

## The framing question

After recognizing that the Georgia Tech outreach had become a seventh piece on the board — real value, produces documents, moves zero lines of Pepa — the question became:

**What is the smallest thing that would make Pepa demonstrably work end to end?**

Not well, not production-grade. One path from utterance to outcome that goes through a Head, touches one arm, and produces a moment where Pepa did something no single arm could do alone.

### Why nothing feels finished (structural, not discipline)

Everything built so far is an **arm**. PSA, the entity preprocessor, the memory schema, the voice fleet, the knowledge arm, PaperlessMD. The Head has been deferred since March.

An arm cannot demonstrate value alone — it can only pass something to a supervisor that does not exist yet. Every piece is genuinely finished-ish and none of them can *feel* finished, because there is nothing for them to compose into.

Not a lack of focus. Playing every piece except the king.

---

## Use case triage against ai4aging.org

Ranked by distance from what actually runs today.

| UC | Status | Blocker |
| --- | --- | --- |
| **UC4 — Voice & Home Control** | **Done.** The site itself says "this one is not a promise — it works today." | Does not route through a Head, so it does not prove the architecture. |
| **UC1 — Memory Recall** | **Closest.** | Needs the Head. |
| **UC5 — Knowledge Management** | Same machinery pointed at open-notebook. | Nearly free once UC1 works. |
| UC2 — Life Context Recall | Needs interpretation of visit summaries. |  |
| UC3 — Daily Task Assistance | Needs ha-home-keeper + calendar. |  |
| UC6 — Homelab Assistance | Needs log aggregation not yet built. |  |
| UC7 — Pattern Detection | See below — splits in two. |  |
| UC8 — Quiet Watchfulness | Needs acoustic sensing + Self-Monitor Arm. | Furthest. |

### The UC1 finding

UC1 needs: scanned and indexed documents, a voice question, a spoken answer. **All three exist.**

- PaperlessMD is production-grade at 3.0.5 with real lab and imaging documents
- The household instance holds 994 documents / 16.5M characters of OCR'd text
- Voice in and voice out work today
- Paperless has its own full-text search API

**The load-bearing point: UC1 does not need the Memory Arm.** No SurrealDB, no ChromaDB, no trust scoring, no consolidation pass, no nightly job. Paperless is the retrieval substrate. The piece that has blocked everything since March is not on the critical path for the use case the site calls the Core Function.

### Minimum end-to-end path

```
utterance → Head → Knowledge Arm → paperless full-text query → spoken answer
```

One Head, one arm, one real corpus. Read-only, no actuation, therefore **no validator on the critical path** — about as gentle a first Head as the architecture allows.

---

## Flat Access, observed on its own author

The UC1 example on the site is the water heater warranty. It had been read before and was not recalled during this session — the use case list existed, was public, was authored by José, and was still not *visible* enough to be available.

The finding demonstrating itself on the person who found it.

---

## UC1 vs UC7: closer than expected

The original target question was *"YTD stats on my cholesterol."* That is **not UC1**.

- **UC1 is retrieval.** Search returns a document; Pepa names it. Paperless does the hard part.
- **"YTD cholesterol" is extraction plus aggregation.** Paperless returns five lab PDFs. Something must still pull LDL/HDL/total from each, know that `Colesterol total` and `Total Cholesterol` are the same analyte, normalize mg/dL, order by service date, and describe a trend. **Paperless search finds documents, not values.**

### UC7 splits in two

|  | Description | Distance |
| --- | --- | --- |
| **UC7 pulled** | You ask, Pepa answers with a trend | ~2 steps past UC1 |
| **UC7 pushed** | Pepa volunteers "battery down 15%" | Much further — needs a schedule, baselines, and bounded-surfacing discipline |

UC7-pushed belongs to the **operations plane** (HA, clock-triggered), not the Head — per the 20-Aug operations/cognition split. Different plane entirely, plus the observation-never-diagnosis boundary.

### The collapse

**If extraction happens at ingest instead of at query time, UC7-pulled collapses back into UC1.**

Pull LDL, HDL, total, A1C out of each lab report as it consumes → write to paperless custom fields → "YTD cholesterol" becomes a database query returning numbers with dates, not a model reading five PDFs and hoping.

Same retrieval pipeline as the water heater warranty. Different endpoint.

It also puts extraction where it belongs: **once per document, reviewable at consume time, with the source PDF one click away** — rather than at query time, where a wrong number arrives spoken aloud with no way to check it.

Custom fields for the handful of analytes actually tracked. Not the whole panel.

### Grounding risk, already observed

From the 2026-08-15 AI-suggestion test on PaperlessMD: Suggest fabricated a title and correspondent and three dates on the image-only X-ray because it had nothing to ground on. A model handed five lab PDFs and asked for a trend will produce a confident number whether or not it read one.

**Sequencing consequence:** exercise the pipeline first with a pure-retrieval question — *"when was my last lipid panel?"* — where a wrong answer is obviously wrong. Attack extraction separately, afterward.

---

## Verified: paperless-ngx v3 cannot extract values natively

Checked against v3 docs and open discussions.

- Workflows trigger on **Document Added** with content matching as a filter
- Assignment actions **can attach a custom field** — docs explicit: *"no value for the field will be set"*
- **No regex-capture-into-custom-field anywhere in v3.** Open feature request since 2024 (discussions #5332, #6932, #6509), not landed
- v3 AI suggests title, tags, type, correspondent, storage path — **not custom field values**

**But the API accepts values.** `custom_fields` takes either an array of field IDs (empty value) or an object mapping field id → value. Writing is trivial; extraction is ours to build.

**This is good news:** the extractor becomes a **Knowledge Arm component we own**, not a paperless feature to wait for. It also belongs there — it must know that `Colesterol total` and `Total Cholesterol` are the same analyte, which is domain knowledge paperless has no business holding ([ontology anyone?](/reference/ontology/)).

Two trigger shapes, both viable:

- **Post-consume script** — fires per document. Note v3 dropped positional args; env vars now.
- **Poller** — asks the API for Lab Result documents missing the LDL field, extracts, PATCHes. Slower, but restartable and re-runnable, which matters more during a bulk import.

Bilingual note: labs are Spanish, English, and bilingual, so **analyte-name mapping is the actual work**. Regex goes further than expected on structured lab tables; a model is the fallback for misses — with the number always shown next to its source document.

---

## Working plan shape (José's, unmodified)

1. **Repair what we claim we have** — orchestration by prose. Radlein's code; escalation between local and external LLM is flaky. Improve the entity pyscript and system prompt along the way. Possibly set the basis for the ontology work.
2. **Set up PaperlessMD to accept, process, and reply to queries from external sources.**

Explicitly: **no guardrails or blockers yet — just hooks**, to focus on proper escalation from utterance to spoken reply.

### Notes on the plan

- **Step 1 is not a detour.** If local→larger-model handoff is flaky today, adding a third destination multiplies the flakiness. Fix the routing that exists, then route somewhere new.
- **Step 2: plain REST, not MCP.** Already the standing verdict. MCP is for José↔paperless through Claude through the build, not production; this is Pepa↔paperless programmatically — a token and a few endpoints. MCP would also mean document content crossing to a cloud model, which is the line drawn.
- **One thing worth keeping even in a hooks-only build, because it is not a guardrail:** every answer names its source document. Costs nothing; turns a fabricated answer into a visible one thus complying with the [No "Trust-Me-Bro"
  Rule](/principles/no-trust-me-bro-rule/).

---

## Open questions

- Which paperless instance answers a casual question? Two exist, and the medical one should not be reachable by default.
- What happens when search returns nothing, or returns twelve things?
- Does the household instance's 347-type taxonomy rot matter? Full-text search does not care — but **filtering does**, and filtering is what makes an answer precise rather than approximate.

---

## Not decided here

No OBOSBS was requested or produced. This is a thinking pass. Sequencing, scope, and step-1 detail remain open.