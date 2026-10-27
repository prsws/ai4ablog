---
title: Sensory Arm Decision Register
description: The settled decisions and open questions behind the Sensory Arm, numbered so that specs and builders can cite them instead of restating them.
template: doc
sidebar:
  label: Decision Register
  order: 1
  badge:
    text: New
    variant: tip
draft: false
---
<span class="a4a-badge ai-generated">AI Generated</span>

**Register opened 27 Oct 2026.** This page is append-only. A decision changes only by
a new, dated entry that supersedes it; the superseded entry stays, struck through, with
a pointer to what replaced it. Open questions move to the settled table when they are
decided, with the date.

Specs and coding-agent instructions cite these IDs (for example, "per D-06"). A builder
does not reinterpret a decision; if a decision looks wrong, it is raised as a new open
question here.

The reasoning behind most of these lives in [The Sensory Arm](/arms/sensory/the-sensory-arm/).
How they are enforced, or not yet, lives in [Governance](/principles/governance/).

## Settled

| ID | Decision | Date |
|---|---|---|
| D-01 | The Sensory Arm (PSA) is defined by the boundary it crosses into Pepa, not by what it observes or acts on. | 27 Oct 2026 |
| D-02 | PSA has two scopes identified so far. **House**: the senses, muscles and voice — perceives the house, acts on it, speaks. **Human**: the internal organs — reports what goes on inside a person, inward only. Others may come. | 27 Oct 2026 |
| D-03 | A sensing device with mobility, such as a robot, is not PSA. It is its own arm; the taxonomy is to be decided (O-07). | 27 Oct 2026 |
| D-04 | Running a scope on its own instance — the human scope on a dedicated Home Assistant instance — is a deployment decision, not a new arm. | 27 Oct 2026 |
| D-05 | PSA never interprets. A reflex is a direct, requested house action, carried out only through explicit, declared and guardrailed reflex rules, never beyond them. | 27 Oct 2026 |
| D-06 | Raw means as received at the boundary, whatever it is — but whatever it is must be declared. Nothing enters undeclared. | 27 Oct 2026 |
| D-07 | Every reading carries two timestamps: when it was measured, and when Pepa learned of it. | 25 Oct 2026 |
| D-08 | Every reading is attributed to a person defined in Home Assistant, or to no one. Another person's readings are held only if that person opts in, which requires onboarding. | 25 Oct 2026 |
| D-09 | Provenance on two independent axes. **Input** — how the value got into the record: machine-input or human-input. **Origin** — what produced it: instrument, computed, self-reported, or external (with attributes such as person or machine, and an id). No catch-all category. | 25 Oct 2026 |
| D-10 | The ground truth is a verified true copy, never a device's own memory. | 25 Oct 2026 |
| D-11 | Health information spoken to Pepa is not housework: the house scope punts it, and only voices whatever reply comes back from the arm that took it. | 27 Oct 2026 |
| D-12 | Shower safety, a watch's fall report and similar signals are observations, not conclusions. PSA does not decide alarms; it delivers them. | 27 Oct 2026 |
| D-13 | Pepa never uses cameras until a compelling use case appears. Any cameras in the house belong to a security plane outside Pepa. | 27 Oct 2026 |

D-13 supersedes the 25 Oct 2026 working decision that health instrumentation would not
draw from cameras "by default," with any crossing deliberate and recorded. That decision
was never published; it is noted here so the change is not silent.

## Open

| ID | Question | Raised |
|---|---|---|
| O-01 | Who owns alarm decisions. D-12 says PSA does not; the Human Sentinel Arm is a trend channel, not an alarm path. | 27 Oct 2026 |
| O-02 | The source of identity: does PSA set it, or receive it from elsewhere and only enforce it? | 25 Oct 2026 |
| O-03 | How health information spoken to Pepa is handled once punted (D-11). Needs outside consulting on how caregivers handle it. | 25 Oct 2026 |
| O-04 | Whether a vendor-derived value, such as a watch's heart-rate variability, is *computed* or *external* on the Origin axis (D-09). | 25 Oct 2026 |
| O-05 | Whether repository and page names follow the rename of the house scope's code, and to what. | 27 Oct 2026 |
| O-06 | Where the declaration required by D-06 lives (for example, a registry of declared feeds). | 27 Oct 2026 |
| O-07 | The taxonomy for mobile sensing arms (D-03). | 27 Oct 2026 |
