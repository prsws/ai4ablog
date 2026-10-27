---
title: The Pepa Sensory Arm
description: Sensing as a boundary, not a box — why a smartwatch belongs in the same arm as a presence radar and the carport gate, how little meaning the arm is allowed to make, and an honest account of what runs today.
template: doc
sidebar:
  label: The Sensory Arm
  order: 0
  badge:
    text: New
    variant: tip
draft: false
---
<span class="a4a-badge ai-generated">AI Generated</span>
<span class="a4a-badge human-curated">Human Curated</span>

In Pepa's architecture, the Sensory Arm is the boundary between Pepa and the
physical world. Everything that turns the world into an observation passes through
it, and everything Pepa actuates in the house or says to a human leaves through it. It perceives, delivers and collects raw data. It does not decide what any of it means.

That last part is the whole design.

A sensor that interprets is a sensor you can no longer audit. The moment collection
starts cleaning, filtering or judging, the record stops being a record of what
happened and becomes a record of what some piece of code thought happened. So the
Sensory Arm observes, keeps what it observed, and hands it on. Meaning beyond simple home automation tasks is made
somewhere else, by an arm that can be held to account for it.

## What is actually built

Here is the honest version, because "the boundary between Pepa and the world" is a
definition, and what runs today is narrower and messier than the definition.

The Sensory Arm started as a voice assistant on top of Home Assistant, and the house
is still where almost all of it lives. A Home Assistant instance runs the house:
presence radars, door sensors, lights, fans, the carport gate, the voice satellites.
That instance covers all three of the arm's jobs at once. It perceives the house, it
actuates the house, and through the satellites it is the voice Pepa speaks with.

On top of it sits the `pepa_sensory_arm` integration, whose ReAct loop has three
tools: `ha_query`, `ha_control`, and `call_external_llm`, the escalation punt
described in [The Reasoning Arm](/arms/reasoning/the-reasoning-arm/). The first two
are the arm doing its job — reading the house and acting on it. The third is the arm
recognizing that a request has left its mandate and handing it on. The
[version history](/arms/sensory/psa-version-history/) records how that stack got here.

As of October 2026 there is a second piece, and it is the reason this article exists.
A second Home Assistant instance now collects **human telemetry**: readings from a
smartwatch, a blood pressure cuff and other personal instruments, arriving from the
phone. It only collects. It actuates nothing, speaks to no one, and is not exposed to
Pepa's conversation. Nothing in Pepa reads it yet. Until that week it lived on the
house instance, unconnected to Pepa's operation, sharing a database with the light
switches.

So the built arm is: one instance that perceives, actuates and speaks for the house,
one instance that only collects from a person, and a definition that has to cover
both.

## Belonging is about the boundary, not the subject

The question that forced the definition was simple. Does a smartwatch reporting
heart rate belong in the same arm as a radar reporting that someone is in the shower,
or a switch that turns off the laundry fan?

Yes. **What makes something part of the Sensory Arm is that it crosses the boundary
between Pepa and the physical world — not what it observes or acts on.** A presence
radar, a door contact, a heart rate reading and a cuff measurement all cross inward
as observations. A fan switching off and a sentence spoken in the bedroom cross
outward. A person is part of the world Pepa lives in, the same way a hallway is.

Human telemetry is simply the case where traffic only flows one way. Nothing goes
back out to the watch or the cuff. That makes it the purest form of the arm's
collecting job, not a different job.

It also settles the split. Moving human telemetry onto its own Home Assistant
instance is **a deployment decision, not a new arm**. The split exists for blast
radius and for privacy — a misbehaving light integration should not be able to touch
a health record, and health readings should never land in the context of a model that
also opens the carport gate. Those are good reasons to put the data in a different box. They
are not reasons to give it a different owner.

The tempting alternative was to let the Human Sentinel Arm, which watches over the
person, collect its own data. We did not, and the reason is the same one that keeps
the Reasoning Arm from executing. **An arm that collects what it interprets can no
longer be checked against what it collected.** The Sentinel consumes what the Sensory
Arm gathered. It does not gather.

In Pepa, the boundary is shared. Meaning is not.

## Two scopes: the house and the human

The arm now has two scopes, each detailed in its own article:

- **[House sensing](/arms/sensory/house-sensing/)** — perception, actuation and voice
  for the house: presence, doors, motion, climate, devices, and the satellites that
  talk. It is real time, it handles simple home automation itself, and parts of it are
  deliberately exposed to Pepa's conversation. It can drive alarms; shower safety
  starts here. This is its autonomous operation.
- **[Human telemetry](/arms/sensory/human-telemetry/)** — a specific person's
  physiology and activity. Collection only, never exposed to conversation through its own arm, and read
  once a day by the Human Sentinel Arm or on demand by a future Conversation Arm. It is a trend channel, not an alarm path.

The rest of this article is about what both scopes share.

## What the arm owes whoever reads it

If the Sensory Arm does not interpret what it collects, its whole value is in how
faithfully it records. That turns into a short list of obligations.

**Keep it raw.** Values are kept as they arrived. A glucose meter's exported history
turned out to contain dozens of placeholder records reading 1 mg/dL — artifacts of
early syncs, not measurements — and the vendor's own summary counted them as
hypoglycemic events. Cleaning them at collection would have been easy and correct.
It would also have destroyed the evidence that the summary was wrong. Deciding that a
value is junk is interpretation, and interpretation happens downstream.

**Two timestamps on every reading.** When it was measured, and when Pepa learned of
it. They are routinely days apart — a phone syncs late, a backfill delivers last
week's readings today — and anything that confuses the two will draw trends on the
wrong dates.

**Every reading has a subject, or none.** A blood pressure cuff with two user slots
does not know who is wearing it. A reading that cannot be tied to a defined person is
attributed to no one, and a second person's readings never land in the first person's
record. They are held only if that person opts in.

**Provenance on two axes.** How the value got in — machine-input or human-input — and
what produced it: an instrument, a computation, the person's own word, or someone
external such as a clinic. A cuff reading and a number typed in by hand from a meter's
screen are both "blood glucose," and they do not carry the same weight.

**The ground truth is a true copy.** Not the device's memory. Devices break, fill up
and overwrite. The record is a copy verified to preserve the original's content and
meaning — the pharma sense of the term, and the reason a meter's backup file is worth
more than its screen.

None of these are clever. They are the difference between a record and a dashboard.

## Reflexes, not reasoning

"Meaning beyond simple home automation tasks" looks like an exception to the rule. It
is not. It is a reflex.

You pull your hand out of the fire before you know it is hot. The spinal cord handles
it, and the brain hears about it afterward. Nothing was interpreted in the sense this
article cares about: no judgment about what the fire means, whether to call for help,
or what to do differently tomorrow. Stimulus, response, done.

*Apaga el abanico de la oficina* is the same arc. Words come in, the right fan goes
off, and nothing upstream is consulted, because routing a fan command through an arm
with authority would be as absurd as thinking about the fire. It is also why the
octopus is the model: most of an octopus's neurons sit in its arms, and the arms act
without asking the brain. **That is what the Manifesto calls semi-autonomous
operation.**

A reflex has a recognizable shape, and that shape is the limit:

- **Local and immediate.** One request and its effects, on the house, with a result
  you can observe right away. Query or control, and nothing else.
- **No memory and no time.** A reflex does not build trends or notice patterns. A
  judgment about how someone is doing is meaning about a human, and it belongs to the
  Human Sentinel Arm. The house scope may report that the bathroom has been occupied
  for forty minutes; it does not decide what that says about the person inside.
- **Out of reach means up.** Anything that is not the house leaves through the punt
  to the Head rather than being improvised.

Reflexes can misfire. A question asking for the *status* of one fan once switched off
a different one: a reflex arc wired wrong. The fix is to rewire the arc, not to give
it judgment.

The human scope has no reflex arc at all. Its nerves only run inward. Nothing it
collects is ever acted on locally.

The delivery side works the same way. The Sensory Arm is the exclusive gateway for
anything Pepa says to a human, but it does not author what other arms want said. The
words come from whichever arm owns them; the Sensory Arm makes sure they arrive, in the
right room, to the right person — and nowhere else.

## The elephant in the room: the name

The code named after this arm is the house scope's front end — voice, the ReAct loop,
the actuation tools — not the arm itself. The human instance is part of the arm and
will never run that code.

That is a naming problem, not an architecture problem, and it is being treated as
one: repositories will be named for what they contain, with the arm they serve
recorded separately.