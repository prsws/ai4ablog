---
title: AI in Medicine and Pepa
description: The founding anecdote of the AI-in-medicine push depends on something no model produced and no program pays for — a family's hand-kept medical record.
template: doc
lastUpdated: 2026-09-16
tableOfContents: false
sidebar:
  label: Pepa and AI in Medicine
  badge:
    text: New
    variant: tip
draft: false
---
<span class="a4a-badge ai-assisted">AI Assisted</span>
<span class="a4a-badge human-curated">Human Curated</span>

## The Sixteen Years Nobody Is Funding

There is a story being told right now to explain why artificial intelligence
belongs in American medical care. It is a good story, and it is true. It also
contains, in plain sight, an argument against the conclusion being drawn from it.

Amy Gleason advises the Department of Health and Human Services on artificial
intelligence. Her daughter Morgan spent more than a decade with a debilitating
autoimmune disorder. At 27, Morgan uploaded sixteen years of meticulously kept
medical records into ChatGPT, and the model came back with a different assessment
than her doctors had given — one that got her into a clinical trial she had not
previously qualified for.

Everyone quotes the model. Almost nobody quotes the sixteen years.

## The model was the last mile

Strip the anecdote to its mechanics. A pattern-matching system was handed a
complete, chronological, sixteen-year longitudinal record of one human being and
found something in it. That is a real and useful result. It is also entirely
dependent on the input.

No model produced those sixteen years. No federal program paid for them. No
startup built them. A family kept them, by hand, year after year, starting long
before anyone knew what they would eventually be for. The record was the asset.
The model was the last mile.

And the last mile is the only part anyone is investing in.

This week the *New York Times* reported that HHS is accelerating efforts to put
AI agents into diagnosis and prescribing, with officials inside the department
concerned that the pace has outrun the evidence. Set aside whether that is wise.
Notice instead what is missing from the entire debate. Enormous attention is
going to the question of whether a model can reason well enough to practice
medicine. Almost none is going to the question of whether the model will have
anything to reason *about*.

## Most families do not have the sixteen years

In our opinion, these are possible scenarios that should worry anyone betting on this;

Patient portals are not archives. They purge. Many cap visible history at twelve
to thirty-six months. Records routinely vanish when a practice switches EMR
vendors, and access disappears entirely when you leave a provider, change
insurers, or move. The system that holds your medical history is not designed to
hold your medical history. It is designed to serve a billing relationship, and it
forgets you when the relationship ends.

So the Gleason story is not a story about what AI can do for a patient. It is a
story about what AI can do for a patient *whose family did the work of keeping the
record themselves, for sixteen years, without being asked to.*

Most people have not done that work. Most people do not know it needs doing. And
it cannot be done retroactively — that is the whole problem. You cannot assemble a
sixteen-year longitudinal record in the week after the diagnosis. The person who
could have narrated it is, by then, frequently no longer the person who needs it.

## This is why I am building the boring half

I am 66. I am building a system called Pepa in my own house, and I am its only
test subject.

Pepa does not diagnose. It does not prescribe. It does not detect falls or call
for help recklessly. The language model inside it is never permitted to control anything that
touches a person's safety — that separation is deliberate, enforced, and
documented, and it is the single most important design decision in the project.

What it does is keep the record. Medical documents with their correct service
dates. Medications and why each one was prescribed. Doctors, labs, routines, what
normal looks like for this person. It runs on ordinary hardware inside the house
and sends nothing to anyone's servers. It is free and open source under the MIT
license, and anyone can read it, copy it, or tell me what I have wrong.

That is a less exciting story than an AI that practices medicine. It is also the
part that has to exist first, and the part nobody will fund, because a data record
compounds slowly and demos badly.

## The distinction worth defending

We think there's a big difference between AI-assisted and AI-controlled, and the
current conversation keeps collapsing it.

For us, Assisted means a person, or their physician, or their family, holds the authority
and the record, and uses a model to see further into it than they could unaided.
That is what happened to Morgan Gleason. A human being brought sixteen years of
evidence and asked a question.

Controlled, however, means to us the model holds the authority. Different thing. Different failure
modes. Different consequences when it is wrong, and it will sometimes be wrong.

I have a personal reason for caring about which one we build. My father was given
an antipsychotic in a nursing home, off-label, for a dementia-related behavior —
a use that carries an FDA boxed warning about increased mortality in exactly his
population. Nobody consulted me. I found out months after he died, from a pharmacy
bill. The failure there was not a lack of intelligence in the system. It was a
health record his family did not hold and an authority his family did not have.

An AI that prescribes would not have prevented that. An AI that prescribes faster
would have made it worse. What would have helped is the thing nobody is building:
a record the family keeps, that shows a new drug appearing the day it appears.

## Start the record

If you take one thing from this: the useful moment to begin is **now**, while the
person whose record it is can still narrate it. Not after the fall. Not after the
diagnosis. Now, when it seems unnecessary.

You do not need my software to do it. A folder, a scanner, and the discipline to
keep it will get you most of the way, and it is what the Gleason family evidently
did. I am building Pepa because I want mine to still be readable in twenty years,
on hardware I own, without depending on a company that may not exist by then.

But the tool is not the point. The sixteen years are the point.

---

*Pepa is a self-hosted, no-cloud system for aging in place, built and field-tested
in one house in San Juan, Puerto Rico. Documentation and source:
[ai4aging.org](https://ai4aging.org).*