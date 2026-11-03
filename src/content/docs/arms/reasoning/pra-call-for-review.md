---
title: Reasoning Arm Call for Review
description: User Requirements Specification document
template: doc
lastUpdated: 2026-11-03
sidebar:
  label: Pending Review
  order: 2
  badge:
    text: New
    variant: tip
draft: false
---

<span class="a4a-badge ai-generated">AI Generated</span>
<span class="a4a-badge human-curated">Human Curated</span>

# Proposed design for review - We need your help

We are asking for feedback on the specs for an AI agent that can plan, analyze, imagine and explain for Pepa, but is built so that it can never act on its own: it only thinks, and people or other parts of Pepa decide and execute.
We ask deep thinkers interested in the subject to assess this proposed design with their preferred tools and report their findings.
If AI tools are used we'd love to hear the specific LLMs used, especially if self-hosted so we can compare vs. cloud. Please email your findings to the [Architect](mailto:arch@ai4aging.org).
We'll contact you afterward, thank you very much!

## What this is

**Pepa** is a local-first, privacy-first AI assistant designed to help older adults stay at home with more independence. It is built like an octopus: a coordinating **Head** and several **Arms**, each with one job (sensing the home, remembering, looking things up, watching for health signals, and so on). Everything runs on equipment in the homelab, not in the cloud.

The **Reasoning Arm** is the arm that thinks. Other parts of Pepa can hand it a question and the material to think about, and it hands back a plan, an analysis, an explanation or a what-if. It is deliberately **not allowed to decide or to do**: it has no keys, no controls, and no route to the parts of the system that act on the home. Its answers are suggestions, labelled as such.

**Why now.** On 2 November 2026 a local model was asked to cross-check a long project record against its own summary. It did badly: it lost track of the middle and filled gaps with plausible text. The fix is not a bigger model but a better harness around it, and this arm is that harness.

## The design at a glance

![Diagram of the proposed design, top to bottom. Callers (operator, voice assistant, the Head later) use one of three doors: completion, job or operator tools. Every request passes the code-only shell, which checks token and address, requires authority none, handles state, budget and refusals, checks quotations in code and keeps its own record. Behind it sit the models core with fixed steps per verb and a reviewer in another slot, then, through a firewall that is the only way out, the model server on the existing local host. A separate outside check reads the shell's state and record and judges whether the arm is dead.](../../../../assets/Reasoning_Arm_Design_At_A_Glance_20261103.png)

*Every request passes a code-only shell before any model. Other arms have no door of their own.*

Callers reach one of three doors. Whatever the door, the request passes the code-only shell, and only then does a model see it. The models sit on a separate server behind a firewall, which is the only way out of the arm. The dashed arrow is an outside check that decides whether the arm is dead, because a dead arm cannot say so itself.

## How it works

There are three ways in, and they are kept separate on purpose. Every call passes the same code-only checkpoint, which we call the **shell**, before any model sees it.

| Way in | Who uses it | What it is for |
| --- | --- | --- |
| Completion door | The operator, the home's voice assistant, later the Head | A plain, quick answer in the format many tools already speak (OpenAI-compatible). Every answer is labelled "unclassified". |
| Job door | The operator now, the Head later | A formal request: submit a job, check on it, collect the result, cancel it. For work that takes minutes. |
| Operator tools | The person running Pepa | Settings kept as plain files, and a viewer for the arm's record of what it did. |

The job door offers six kinds of work:

| Service | You give it | You get back |
| --- | --- | --- |
| Completion | A message | One answer, never to be stored as fact |
| Plan | A task and what is known | A step-by-step plan, or a plan marked "infeasible" with the reasons |
| Analyze | Documents and a question | Findings, each tied to an exact quotation (cross-check, review, compare, extract) |
| Imagine | A premise | Scenarios and drafts, stamped "hypothetical" |
| Explain | Records and an audience | A plain-language explanation that adds no facts |
| Research | A question and permitted sources | A report with a source for every claim |

A **help** call tells a caller what the arm can do. There is deliberately no "can you do this?" pre-check, because the honest answer usually requires attempting the work.

## What keeps it safe

The design puts its limits in code and in the network, not in instructions to a model. A model can be talked around; a firewall rule cannot.

- **No power to act.** The arm holds no keys to the home's controls and has no network route to them. A separate firewall enforces this.
- **Callers must prove who they are.** Each caller has its own token and a fixed network address. Unknown callers are refused before anything runs. Every request also carries an "authority" field that must read *none*; anything else is refused in code.
- **Answers are labelled by what they are.** A plan is a proposal, an analysis is an interpretation, an imagined scenario is a hypothetical, a plain completion is unclassified. Nothing the arm produces can enter Pepa's memory or knowledge as a fact. At most it enters marked as inferred, and only if another part of Pepa decides so.
- **Claims must point to evidence.** Every claim carries its source, or an explicit "no source" marker. For analysis, code checks that each quotation really exists in the supplied document and belongs to the section it names.
- **Models check models, not routes.** The caller states what it wants; no model guesses intent. A second, different model reviews the first one's findings. When they disagree, both views are shown rather than one being picked.
- **Failures are loud.** A refusal, a timeout or an error is shown to the caller and written to the arm's own record. A silent log line does not count.
- **One job at a time, and "busy" is an answer.** The arm says at once when it is busy, in maintenance or unavailable. "Dead" is never something the arm reports about itself; an outside check decides that from the silence.
- **A job only counts as done when its result is valid.** If the budget runs out, the job is refused with its partial work attached and marked *not a deliverable*.

## First test and build order

The first real job is the one that failed: cross-check a long record's summary against its detailed log. The arm splits both documents by their own headings, extracts one claim per summary bullet, finds candidate evidence in code, asks a model for a verdict plus an exact quotation, and then checks in code that the quotation is real. The test set will include planted errors: wrong quotations, unsupported claims, contradictions and superseded evidence. A pass means the arm catches them.

Build order, smallest useful step first:

1. The shell: caller identity, state answers and the arm's own record.
2. The completion door, then move the home voice assistant's fallback onto it with its calling contract unchanged.
3. Close the direct route to the models for Pepa's other machines, and start an outside liveness check.
4. The job door with one service: analyze, cross-check, with the planted-error tests.
5. The reviewer model and a replay bench for comparing models on real work.

Deferred until two services prove their contracts: the operator panel, a tool interface for local agents, an internal queue, an agent framework, a scoreboard, and research beyond supplied sources.

## Questions for you

Comment directly on any line, or answer the questions below. Short answers are welcome; respectful disagreement is the most useful kind.
Please email your answers to the [Architect](mailto:arch@ai4aging.org).

1. **Proving identity.** Callers prove who they are with a per-caller token plus a fixed address on a home network. Is that enough, or too much?
2. **Plain answers.** Plain completions are labelled "unclassified" and can never become a stored fact. Can you see a way an invented answer could still leak into something Pepa treats as true?
3. **Quotes versus meaning.** Code can prove a quotation exists and where it comes from, but not that it supports the claim. A second model and a person check that. Is there a cheap, trustworthy check we are missing?
4. **Busy means busy.** The arm answers "busy" immediately and does not queue; the coordinator decides what waits. Is that the right trade for a one-job-at-a-time home system?
5. **Infeasible plans.** When a task cannot be done with the means available, the arm returns a plan marked "infeasible" with reasons, instead of a refusal. Natural, or confusing?
6. **Separate network segment.** The arm runs on its own network segment, apart from the machine that hosts the models, so that "it cannot act" is a firewall rule. Is the extra moving part worth it?
7. **First jobs.** Beyond cross-checking documents, what is the first thing you would ask a thinking-only helper to do for a household or its caregivers?
8. **Distrust.** What would make you stop trusting an answer from this arm, and what would we need to show you to restore that trust?

