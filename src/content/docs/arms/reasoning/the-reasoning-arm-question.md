---
title: The Reasoning Arm?
description: Reasoning as a bounded, replaceable capability — the argument for why control never moves here, and an honest account of how little is actually built.
template: doc
sidebar:
  label: The Reasoning Arm?
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
path — a punt from the local model when it judges a query beyond itself — rather
than by an orchestrator asking for cognition. The service half is real. The
architectural half is waiting on the cognition plane.

That is still the whole of what runs. Everything below this line is direction, not
description — the boundary is decided, the mechanism is being worked out.

In Pepa, intelligence is modular. Control is not.

## Where it goes next: a planner that cannot act

The open question — what does a Reasoning Arm do beyond serving completions — now
has an answer, and it is narrower than "become an agent."

**It plans. It never executes.**

This is plan mode, the shape a coding agent takes when it is asked to think a
change through before touching anything: read, consider, propose a sequence, hand
it over. The plan is the deliverable. Someone else decides whether it happens.

So far, that is the only capability we could name that is genuinely more than a completion
and still structurally incapable of acting. It makes "suggests, doesn't decide"
into something buildable and testable rather than a slogan.

**"Never executes" has to be structural, not instructed.** A system prompt telling
a model not to act is exactly the kind of unexamined trust this project refuses.
The enforceable version is that the planning process holds no credentials, no write
tools, and no route to the operations plane. The Beak enforces the boundary; the
model is not asked to be disciplined about it.

A planner does need to know what is possible — the house catalog and the ontology
it plans against — and it plans under guardrails. **Knowing what can be done,
without holding the means to do it, is the line.**

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

## Crawl, walk, run

**Crawl — running today.** Plain completions, served to the Sensory Arm's
escalation punt. Nothing above changes this; the planner is additive, and the
inference endpoint keeps its own job.

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
  the only live caller is the Sensory Arm's punt. The contract has to serve both
  without changing shape.
- **Does it need state?** Mostly answered: idle/busy is availability, working state
  lives only for the duration of a job, and memory belongs to the Memory Arm. Still
  open — whether the arm holds a finished plan until it is collected, or hands it
  back and forgets. Holding it is retention with a policy attached; handing it back
  leaves the artifact with the Head, which is cleaner.
- **What does the Head do when the arm is busy?** Hold, refuse, or preempt. And
  "no answer" must be its own outcome, distinguishable from busy — silence is not a
  status.