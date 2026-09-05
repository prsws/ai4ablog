---
title: "Ontology, or teaching the house what a thing is"
description: "What an ontology actually is, why Pepa can't get to year five without one, and the three-layer decision that came out of a correspondence with a neurosymbolic AI researcher."
date: 2026-09-05
tags: ["architecture", "memory", "ontology", "neurosymbolic"]
sidebar:
  label: Ontology
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

Ask Pepa to *ponme el aire a 76* and something has to decide what "el aire" is.

A device? A Home Assistant entity? A set point? A room? A habit? On a good day the answer is "the mini-split in the bedroom, entity `climate.dormitorio`, target temperature 76 °F, right now." On a bad day the answer is "a standing preference of 68 °F," which is not what anybody said and is how you end up with the poster child of this project's failure modes.

That gap — between what a person means and what a system can be held to — is what an ontology is for. This post is in three parts: what an ontology is, why Pepa needs one, and the design decision I landed on after an exchange this past August with a researcher who works in neurosymbolic AI. He was generous with his time and sharp about the trade-offs. I haven't asked his permission to name him, so I won't; the ideas below that are his are marked as his.

---

## 1. What an ontology is

Set aside the philosophy department. In engineering, an **ontology** is an explicit, written-down, machine-readable agreement about what exists in a domain: what kinds of things there are, what they're called, what properties they carry, and how they relate to each other.

Three words get used interchangeably and shouldn't be:

- A **schema** says what shape a record has. `temperature` is a number; `timestamp` is required. It says nothing about meaning.
- A **taxonomy** says how categories nest. Appliance → climate control → mini-split. A tree.
- An **ontology** says what the terms *mean* and how they connect across the tree. A *sensor* makes an *observation* of a *property* of a *feature of interest* at a *time*. An *actuation* changes the *state* of a *device*. A *preference* is a standing statement by a *person*, which is a different kind of thing entirely from a *request*, even when both arrive as the same sentence.

The last distinction is the whole ballgame, and it is the one that schemas and taxonomies cannot make for you.

A small, dull example of what happens without one. My Paperless instance — the household document archive, only a couple of years of accretion — has 347 document types for about 1,000 documents. Just under three documents per type. Document type is supposed to be a *small, closed, stable set*: the axis you filter on. At 2.9 documents per type it has no filtering power at all. There is no ontology there, just a pile of labels that each seemed reasonable on the day it was created. Nothing is wrong with any single one. The set is useless. I'll fix it someday.

Now imagine the same accretion happening not to filing labels but to the vocabulary a system uses to describe your household to itself, over twenty years, with nobody watching. That's the thing to avoid.

The other half of the definition, and the half many people skip: an ontology is only worth having if something *enforces* it. _A vocabulary nobody validates against is a style guide. A vocabulary a machine checks at a boundary is a contract._

---

## 2. Why it matters for Pepa

Four reasons, in ascending order of how much importance they have.

### Arms have to agree across a seam

Pepa is an octopus: a Head that coordinates and semi-autonomous Arms that do the work — Sensory, Memory, Knowledge, Reasoning. The design principle is that arms consume each other's *ledgers*, never each other's internals. That's good hygiene right up until two arms use the same word for different things.

Possible scenario: A prompt header documenting a seven-field entity catalog while the emitter downstream produced five — documentation and code drifting apart across a boundary no test spanned. It's a boring bug. It's also exactly the shape of the expensive one: nothing crashed, nothing logged, the two halves just quietly disagreed about what a record was.

Typed contracts at the seams turn that class of drift from a silent divergence into a loud failure. Still, that's not an ontology yet, it's the floor.

### Memory needs to distinguish kinds of knowing

Here's the incident this project keeps coming back to. A perfectly ordinary request — set the A/C to 80 °F  — was executed correctly and then *recorded* as a standing temperature preference, at 68 °F, which could have been the most common value in the model's training distribution rather than the one anybody said. From there it self-reinforced: retrieved, echoed, corroborated by its own echo, promoted, until it sat in top-*k* retrieval looking like ground truth.

We call it the 68 °F incident, and the reflex is to file it under "memory bug." It isn't. It's an ontology failure that *manifested* in memory. Nothing in the record distinguished:

- an **observation** — what actually happened,
- an **interpretation** — what Pepa inferred happened,
- a **prediction** — what Pepa expects,
- a **policy** — what Pepa has been instructed to do.

Those four are different kinds of things. They have different provenance, different lifespans, different rights to influence an action. If the record has no place to put that distinction, the distinction disappears, and a request becomes a preference with nobody deciding that it should.

So Pepa's eventual memory model will carry an epistemic dimension — *how* it knows a thing, not just what — with those four as a closed set. Closed enums, grounded in an open vocabulary. That's an ontological commitment whether I call it one or not; better to call it one and write it down.

### Nothing acts on memory alone

*Memory is not authority.* It's a founding principle here. But "not authority" is only meaningful if something else *is*, and if that something is deterministic. A language model proposes in probabilities. Fluent output is not a contract; a well-structured wrong answer is more dangerous during testing than a badly-structured one, because it's more believable. Between "the model proposed an action" and "something in the physical house changes," there has to be a gate that decides in symbols, not in confidence scores.

A gate can only check a proposal against a vocabulary that exists. _You cannot validate against a vibe_. This is the neurosymbolic argument in one line, and it's why the ontology question stopped being a nice-to-have somewhere around the time I started specifying the actuation path.

### This thing has to run for two decades

The other failure mode, slower and worse than the climb: **drift**. The memory graph rotting quietly over months and years, the vocabulary accreting, the meaning of "preference" in 2033 no longer quite what it was in 2026 — with no single day on which anything broke. 20 years is not a stress test, it's the design lifetime. A written vocabulary with a version stamp is one of the few defenses that survives that timescale, because it's the only artifact you can *diff*.

---

## 3. The decision

I went into the exchange with the researcher expecting to be told to go build a domain ontology. What I got was more useful and considerably less romantic: a staged plan, cheapest layer first, with a clear statement of what each layer buys.

Along the way I evaluated a commercial taxonomy vendor and passed on it. The obvious reason was that they seem to be expensive (no listed prices, contact for a quote) but also their listed taxonomies don't align with Pepa's mission.

### Three layers

**Layer 1 — typed contracts. JSON Schema plus Pydantic at every arm boundary.**

No semantics. Just shape: this field exists, it's this type, it's required, here's the enum. It catches the column-drift class immediately, it costs almost nothing, and it's the layer I can build now with tools already in the stack. Every ontology project that dies, dies because it started at layer 3.

**Layer 2 — borrow the vocabulary, don't invent it.**

For devices and for observations, the vocabulary already exists and is maintained by people with more time than I have: **SAREF** for smart appliances and their functions, **SOSA/SSN** for sensors, observations, and actuations. A sensor, an observation, a feature of interest, an actuation, a procedure — these are solved terms with published definitions.

Inventing a private vocabulary for a household of one is how you end up with 347 document types. Reusing a public one means the definitions are stable, someone else maintains them, and the terms are already the ones a future collaborator would expect. Pepa's own closed enums — the epistemic classes, the authority classes, the lifecycle states — hang off that borrowed frame rather than floating free.

**Layer 3 — SHACL at the actuation gate.**

SHACL is a constraint language for graph shapes: it lets you state, declaratively, what a valid structure must look like, and get back a machine-readable report of exactly which constraint failed. Deterministic. Quotable. No model in the loop.

The placement is deliberate. Not everywhere — at the gate. Right before something in the house changes state.

### And two corollaries, which is where it got interesting

The layers are the plan. The corollaries are the part I'd have gotten wrong on my own.

**"Only validate globally what requires a global view."** His line, adopted verbatim as a principle. Anything decidable locally stays local. Validation is a tax; you pay it where a local decision genuinely can't be made, and nowhere else. This is what keeps layer 3 from metastasizing into a checkpoint on every message in the system.

**One ontology, one validator service.** My first draft of this was "shared spec, local enforcement" — every arm carries the ontology and enforces it in its own house. It's the obvious answer and it's wrong, for a reason that took me a beat to see: with N copies of the enforcement logic, you have N interpretations of the spec, and drift between them is exactly the failure the spec was meant to prevent.

The alternative I *should* be suspicious of is centralizing enforcement in the Head. That breaks the Octopus model outright — it drags domain knowledge upward into an orchestrator whose whole job is not to have any. The resolution: arms hold a *link* to a single dedicated validator service. The Head calls the same service. Results carry a version stamp. And when the validator is unreachable, the gate **fails closed** — because in eldercare, a bad action is worse than no action, and this is one of the few places where I get to say that in code rather than in a manifesto.

One vocabulary. One implementation of the check. No opinions distributed across the arms. Thank you Researcher.

### Where it actually stands

Layer 1 is buildable now and is what gets built. Layer 2 is a vocabulary decision, made but not wired. Layer 3 is unbuilt and correctly so — SHACL at a gate that doesn't exist yet would be ceremony, not safety.

I'd rather say that plainly than imply a stack that isn't there. _In this project, recon grade is not a decision, and a decision is not a deployment._

---

## The part that matters at the house

All of this machinery exists so that an elderly person doesn't have to think about any of it.

If I say *the A/C*, or *el aire*, or *la unidad*, or *the cold thing in the bedroom*, every one of those has to land on the same entity. The burden of knowing where a thing lives belongs to Pepa, never to the user — and that's doubly true in a bilingual house where the word that surfaces first is whichever one the day handed you. Aging with dignity includes aging in your own language, and in whichever half of it shows up on a given day.

An ontology is what lets a machine hold five names for one thing without losing track of which thing it is.

*Bendito*, it's just filing. But it's the filing the next decades rest on.