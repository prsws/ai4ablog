---
title: House Sensing
description: The Sensory Arm's house scope — the senses, muscles and voice of the home. A stub that records what is settled and what runs today; the full article is not written yet.
template: doc
sidebar:
  label: House Sensing
  order: 2
  badge:
    text: New
    variant: tip
draft: false
---
<span class="a4a-badge ai-generated">AI Generated</span>
<span class="a4a-badge human-curated">Human Curated</span>

> **Stub.** This page records what is already decided and what runs today. It will be
> expanded into a full article. Nothing here is new doctrine: every statement points to
> the [Decision Register](/arms/sensory/decisions/) or to
> [The Sensory Arm](/arms/sensory/the-sensory-arm/).

## What this scope is

House sensing is one of the two scopes of the Sensory Arm identified so far (D-02). In
the body analogy it is the senses, the muscles and the voice: it perceives the house,
acts on it, and speaks in it. Its counterpart is
[Human telemetry](/arms/sensory/human-telemetry/), the internal organs.

It belongs to the Sensory Arm because of the boundary it crosses, not because of what
it observes (D-01). Presence, doors, motion, climate and devices cross inward as
observations. A switched fan and a spoken sentence cross outward.

## What runs today

One Home Assistant instance runs the house: presence radars, door sensors, lights,
fans, the carport gate and the voice satellites. On top of it sits the
`pepa_sensory_arm` integration, a ReAct loop with three tools: `ha_query`,
`ha_control` and `call_external_llm`. The first two are reflexes. The third is the
punt. The [version history](/arms/sensory/psa-version-history/) records how the stack
got here. A rebuild of that integration, `pepa-sensory-arm-house`, is in progress and
not deployed (D-16).

Pepa's conversation sees only the entities exposed to it. That limit is enforced in
code; keeping the exposure switches where they should be is, for now, discipline. See
[Governance](/principles/governance/).

## What is settled

- **Reflexes only.** The scope acts on its own only through reflexes: responses it
  completes itself, through rules declared in advance, without consulting the Head or
  another arm, recorded afterward in the arm's ledger (D-14). For this scope that means
  direct, requested house actions under explicit, declared and guardrailed rules, never
  beyond them — its narrowing of the definition (D-05).
- **Ask before what cannot be undone.** An entity is reversible only when declared so.
  Any other action waits for a person's yes, from the same place the request came from;
  a request nobody there can confirm is refused (D-17).
- **Requests from other arms are not reflexes.** Speaking a reply, delivering an alarm,
  acting for the Head or another arm: the decision is theirs, the faithful execution and
  the ledger record are this scope's. Such requests are bound by its physical limits and
  its own authority limits, whoever asked (D-15).
- **Alarms are delivered, not decided.** Shower safety and similar signals begin here
  as observations. The scope can deliver an alarm; deciding that one is warranted is
  not its job (D-12).
- **Health talk is punted.** A health matter spoken in the house is not housework. The
  scope hands it on and only voices whatever reply comes back (D-11).
- **Raw and declared.** What it collects is kept as received, and what it receives must
  be declared (D-06).
- **No cameras.** Any cameras in the house belong to a security plane outside Pepa
  (D-13).
- **Mobile devices are not here.** A sensing device that moves on its own, such as a
  robot, is its own arm (D-03).

## What is not decided yet

- Who owns alarm decisions (O-01).
- Whether these page names follow the rename of the integration's code (O-05). The
  repository name is settled (D-16).
- How every reflex reaches the ledger when Home Assistant handles a command itself,
  before the scope's code sees it (O-09).
- Where the declarations required by D-06 live (O-06).
- The mandate behind reflexes — its scope, its expiry, and which house actions always
  need escalation. Listed as *identified, not yet designed* in
  [Governance](/principles/governance/).

## To be written

- The reflex catalog: what the scope may do, in which rooms, and what always escalates.
- The voice path from satellite to reply.
- How observations are delivered to the arms that consume them.
- Known misfires and how each reflex arc was rewired.
