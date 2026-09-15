---
title: The Reasoning Arm
description: Reasoning as a bounded, replaceable capability — the argument for why control never moves here, and an honest account of how little is actually built.
template: doc
sidebar:
  label: The Reasoning Arm
  order: 0
draft: false
---
<span class="a4a-badge ai-generated">AI Generated</span>
<span class="a4a-badge human-curated">Human Curated</span>

In Pepa's architecture, the Reasoning Arm is not the system's ruler — it is its
cognitive engine. Its role is simple: interpret, suggest, and assist. It does not
decide, orchestrate, or execute. That authority belongs to the Head or is embedded
within the autonomy of any requesting Arm.

This separation is intentional.

By isolating reasoning as a replaceable, bounded capability, Pepa avoids the common
trap of overloading a single LLM instance with responsibility. The Reasoning Arm
suggests; the Head decides. The Reasoning Arm explores; the Head constrains. Think
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
"Reasoning as a Service" presumes a Head that requests reasoning, and the LangGraph
Head is unbuilt. Today the Mac Studio is reached by the Sensory Arm's escalation
path — a punt from the local model when it <u>judges</u> a query beyond its Home Assistant domain mandate — rather
than by an orchestrator asking for cognition. The service half is real. The
architectural half is waiting on the cognition plane.

That is still the whole of what runs. Everything below this line is direction, not
description — the boundary is decided, the mechanism is being worked out.

In Pepa, intelligence is modular. Control is not.

## Where it goes next: a thinker that cannot act

The open question — what does a Reasoning Arm do beyond serving completions — now
has answers, and they're narrower than "become an agent."

### 1. It plans. It never executes.

This is plan mode, the shape a coding agent takes when it is asked to think a
change through before touching anything: read, consider, propose a sequence, hand
it over. The plan is the deliverable. Someone else decides whether it happens.

This capability is one we could name that is genuinely more than a
completion and still structurally incapable of acting. It makes "suggests, doesn't
decide" into something buildable and testable rather than a slogan.

**"Never executes" has to be structural, not instructed.** A system prompt telling
a model not to act is exactly the kind of unexamined trust this project refuses.
The enforceable version is that the planning process holds no credentials, no write
tools, and no route to the operations plane. The Beak enforces the boundary; the
model is not asked to be disciplined about it.

A planner does need to know what is possible — the house catalog and the ontology
it plans against — and it plans under guardrails. **Knowing what can be done,
without holding the means to do it, is the line.**

### 2. Research

The second mode. Investigate a supplied question against available sources and produce a report.
Structurally this is the same machine: read, consider, emit an artifact, and let
someone else decide what it is worth. There is no write path in it either.

It may not need to be a second machine at all. The job envelope is identical — same
submission, same budget, same idle/busy, same refusal kinds, and the
missing-information refusal fits research even better than it fits planning. What
differs is the deliverable, not the loop. A plan is a proposed sequence of future
actions and needs an executor; a report is a claim about how things are and needs a
reader. If that holds, the arm's real capability is **bounded investigation with a
typed deliverable**, and plan and report are two output types rather than two
subsystems.

Research carries one hazard planning does not. A plan is inert and announces itself
as a proposal. A report reads as fact, and left alone it drifts toward the Knowledge
Arm — which exists to hold what Pepa can *cite*, meaning material somebody else
authored. A report written by a model is not externally authored. It is
interpretation wearing a citation's clothes, and letting it settle into the citable
store is how the one deliberately clean substrate gets contaminated.

So: **a report is an artifact about sources, never a source.** Provenance on every
claim, and if it enters any store it enters as interpretation, marked inferred.


## How a planning job works

**The Head owns the decision to plan.** Another arm raises a need; the Head judges
whether it is worth thinking about and submits the job. The Reasoning Arm never
takes a planning request from a peer directly. That keeps arms consuming each
other's ledgers rather than each other's internals, and it keeps the judgment where
the authority already is.

**Planning is asynchronous.** It is not on the voice path and never will be. No
latency budget means no cheap-triage compromises, and the Sensory hot path is
untouched by construction.

**The arm is idle or busy.** Two states — availability, not memory. One job at a
time, so the Head is the queue, and priority, cancellation and supersession all
live where authority lives.

**A submission carries** the task, the context the caller chose to supply, the
constraints, a budget, and an authority marker that is always none. The budget is
the done condition, written before the job starts rather than discovered by a
planner grinding with nobody waiting on it.

**A result is a plan, or a reasoned refusal.**

There is no fast "can you do this?" handshake, and this is deliberate. Knowing
whether a task can be planned usually requires most of the planning — the same way
an estimate for real work is only honest once you have done enough of the work to
give one. Splitting it into a cheap pre-check would either lie or charge twice. One
submission, one run, and the verdict comes back grounded in an actual attempt.

A refusal says which kind it is, because the caller does something different with
each:

- **Not a planning task.** Wrong door.
- **Missing information** — and it names what to supply. This is the one that pays
  for the whole arrangement: a failed call comes back as a specification of what
  the next call should carry.
- **Nothing available can achieve it.** The request is coherent; the means do not
  exist. A human has to.
- **Doctrine forbids it.** Do not ask again, and log it.
- **Budget exhausted**, with partial work attached. Exceeding the budget is an
  announced refusal, never a silent hang.

**On confidence.** If a plan came back, a feasibility score is redundant — the
artifact is the evidence. What is worth reporting is confidence *about the plan*:
what it assumed, where it is unsure, what would invalidate it. A self-reported
number is self-attestation, not observation. It is a useful routing hint and a
Goodhart instrument the moment anything downstream treats it as trust. The real
grounding is a scoreboard kept from the first job onward: of the plans it produced,
how many a human accepted.

## The elephant in the room: why conversation is a different arm

A third capability suggests itself and is deliberately not taken here: conversation.

It fails every property the sections above just settled. Conversation is
synchronous, stateful across turns, user-facing and latency-bound. Planning/research is
asynchronous, scratch-state-only, Head-facing and unhurried. Nothing in the
Reasoning Arm's contract survives the addition.

It does not belong to the Sensory Arm either. PSA is bound to its Home Assistant
domain mandate, and the ReAct loop it inherits has exactly three tools: `ha_query`,
`ha_control`, and `call_external_llm`, which points to the OpenAI compatible endpoint in the same Mac Studio.
Two of those act on the house. The third is the escape hatch for everything that is not the house.

Which means conversation is already happening, and it is happening unowned. The
punt *is* the conversation capability today — open-ended talk leaking out of an arm
correctly refusing to handle it, landing on the nearest box with a model on it.
Much of the traffic arriving at the Reasoning Arm's endpoint is therefore not a
reasoning request at all.

Naming it as its own arm cleans up two things at once. Conversation gets the
guardrails its position demands: it is the only arm a human addresses in open-ended
language, which makes it simultaneously the widest prompt-injection surface and the
easiest place for content to impersonate authority. It gets no actuation tools — an
arm that can touch the house is PSA with a worse mandate. It reads memory and never
writes it directly, because a chat that writes beliefs is the 68 °F incident with a
friendlier interface. And the pre-speech check bites hardest here, since this is the
arm most likely to be overheard, transcribed or forwarded.

And when it exists, the punt retargets to it, and the Reasoning Arm's caller
question resolves to a single answer: the Head.

## Crawl, walk, run

**Crawl — running today.** Plain completions, served to the Sensory Arm's
escalation punt. Nothing above changes this; the planner is additive, and the
inference endpoint keeps its own job. Worth stating plainly: _that endpoint is currently doing two unrelated jobs (general inference and conversation), and one
of them belongs to an arm that does not exist yet._

**Walk.** The smallest thing that is a planner: one job in, one plan or one refusal
out. No house vocabulary, no actuation catalog, a human reads the result. The work
it plans is the project's own — maintenance, sequencing, recon — where a bad plan
costs an afternoon rather than a wrong actuation, and where the contract can be
learned cheaply.

**Run.** The house. Catalog, ontology, guardrails, and a plan an executor could
act on.

## Open questions

- **What is a plan, structurally?** The artifact has to be something a human can
  follow, a future executor could act on, and a validator can check. This is the
  question that decides whether any of this is useful or merely tidy.
- **Read-only tools, or fully context-fed?** Coding agents plan well because they
  read. Reading is also how content reaches a model — a planner that fetches its
  own context reopens the injection surface that a pure function closes. Current
  leaning is read-only tools plus the catalog and ontology. Either way, the
  requested task and its constraints must travel separately from the content
  payload, so that nothing inside the content can change the verb.
- **Who calls it?** The Head owns the decision, and the Head does not exist. Today
  the only live caller is the Sensory Arm's punt — and much of what arrives that way
  is conversation rather than reasoning. The contract has to serve both until a
  Conversation Arm takes the second half.
- **Is research the same machine as planning?** One job envelope with two output
  types, or two capabilities with separate prompts and separate frozen prefixes. On
  one box, the second costs real throughput. Undecided, and worth testing before
  committing.
- **Does it need state?** Mostly answered: idle/busy is availability, working state
  lives only for the duration of a job, and memory belongs to the Memory Arm. Still
  open — whether the arm holds a finished plan until it is collected, or hands it
  back and forgets. Holding it is retention with a policy attached; handing it back
  leaves the artifact with the Head, which is cleaner.
- **What does the Head do when the arm is busy?** Hold, refuse, or preempt. And
  "no answer" must be its own outcome, distinguishable from busy — silence is not a
  status.