---
title: Field Notes & Findings
description: The work of finding out — recon reports and bench measurements, kept as written rather than tidied after the fact.
template: doc
sidebar:
  label: Introduction
  order: 0
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge collaborative-mess">Collaborative Mess</span>
</p>

The rest of this site explains what Pepa is and argues for why it is built that
way. This section is the work underneath: measuring things, evaluating things,
and writing down what was actually found.

At least 2 kinds of documents live here:

**Field notes** are written while the work is happening — bench measurements,
sizing runs, notes from standing up something new. They record what a machine
actually did, not what it was expected to do.

**Findings** are what gets developed from them: recon reports on external tools
and frameworks, each carrying a verdict — skip, log, harvest, or adopt.

They are dated and not rewritten. A recon is a snapshot of what was known
on the day it was written, and correcting one means striking the error with a
dated note and appending the correction, not quietly editing the original.
Where a document contradicts itself across time, that is the record working as
intended.

Only some things here end in a decision. Recon grade means characterized, not committed to —
an entry describing a tool at length implies no plan to adopt it unless the record states so.
Settled decisions live in the architecture pages; this is the evidence they were made from.

That separation is deliberate, and it is the [No "Trust-Me-Bro"
Rule](/principles/no-trust-me-bro-rule/) applied to the project's own paper
trail. A principle that cannot be checked is just an assertion, and "it worked
in testing" is not a source of truth. These pages are what make the claims
elsewhere on the site auditable — including the ones that turned out to be
wrong.

>**NOTE** - You may find the acronym **OBOSBS** in these docs frequently. It means One-By-One-Step-By-Step. It's a planning technique I use
with the cloud AI assistants that works for me and saves me token$. It's prompted as follows:
>
>"Remember this: when specifically asked for a One-By-One-Step-By-Step (OBOSBS) plan do the following:
>
>1) Show a list of 1-line summaries for each intended step and its expected outcome
>2) Expanded but not complete description of Step 1
>3) Wait for my prompt"
>
>This allows me to get the big picture of what the thing is thinking and prepare for, preempt or even skip steps. Sometimes I find it was the wrong plan, early. That's it; it works for me but YMMV.