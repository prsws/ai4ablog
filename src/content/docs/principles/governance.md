---
title: Governance
description: How Pepa is governed, what is enforced today, and what is only declared.
template: doc
sidebar:
  label: Governance
  order: 0
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

**Version 0.1 — 2026-09-08.** This page is append-only. Corrections arrive as new,
dated entries with supersession notes; prior text is not silently rewritten.

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

**Continuity is a break-glass, not a capability dial.** The reach to an outside model
exists so that caregivers are not left holding a dead box if the operator becomes unable
to run or communicate with the system. It is shut in steady state. It is not a way to
make Pepa smarter as the person gets frailer.

## What is enforced, what is only declared

Stating principles is cheap. The distinction below is the point of this page, and the
third column is not an apology — it is the roadmap.

### Enforced in code today

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
  emergency protocols are exempt from every decay, salience, and modulation mechanism.
- **Records are append-only.** Corrections are supersession events with dates and
  provenance chains. Nothing is edited in place; nothing is deleted quietly.
- **Degraded operation announces itself.** Every fallback path raises a visible warning
  or repair notice rather than quietly doing less.

### Declared and binding, but enforced by discipline rather than by code

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
  not a governance page.

### Designed, not yet built

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
answer *why now?* on demand, and it does. What has never been tested is whether the answer
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