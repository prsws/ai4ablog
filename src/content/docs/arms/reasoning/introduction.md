---
title: The Reasoning Arm — Introduction
description: Reasoning as a bounded, replaceable capability — the argument for why control never moves here, and an honest account of how much is actually built.
template: doc
lastUpdated: 2026-11-03
sidebar:
  label: Introduction
  order: 0
  badge:
    text: New
    variant: tip
draft: false
---

<span class="a4a-badge ai-assisted">AI Assisted</span>

## Introduction

In Pepa's architecture, the Reasoning Arm is not the system's ruler — it is its
cognitive engine. Its role is simple, to think: plan, analyze, suggest, etc. It does not
decide, orchestrate, or execute. That authority belongs to the Head or is embedded
within the autonomy of any requesting Arm.

> _The Reasoning Arm turns a common "OpenAI-compatible" ENDPOINT into a full-fledged thinking AGENT._
>

This separation is intentional.

By isolating reasoning as a replaceable, bounded capability, Pepa avoids the common
trap of overloading a single LLM instance with responsibility. Think
of it as "Reasoning as a Service" — the Head, Beak, or any other Arm can request
that it think through something with a specific model as needed.

## What is actually built

Here is the honest version, because the section above describes a boundary rather
than a mechanism, and the two are at very different stages.

We did not know how a Reasoning Arm was supposed to work. So it started as the
smallest thing that serves: a Mac Studio running an OpenAI-compatible inference
endpoint. Nothing more. No agent loop, no planner, no state, no orchestration. A
request goes in, a completion comes out.

That is less than the name suggests, and it is deliberate rather than
embarrassing. A box that answers inference requests and decides nothing **is** the
arm as specified — the whole architectural claim is that reasoning should be a
bounded capability behind an endpoint, deliberately stripped of authority. If it
were doing more, that would be the failure this design exists to avoid.

The real gap is not in the arm. It is that **the caller doesn't exist yet.**
"Reasoning as a Service" presumes a Head that requests reasoning, and it's unbuilt. Today the Mac Studio is reached by the Sensory Arm's escalation
path — a punt from the local model when it _judges_ a query beyond its Home Assistant domain mandate — rather
than by an orchestrator asking for cognition. The impact is real - at Casa Delta an open mic (from a [weak wake-word](/arms/sensory/voice-satellite-considerations/)) in a voice
satellite picked up TV news dialog and commented on it because it didn't belong to the house mandate and was punted to the
existing endpoint with no additional context.

The service half is real. The architectural half is waiting on the cognition plane.

That is still the whole of what runs. The boundary is decided, the mechanism is being worked out in the proposed specs.

_In Pepa, intelligence is modular. Control is not._

---

## Where it goes next: a thinker that cannot act

The open question — what does a Reasoning Arm do beyond serving completions — now
has answers, and they're more complex than we originally thought. What follows is a
short summary of the proposed design. The full requirements and feature list are in
[Requirements & Feature List](/arms/reasoning/reasoning-urs/), and the version written
for reviewers is [Call for Review](/arms/reasoning/pra-call-for-review/). **Nothing in
the proposal is settled.**

### The proposal in brief

- **A checkpoint written in code, with no model in it.** Every request passes it
  first: caller identity (a token per caller plus a fixed network address), the
  _authority: none_ check, state and budget, typed refusals, and the arm's own record.
  "Never executes" stays structural, with a firewall rule between the arm and the
  model server.
- **Three doors.** A plain OpenAI-compatible completion door (what runs today), a job
  door for work that takes minutes, and operator tools. A `help` call replaces the
  pre-check this design rules out.
- **More than plan and research.** Analyze (cross-check, review, compare, extract),
  imagine (always stamped hypothetical) and explain (adds no facts) join plan and
  research. Analyze checks in code that every quotation exists in the supplied
  document, and a second, different model reviews the first.
- **Honest outcomes.** Idle or busy becomes availability plus execution state; _dead_
  is judged from outside, because a dead arm cannot report itself. Only a valid result
  counts as done. Plain completions are labelled _unclassified_ and can never become a
  stored fact.

### What changed from the earlier page, and what it does not yet cover

The earlier page, [The Reasoning Arm](/arms/reasoning/the-reasoning-arm/), is kept as
written and marked deprecated. We checked the proposal against it line by line. The
proposal departs from it, or does not yet cover it, in these places:

1. **Scoreboard.** The earlier page says confidence is grounded by a scoreboard kept
   "from the first job onward". The proposal defers the scoreboard to the run stage.
   It should record whether a human accepted each result from the first job and defer
   only the display.
2. **What is a plan?** The earlier page's first open question, what a plan is
   structurally, is not answered. The proposal carries only an "infeasible" flag.
3. **Walk is a planner there, an analyzer here.** The earlier page's walk stage is one
   job in, one plan or refusal out. The proposal's first build slice is a cross-check.
4. **The voice path is touched.** The earlier page says the Sensory hot path is
   "untouched by construction". Under the proposal the punt passes through the new
   checkpoint, so it needs a latency budget and a measurement before it moves.
5. **Conversation.** The earlier page says plainly that the punt is the conversation
   capability today and the contract must serve both until a Conversation Arm exists.
   The proposal serves it through a caller profile but dropped the statement that
   conversation is not offered by design.
6. **The arm's body.** The earlier page treats the Mac Studio as the arm. The proposal
   puts the checkpoint in a separate container and leaves the Studio as a pure model
   server.
7. **An inconsistency in the earlier page.** Its introduction says the Head, Beak or
   any other Arm can request reasoning; its planning section says the arm never takes a
   request from a peer directly. The proposal follows the stricter reading.
8. **An untested assumption.** The earlier page says whether research and planning
   share one machine is "worth testing before committing". The proposal assumes one
   job envelope for both.

Other changes are deliberate: five refusals become four (with "nothing available can
achieve it" becoming a plan marked _infeasible_), the arm answers _busy_ at once,
results are kept until collected or seven days instead of "hand back and forget", and
the Head remains the queue unless a concrete need appears.

### This design is a ledger

The [Requirements & Feature List](/arms/reasoning/reasoning-urs/) is no longer a draft
awaiting a verdict. It becomes the ledger of how this design evolves: each revision is
appended with its date and its reason, nothing is overwritten, and each open decision
stays open until someone closes it, with the reason.

### Call for action

We need volunteers to take this proposal apart and improve it before adoption, always
keeping the Pepa mission in mind. Instructions are in
[Call for Review](/arms/reasoning/pra-call-for-review/).
