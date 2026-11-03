---
title: The Reasoning Arm
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
than by an orchestrator asking for cognition. The impact is real - an open mic (from a weak wake-word(link here)) in a voice
satellite picked up TV news dialog and commented on it because it didn't belong to the house mandate and was punted to the
existing endpoint with no additional context.

The service half is real. The architectural half is waiting on the cognition plane.

That is still the whole of what runs. The boundary is decided, the mechanism is being worked out in the proposed specs.

_In Pepa, intelligence is modular. Control is not._

---

## Where it goes next: a thinker that cannot act

The open question — what does a Reasoning Arm do beyond serving completions — now
has answers, and they're more complex than we originally thought. Here's a very concise summary of the proposed features.
The details are documented **HERE** and **HERE**.

**CALL FOR ACTION** We need volunteers to crunch through this proposal and improve it before adoption, always keeping in mind the Pepa mission.
Instructions **here**

start concise summary<br/>
end concise summary

