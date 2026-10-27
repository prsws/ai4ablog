---
title: Human Telemetry
description: The Sensory Arm's human scope — collection of a person's physiological readings, inward only. A stub that records what is settled; the full article is not written yet.
template: doc
sidebar:
  label: Human Telemetry
  order: 3
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
> [The Sensory Arm](/arms/sensory/the-sensory-arm/). No readings are published here.

## What this scope is

Human telemetry is the second of the Sensory Arm's two scopes identified so far (D-02).
In the body analogy it is the internal organs: it reports what goes on inside a person,
and only inward. Its counterpart is
[House sensing](/arms/sensory/house-sensing/), the senses, muscles and voice.

It is part of the Sensory Arm for the same reason the house is: a person's readings
cross the boundary between Pepa and the physical world (D-01). The only difference is
that traffic flows one way. Nothing goes back out to the watch or the cuff.

## What runs today

A second Home Assistant instance, separate from the one that runs the house, collects
readings from a smartwatch, a blood pressure cuff and other personal medical devices,
arriving by way of the phone. It collects and does nothing else. It actuates nothing,
speaks to no one, and is not exposed to Pepa's conversation. Nothing in Pepa reads it
yet.

Running it apart from the house is a deployment decision, not a new arm (D-04). The
reasons are blast radius and privacy.

## What is settled

- **Collection only.** No reflexes, no local action, no interpretation (D-05).
- **Not a conversation source.** Health information spoken to Pepa is handled by the
  house scope, which punts it (D-11); this scope is never read aloud from.
- **Observations, not conclusions.** A watch's fall report is what the watch said, not
  something Pepa has concluded. It is not an alarm path (D-12).
- **Raw and declared.** Values are kept as received, and what is received must be
  declared (D-06).
- **Two timestamps** on every reading: measured, and learned (D-07).
- **A subject, or none.** A reading is attributed to a person defined in Home Assistant
  or to no one. Another person's readings are held only if that person opts in (D-08).
- **Provenance on two axes**, Input and Origin (D-09).
- **The ground truth is a verified true copy,** not a device's own memory (D-10).

The collected record is read once a day by the Human Sentinel Arm, or on demand by a
future conversation arm. It is a trend channel.

## What is not decided yet

- Where identity comes from, and whether this scope sets it or only enforces it (O-02).
- How health information spoken to Pepa is handled once punted (O-03).
- Whether a vendor-derived value, such as heart-rate variability, is *computed* or
  *external* on the Origin axis (O-04).
- Where the declaration of each feed lives (O-06).

## To be written

- The list of declared feeds, once O-06 settles where they live.
- How a true copy is verified for each kind of instrument.
- Onboarding for a second person.
- How the instance is backed up and kept separate from the house.
