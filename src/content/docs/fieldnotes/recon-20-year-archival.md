---
title: Recon — Digital Preservation for the 20-Year Horizon (LoC + NDSA)
description: Recon pass on the question of ground truth that outlives its own technology.
sidebar:
  label: Recon- 20 Year Archival
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge collaborative-mess">Collaborative Mess</span>
</p>

25-Aug-2026

> Recon pass on the question of *ground truth that outlives its own technology.* It derives from a conversation with Georgia Tech's Tech AI and diverted from it.
>

The Question:
> The design horizon is roughly twenty years. Nothing in today's stack — vector database, embedding model, file format, the whole lot — will still be running at the end of it. So, the durable artifact can't be the index; it has to be something from which the memory can be rebuilt with whatever exists in 2046. What does the archival or digital-preservation literature say about representing personal memory for reconstruction rather than retrieval?

## The reframe that collapsed the question

The original plan pointed at archaeologists and architectural historians — Mamoli (reconstruction of ancient libraries under evidential constraint), Willkens (heritage documentation, HBIM, reality capture).

**Wrong tool, and the reason is structural.**

|  | Works with | Controls the deposit? |
| --- | --- | --- |
| Archaeologist / heritage historian | **Involuntary residue** — what someone left without meaning to | No. The discipline exists *because* the depositor wasn't trying. |
| Pepa | **Deliberate, controlled writes**, now | Yes. Entirely. |

A theory of coping with someone else's carelessness is not what's needed. What's needed is the rubric for not being careless. That reframe collapses most of the Question.

**Mamoli isn't wrong — she's filed under the wrong question.** Reconstructing a life from residue someone else left *is* what happens at Pepa deployment for a new senior: eighty years of photos, documents, and other people's recollections that Pepa had no hand in creating. That belongs to the **cold start** question, and it's the intake interview — the "geriatric experts" are conducting an excavation. Which is why that framing went in another direction instead.

---

## What survives the collapse

One thing, and it isn't a format problem:

**A JSONL file in 2046 is readable but not necessarily interpretable.** Someone opens it and finds `{"trust": 0.82, "supersedes": "mem:4471", "source": "explicit_user"}`. Readable, yes. Meaningful only if a plain-prose document beside it explains what trust means, what supersession implies, and what `explicit_user` was distinguishing itself from.

That is the only real work in the Question, and nobody else can do it — not a library, not a professor. It has to be written while the reasons are still remembered.

**LoC already has a name for it: “Self-documentation.”** It is one of their seven formal evaluation factors, not an afterthought.

---

## Library of Congress — Recommended Formats Statement (RFS)

In its second decade, first launched 2014. Current edition **2025–2026**. Comments to `rfs@loc.gov`.

**Honest assessment:** as a document it is mostly useless here — nine of eleven sections cover books, microforms, vinyl, motion pictures, video games. The seven sustainability factors are *named* in the introduction but never defined. And the RFS is explicitly geared toward **published content, not personal papers**.

Two sections are directly relevant.

### VI.i Datasets — confirms JSONL

> Platform-independent, character-based formats are preferred over native or binary formats as long as data is complete and retains full detail and precision. Line-oriented, e.g. TSV, CSV, fixed-width. Character encoding, in descending preference: UTF-8, UTF-16 (with BOM).
>

JSONL is line-oriented and character-based. **Instinct confirmed.**

The metadata requirements under Datasets are the self-documentation gap made concrete:

- data dictionaries, schemas, technical specifications
- **a key or reference to each data field** ← this is the `trust: 0.82` problem, named
- checksums
- permanent version specifiers (date, version number)
- **information about how the data was collected and any sampling or post-processing applied** ← provenance, stated as a deposit requirement

### VI.ii Databases — names JSON specifically

> Files in formats which support linking or embedding external resources (e.g. XML, JSON, Excel) should be **self-contained** to remain useful in the event of external service changes. The raw data is available without executing code.
>

An argument against storing references to rows in another system.

### IV.ii Audio — corrects the WAV plan

> **WAVE file with embedded metadata (Broadcast WAVE) rather than without.** File in native resolution rather than up-sampled. Uncompressed rather than compressed.
>

**Action item: BWF, not plain WAV.** Broadcast WAVE is a standard chunk inside an ordinary WAV file carrying origination date, time reference, and description. Any WAV reader still opens it; a reader that doesn't know BWF ignores the chunk. Timestamp and context live *in* the file rather than in a filename or a separable sidecar. One library's cost.

---

## The Format Evaluation Matrix template (XLSX) — the actually useful artifact

This is what the PDF withholds: **the seven factors with their defining questions.** Responses are Yes / Maybe / No.

| Factor | The question it asks |
| --- | --- |
| **Disclosure** | Is technical information available through complete and open documentation and specifications? |
| **Adoption** | Widely used, especially by peers? Integrated into multiple toolsets, not locked to one vendor? Are community user groups available for advice and support? |
| **Transparency** | Can it be analyzed with basic tools? Standard character encoding supported? Is lossy compression or encryption enforced? |
| **Self-documentation** | Can a file in this format describe its own content and structure with embedded metadata? (Plus accessibility support.) |
| **External dependencies** | Free of dependence on particular hardware, OS, or software for rendering or use? |
| **Impact of patents** | Free from patent terms that might impede long-term use? |
| **Technical protection mechanisms** | If DRM/encryption is *required*, can custodians reliably maintain future access? |

**Preferred** = meets or exceeds benchmarks on all relevant factors. **Acceptable** = minimum acceptability, or misses some.

### Two findings from the worked sample

**1. LoC's own sample row is WAV/LPCM, rated Preferred on all seven factors.** Links to their format description `fdd000002`. The exact format already chosen.

**2. The transcript can live inside the WAV.** From the Self-documentation cell on that row:

> Closed captions and transcriptions can be embedded within the **Labeled Text chunk (`ltxt`)** and identified with a 'Purpose' label — `capt` for closed-caption text, `tran` for transcription. The optional **Associated Data Chunk** provides context for the audio data along the timeline.
>

_For a voice memory archive this is significant_: one self-describing file, timeline-aligned, **no join to maintain for twenty years.** No sidecar JSON that can get separated from its audio.

### Adapting the second half

The matrix's back half is LC-local — staff expertise, software availability, whether they hold 100,000+ files of it, repository tooling, whether it renders on loc.gov. Not directly applicable, but the shape adapts cleanly to Casa Delta: **can José maintain it, will it run on hardware he'll still have, is it already in the workflow.**

---

## NDSA — Levels of Digital Preservation v2.1

Released **March 2026**. The operational complement.

**LoC answers "what format do I write." NDSA answers "what do I have to keep doing, forever."** Fixity checking, multiple copies, storage refresh, access control, metadata upkeep. Format choice is made once; the Levels are the chores that never stop. Functional areas include **Storage, Integrity, and Content**.

Tiered matrix — you can sit at different levels in different functional areas according to resources. The right shape for one person with a homelab rather than an institution.

**Resources available:**

- Matrix (color + B/W)
- **Assessment Tool** — downloadable spreadsheet template to record and visualize results, with guidance and two worked case studies. The usable artifact.
- Implementation Guidelines and Working Definitions
- Digital Curation Decision Guide (visual + narrative)
- Environmental Sustainability Guide (new in 2.1)
- Training slide deck (v2.0)

All hosted on OSF (`osf.io/rcs38`). Site content is **CC BY-SA 4.0** — reusable in the Pepa blueprint with attribution, share-alike on that portion. Worth noting against MIT.

**Spanish translation of the Matrix v2.0 exists** via **APREDIG** (Ibero-American association for digital preservation). Not incidental — an existing Spanish-language preservation community and a vocabulary that doesn't have to be invented.

---

## Open doors found (none pursued)

| Door | Cost | Note |
| --- | --- | --- |
| **NDSA Levels open sessions** | Free | Quarterly open sessions, anyone welcome; bi-monthly discussion sessions via NDSA-All listserv. A room of working archivists vs. one cold email to one professor. |
| **DigiPres Conference 2026** | CFP open, virtual | A one-person twenty-year personal preservation program is unusual for that audience. |
| **APREDIG** | Unknown | Spanish-language preservation community. |
| `ndsa.digipres@gmail.com` | — | General NDSA contact. |
| `rfs@loc.gov` | — | RFS comments. |

---

## Where this leaves the Question

**Largely answerable without outreach.** The reframe removed the need for a theory of reconstruction; LoC supplies the format rubric; NDSA supplies the operational program.

Not yet done:

- [ ]  Fill the LoC evaluation matrix for **JSONL** and **BWF** (~1 hour; produces a defensible answer in a form that can be handed to anyone)
- [ ]  Run the NDSA Assessment Tool against current Casa Delta practice
- [ ]  Write the data dictionary — the plain-prose "key or reference to each data field." The one irreducible piece of work.
- [ ]  Verify where JSON/JSONL currently sits in LoC's format descriptions (their file-format research posts show active work on YAML, so the dataset category is moving)

---

## Not decided here

Recon only. No OBOSBS requested or produced. BWF-over-WAV is the only concrete change proposed, and it is not yet accepted.