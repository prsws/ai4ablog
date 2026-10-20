---
title: "Pepa Fabric: Palantir Foundry and Microsoft Fabric, scaled down to one house"
description: "What Palantir Foundry and Microsoft Fabric IQ do with an ontology, and the open-source, self-hosted, local-first version Pepa will use for one home over 20 years."
date: 2026-10-20
tags: ["architecture", "memory", "ontology", "neurosymbolic"]
sidebar:
  label: Pepa Fabric
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

Pepa Fabric is the same idea Palantir and Microsoft sell to corporations, cut down to what one house needs and nothing more: a written vocabulary, typed contracts at the seams, and one deterministic gate before anything physical changes.

A search for "Palantir Fabric" turns up a surprise: it doesn't exist. What exists is two things people blur together: **Palantir Foundry**, Palantir's enterprise data platform, and **Microsoft Fabric**, Microsoft's competing one. Both put an *ontology* at the center, which is how the search leads straight back to Pepa's own [ontology page](/reference/ontology/).

This page compares what the big platforms do with what Pepa will use. Pepa Fabric is the project's name for the scaled-down version. It is not affiliated with, endorsed by, or a replacement for either product.

---

## What the big boys sell

Both platforms turn a company's tables into named business things that people and AI agents can reason about. They differ mainly in how far the ontology reaches into action.

### Palantir Foundry

Foundry splits a company's data into a data layer and an object layer, and the object layer is its [Ontology](https://palantir.com/docs/foundry/getting-started/foundry-platform-summary-llm/). It has five building blocks:

- **Object types**: the nouns, real-world things like a Vessel or a Work Order.
- **Link types**: how two kinds of objects relate.
- **Action types**: governed changes to objects, with validation rules and side effects. An [action](https://palantir.com/docs/foundry/action-types) is one transaction, and its edits flow to every application at once.
- **Functions**: server-side logic in TypeScript or Python that runs against the objects.
- **Interfaces**: shared shapes that several object types can implement.

The action types are what make Foundry different from a reporting tool. The ontology doesn't only describe the business, it is the path through which the business changes. Edits can be written back to the source systems.

The costs are well known: a steep learning curve, pricing by quote, and an ecosystem that is hard to leave once your ontology lives inside it.

### Microsoft Fabric IQ

Microsoft's answer is an [ontology item](https://kanerika.com/blogs/fabric-ontology/) inside Fabric IQ. It models entity types, properties, relationships and rules, and binds them to data already stored in Microsoft's OneLake. AI agents then ask questions in terms of concepts instead of tables.

Fabric IQ reached general availability at Microsoft Build 2026, but the ontology item itself is [still in preview](https://atlan.com/know/microsoft-fabric/what-is-fabric-iq/) as of October 2026. One review notes it has no versioning yet and refreshes manually. It is billed through Fabric capacity, with no separate price.

---

## Same idea, wrong size

Strip away the branding and both platforms make the argument Pepa's ontology page makes: meaning has to be written down, and something has to enforce it at the moment of action. *You cannot validate against a vibe*, whether the vibe belongs to a Fortune 500 analyst or to a language model guessing what "el aire" means.

Pepa still can't use either platform, for six reasons:

1. **No cloud.** Pepa is local-first. Both platforms live in someone else's data center and assume your data does too.
2. **Scale.** They are built for thousands of datasets and hundreds of users. Pepa has one house, a handful of devices, and one or two people.
3. **Lifetime.** Pepa's design lifetime is 20 years. No vendor promises a product, a pricing model or a file format for that long.
4. **Privacy.** A household's health signals, habits and voice don't belong in a corporate tenant, however well it is secured.
5. **Cost.** Quote-based or capacity-based pricing makes no sense for a homelab, or for the families José wants to hand this blueprint to.
6. **The user.** Their interfaces are for analysts. Pepa's user may be 80, bilingual, and never sees a screen at all.

---

## Side by side

Every concept the big platforms have, Pepa Fabric has a small open-source equivalent for. What it lacks is everything around the concepts: the UI, the pipelines and the consultants.

| Concept | Palantir Foundry | Microsoft Fabric IQ | Pepa Fabric |
| --- | --- | --- | --- |
| Things (nouns) | Object types | Entity types | Borrowed W3C classes: SAREF for appliances, SOSA/SSN for sensors and actuations |
| Relationships | Link types | Relationships | Properties from the same vocabularies |
| Shape of a record | Object properties | Properties with data types | Pydantic models and JSON Schema at every arm boundary |
| Many names, one thing | Display names | Not a highlighted feature | SKOS labels, EN and ES: "el aire", "the A/C", "la unidad" all land on `climate.dormitorio` |
| Changing the world | Action types with validation and writeback | Rules and actions modeled; mostly a query layer today | SHACL check; a proposed action is allowed on pass only |
| Business logic | Functions (TypeScript, Python) | Rules | Python inside one validator service |
| Where enforcement runs | Inside the platform | Inside the platform | One validator service; arms and Head hold a link to it; fails closed |
| How it knows | Lineage tracks where data came from | Bound to OneLake sources | Closed epistemic enum: observation, interpretation, prediction, policy |
| Versioning | Ontology Manager | Not yet, per one review | Vocabulary files in git; every result carries a version stamp |
| Runs on | Palantir's hosted platform | Azure capacity | Casa Delta, no cloud |
| License cost | By quote | Fabric capacity units | $0 |

---

## Pepa Fabric, layer by layer

Pepa Fabric is the three layers from the ontology page with a specific open-source tool under each, all checked by one validator service that the Head and every arm call.

```text
         Head and arms propose an action
                             │
                             ▼
┌─ Validator service: one copy, versioned ───────────────┐
│ 1. Shape    Pydantic: right fields, right types        │
│                            │                           │
│                            ▼                           │
│ 2. Meaning  rdflib with SAREF, SOSA/SSN, SKOS labels   │ ◄── Vocabulary and rules, in git
│                            │                           │     Turtle files; every result
│                            ▼                           │     carries the version
│ 3. Gate     pySHACL: does this action fit the rules?   │
└────────────────────────────────────────────────────────┘
                             │
         pass ┌──────────────┴──────────────┐ fail or unreachable
              ▼                             ▼
        Head and arms                   No action
       proposed action              error is reported
    allowed on pass only
```

The Head and arms may execute a proposed action only after all three checks pass; a failure or an unreachable validator means nothing moves.

**Layer 1: typed contracts. Buildable now.** Pydantic models and JSON Schema at every arm boundary. This is the layer that catches the boring drift, like a prompt documenting seven fields while the code emits five. One tool worth a recon stub is [LinkML](https://linkml.io/): the schema is written once in YAML, and it generates the Pydantic models, the JSON Schema and the SHACL shapes, so the layers can't drift apart.

**Layer 2: borrowed vocabulary. Decided, not wired.** [SAREF](https://saref.etsi.org/) for appliances and their functions, [SOSA/SSN](https://www.w3.org/TR/vocab-ssn/) for sensors, observations and actuations, and [SKOS](https://www.w3.org/TR/skos-reference/) for the bilingual names of each thing. The Python library [rdflib](https://rdflib.readthedocs.io/) loads and queries them. Pepa's own closed enums, the epistemic, authority and lifecycle classes, hang off these borrowed terms.

**Layer 3: the gate. Unbuilt, correctly.** [pySHACL](https://github.com/RDFLib/pySHACL) checks each proposed action against the rules, one small graph per action. It lives in a small FastAPI service. Failing closed is Pepa's code, not pySHACL's: if the service is down or errors out, nothing in the house moves. Following a rule from the neurosymbolic AI researcher who advised José, *only validate globally what requires a global view*, the gate sits only at actuation, not on every message.

**Storage: less than you'd expect.** No graph database is needed to start. The vocabulary and the rules are text files (Turtle format) in git, loaded at startup. Memory stays in the Memory Arm's SurrealDB. If Pepa ever needs to query the vocabulary itself, [Oxigraph](https://github.com/oxigraph/oxigraph) is the embedded candidate. It doesn't keep history on its own, so git stays the record of how the vocabulary changed.

---

## What Pepa gains, what it gives up

The trade is honest: Pepa Fabric wins on everything that matters over 20 years in one house, and loses on everything that matters to a company with a data team.

**What Pepa gains**

- **It's diffable.** The whole vocabulary is a few text files. Drift shows up in a git diff, not years later in a wrong action.
- **It outlives vendors.** SAREF, SOSA/SSN, SKOS and SHACL are W3C and ETSI standards. They were here before these platforms and will likely be here after.
- **It's local and free.** Nothing leaves the house and nothing is billed.
- **It's small enough to audit.** One person can read every rule the gate enforces.
- **It records how Pepa knows.** The epistemic enum is the direct answer to the 68 °F incident, and neither platform offers one out of the box.

**What Pepa gives up**

- **No ontology manager.** There's no visual editor for types and links. José edits text files. (N.B. We'll see about that... - José)
- **No pipelines or dashboards.** Pepa Fabric validates; it doesn't ingest, transform or chart.
- **No fine-grained permissions.** It doesn't need them for one or two people, but it couldn't serve a facility as it stands.
- **No consultants.** José is the forward-deployed engineer, and so is anyone who builds their own Pepa.

---

## Where it stands

Pepa Fabric is a name for a direction, not a system. Layer 1 is buildable now, layer 2 is decided but not wired, and layer 3 waits for an actuation gate to exist. The tool picks above are recon grade.

_In this project, recon grade is not a decision, and a decision is not a deployment._

Palantir sells its ontology on the promise that a company can run itself through one shared model. Pepa's promise is smaller and arguably harder: that an elderly person can say *ponme el aire a 76* in whichever language the day hands them, and the house knows exactly which thing they mean, and checks before it touches it.

*Palantir and Foundry are trademarks of Palantir Technologies. Microsoft Fabric and Fabric IQ are trademarks of Microsoft. Pepa Fabric is an independent, open, household-scale project and is not affiliated with either company.*

---

## Sources

- [Foundry platform summary](https://palantir.com/docs/foundry/getting-started/foundry-platform-summary-llm/) (Palantir docs)
- [Action types](https://palantir.com/docs/foundry/action-types) (Palantir docs)
- [Fabric ontology: entity types, properties, relationships](https://kanerika.com/blogs/fabric-ontology/) (Kanerika)
- [What is Fabric IQ](https://atlan.com/know/microsoft-fabric/what-is-fabric-iq/) (Atlan)
- [Fabric IQ roadmap](https://www.directionsonmicrosoft.com/roadmaps/ref/fabric-iq-roadmap/) (Directions on Microsoft)
- [Microsoft vs Palantir: two paths to enterprise ontology](https://towardsai.com/p/machine-learning/microsoft-vs-palantir-two-paths-to-enterprise-ontology-and-why-microsofts-bet-on-semantic-contracts-changes-the-game) (Towards AI)
- [Ontology, or teaching the house what a thing is](/reference/ontology/) (ai4aging.org)