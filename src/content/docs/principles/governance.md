---
title: Governance
description: How Pepa is governed, what is enforced today, and what is only declared.
template: doc
sidebar:
  label: Governance
  order: 0
  badge:
    text: Upd
    variant: caution
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

This page is append-only. Corrections arrive as new, dated entries with supersession
notes; prior text is not silently rewritten.

| Version | Date | What changed |
|---|---|---|
| 0.2 | 2026-10-27 | Adds a dated entry on the Sensory Arm boundary and a fourth tier, *Identified, not yet designed*, and records wording changes made to v0.1 text. See [the entry](#entry-02--2026-10-27-the-sensory-boundary) at the end of this page. |
| 0.1 | 2026-09-08 | First publication: what is enforced, what is only declared, what is designed, and three problems not yet solved. |

## Why this page exists

The literature on agentic AI governance is substantial and growing. A 2025 systematic
review of 90 studies (Ali & Dornaika, *Agentic AI: A Comprehensive Survey*,
[arXiv:2510.25445](https://arxiv.org/html/2510.25445v1#S8)) reports two things that bear directly on this project: governance
research is aimed overwhelmingly at neural, LLM-orchestrated systems, leaving a
documented deficit in governance models for deterministic and symbolic ones; and the
deployments it surveys are institutional — hospital EHR pipelines, financial compliance,
factory floors. Households do not appear. Neither does aging in place.

Pepa sits in both gaps. Most of its governance effort goes into deterministic machinery,
and its deployment target is one home with no IT department, no compliance officer, and
no procurement cycle.

That review is a survey, not a framework, and its corpus stops in early 2025. It is cited
here to locate the problem, not to settle it.

## The assumption almost everyone makes

Read enough agentic governance work and one assumption appears everywhere, unstated
because it is invisible to the people making it: **there is a competent, persistent
principal.**

The standard taxonomy of agency — assistive, shared, delegated — is a taxonomy of how
much a human decides. Accountability frameworks assume a developer to hold liable and an
operator to intervene. Human-in-the-loop assumes a loop, and someone alert inside it.
Override capability assumes someone who notices there is something to override.

Every one of those assumptions is reasonable in a hospital. None of them is safe in a
house where the operator, the primary user, and the architect are the same person, and
the design horizon is longer than that person's expected capacity to supervise.

## Pepa's inversion

Pepa is built for the case where the principal declines — gradually, unpredictably, and
possibly without recognising it.

This is not a hypothetical. The system is developed and field-tested by its own eventual
user, which is what keeps the work honest and is also why the assumption cannot be
waved through.

Three consequences follow, and they explain most of the architecture:

**Autonomy does not expand as supervision weakens.** The tempting design — the assistant
takes on more as the person can do less — is precisely the one that removes the check at
the moment the check starts to matter. Pepa's authority is fixed by explicit,
human-granted mandates that expire and can be revoked. Declining capacity is not a
promotion event.

**Anything the system infers about the person is advisory, permanently.** Observations,
interpretations, and predictions are separate classes with separate rules. An
interpretation — including any inference about cognitive change — routes to a human. It
never reaches an actuator, and no accumulation of confidence changes that.

**Continuity to the cloud is a break-glass, not a capability dial.** The reach from an outside model
via MCP/A2A/API exists so that caregivers are not left holding a dead box if the operator becomes unable
to run or communicate with the system. It is shut in steady state. It is not a way to
make Pepa smarter as the person gets frailer.

## What is enforced, what is only declared

Stating principles is cheap. The distinct categories below are the point of this page, and the
third category is not an apology — it is the roadmap.

### 1. Enforced in code today

- **The operations plane and the cognition plane never cross.** Home Assistant handles
  clock- and probe-triggered deterministic orchestration and never calls a language
  model. The orchestrator never owns a schedule. Home Assistant's own LLM task entity
  bypasses the guardrail layer and is therefore refused outright.
- **Retrieval is not authority.** Recalled memory enters the prompt under an explicit
  banner marking it as answerable context, not as permission to act. The retrieval gate
  and the authority gate are separate structures.
- **Provenance attaches at write time or not at all.** Every stored fact records whether
  it came from an explicit statement by the user or from inference, and that distinction
  sets its trust ceiling. Explicit user statements win every contradiction against
  inferred ones.
- **Escalations carry the person's exact words.** When something is escalated to a human,
  the verbatim utterance travels with it — never a model-composed paraphrase.
  Paraphrase silently drops negation, dosage qualifiers, urgency, and code-switching.
- **Safety-critical entries never fade.** Medications, allergies, fall history, and
  emergency protocols are exempt from every decay, salience, and modulation mechanism. **This is a pillar of the 20-year horizon memory scheme**.
- **Records are append-only.** Corrections are supersession events with dates and
  provenance chains. Nothing is edited in place; nothing is deleted quietly.
- **Degraded operation announces itself.** Every fallback path raises a visible warning
  or repair notice rather than quietly doing less.

### 2. Declared and binding, but enforced by discipline rather than by code

- The five standing directives: no silent action; no inferred intent; no external
  escalation without internal exhaustion; no commerce without explicit approval; and the
  user may always ask *why now?* and get a straight answer.
- Actuation is gated jointly by standing policy and by a current, revocable mandate.
  The classes are specified; the joint gate is not yet a single enforcement point.
- Promotion of a belief to trusted status requires causally independent corroboration.
  A fact may not be confirmed by its own echo.
- Any machine suggestion touching medical records is approve-only. Never auto-applied.
- One concrete illustration of the gap between declared and enforced: entities in the
  home can be labelled as requiring confirmation before action. The label is published
  and displayed — and at present no code path reads it. Nothing enforces it. It is listed
  here rather than omitted, because a governance page that only lists working controls is
  incomplete.

### 3. Designed, not yet built

- Placement of the policy guardrail layer across the whole sensory path.
- A single deterministic contract validator, called by both the orchestrator and the
  subsystems, failing closed when unreachable.
- The self-monitoring subsystem: a deterministic state machine, advisory-only, hosted on
  separate hardware so that it does not fail for the same reason the thing it watches
  fails.
- Typed contracts on the orchestrator-to-subsystem seam.

## Three problems we have not solved

**What accountability artifact survives the architect?** Liability frameworks assume a
developer and an operator. In year twelve there may be neither. There should exist a
document a caregiver, a clinician, or an attorney can read that establishes what the
system was authorized to do at a given moment, and by whom. The revocable-mandate model
is designed to make that reconstructible. It is not yet written down in a form a
non-engineer could use, and the continuity break-glass answers a different question —
operational, not accountable.

**What does a fairness audit mean at a sample size of one household?** Bias in a
deterministic system comes from hand-coded rules and thresholds: whose normal is encoded
in a baseline, whose speech is assumed by a wake word, whose dialect the transcription is
tuned for. Building bilingually from the first line is a capability decision, not a
fairness control, and we should not let it stand in for one. This row is currently blank.
Saying so is the only honest option available.

**Has anyone checked that the explanations are understandable?** The system is required to
answer *why now?* on demand, and it should. What has never been tested is whether the answer
lands with someone who is not an engineer, is tired, or is frightened. The one person who
has read those explanations in daily use is the person who wrote them, which is the weakest
possible test of comprehensibility. An explanation that satisfies its author and confuses
its reader is not oversight; it is the appearance of oversight, and that is worse than
none, because it invites trust it has not earned. This needs testing with people who did
not build the system.

## How to read this page

Nothing here is a promise about what the software does. The three headings above are the
promise: that the difference between enforced, declared, and designed will always be
stated, and that a claim will not migrate upward without a dated entry saying so.

Pepa is MIT-licensed and self-hosted. The mechanisms described here are inspectable by
anyone willing to read the code, which is the only form of assurance this project is in a
position to offer.

## Entry 0.2 — 2026-10-27: the Sensory boundary

[The Sensory Arm](/arms/sensory/the-sensory-arm/) now defines itself as the boundary
between Pepa and the physical world, with two scopes: the house, which perceives, acts
and speaks, and the human, which only collects telemetry. Its decisions are numbered in the
[Sensory Arm Decision Register](/arms/sensory/decisions/), cited below by ID. This
entry places each of them in a tier. Nothing listed in v0.1 moves up a tier by this
entry.

It also adds a fourth tier. *Designed, not yet built* was being used for things that
have a design; some things only have a name and a reason. Those now say so.

### Enforced in code today (added)

- **Pepa's conversation sees only what is exposed to it.** The Sensory Arm's house scope
  builds Pepa's context — the device catalog, live states, retrieved context and its
  tools — only from entities exposed to the assistant. Verified in the repository code on
  2026-10-25; the deployed copy is assumed to match.
  The exposure settings themselves are switches an administrator can change; that half
  is enforced by discipline, below.

### Declared and binding, enforced by discipline (added)

- **Exposure stays off for health and new entities.** Health entities are unexposed and
  automatic exposure of new entities is off. Nothing yet alarms if either changes.
- **Reflexes.** The house scope acts on its own only through reflexes: direct, requested
  house actions under explicit, declared and guardrailed rules, never beyond them
  (D-05). A reflex operates under the standing policy of its rule; how that maps to the
  current-mandate requirement in v0.1 is listed under *Identified, not yet designed*.
- **No alarm is a reflex.** Shower safety, a watch's fall report and similar signals are
  observations. The Sensory Arm delivers alarms; it does not decide them (D-12). An alarm
  that leaves the house is an external escalation and falls under the standing
  directive on escalation.
- **The human scope is collection only.** It actuates nothing, speaks to no one and is
  not exposed to conversation. It runs on its own Home Assistant instance to limit blast
  radius and for privacy (D-04). That separation is enforced by deployment and
  discipline, not by a validator.
- **What the Sensory Arm owes its readers.** Values kept as received and declared, with
  nothing entering undeclared (D-06); two timestamps per reading (D-07); a subject or
  none (D-08); provenance on the Input and Origin axes (D-09); a verified true copy as
  ground truth (D-10). Declared here; not yet implemented.
- **Preserving an observation does not make it true.** A kept observation carries no
  authority by being kept. Interpretations and predictions keep their link to the
  observations they rest on, never modify them, and gain no authority from repetition or
  confidence.
- **Health information spoken to the Sensory Arm is punted** by the house scope, which only voices
  the reply (D-11).
- **No cameras.** Pepa does not use cameras until a compelling use case appears. Cameras
  in the house belong to a security plane outside Pepa (D-13).

### Designed, not yet built (clarified)

- The v0.1 item *placement of the policy guardrail layer across the whole sensory path*
  stays in this tier. The separate human-scope instance limits one blast radius; it does
  not guard the house path. The item's objective is now stated: no path through which
  Pepa receives an observation, speaks to a person or acts on the house may bypass the
  authorization required for the operation it performs. The guardrail is defined by the
  operation, not by the component that happens to perform it.

### 4. Identified, not yet designed (new category)

- **The mandate behind reflexes:** its scope, its expiry, and which house actions always
  require escalation or fresh authorization.
- **Who owns alarm decisions** (O-01).
- **The source of identity** for attributing readings (O-02).
- **Where declarations live** — the record of what each feed is, required by D-06 (O-06).
- **Capability exclusions per scope and arm,** written down: what each must not be able to
  access or do, so a violation is visible rather than a setting nobody reads.
- **An audit record for physical-world actions:** what started it, which component, which
  rule and mandate, whether it was a reflex or authorized higher up, the result, and any
  failure. Related to the accountability artifact above.

### Wording changes to v0.1 text (2026-10-27)

Some v0.1 text was edited in place on this date, before this rule was applied to it. They
are recorded here so the change is not silent. No claim moved up a tier.

- **Weakened:** the system "is required to answer *why now?* on demand, and it does" now
  reads "and it should". The claim is no longer stated as a fact.
- **Reworded:** the continuity paragraph under *Pepa's inversion* now reads "Continuity
  to the cloud is a break-glass" and names MCP, A2A and API as the routes. The reach runs
  both ways: outward, under a directive a human approved beforehand (for example,
  coding-agent jobs), and inward, so that a caregiver who does not know what to do with
  Pepa can consult an outside model. The v0.1 wording described only the outward half.
- **Added:** under *Enforced in code today*, a sentence on safety-critical entries
  calling them a pillar of the 20-year memory scheme.
- **Renamed:** the four tiers are numbered, and "the third column" now reads "the third
  category".
- **Softened:** "is not a governance page" now reads "is incomplete".
