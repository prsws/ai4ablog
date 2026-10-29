---
title: Reading EPC Charts
description: How to read an Event-driven Process Chain (EPC) — the five symbols, AND/XOR/OR connectors, a seven-step reading method, and the traps — as used for the Pepa use-case charts.
template: doc
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
</p>

Each of the eight [use cases](/general/usecases/) has been drawn as an EPC chart, and those charts are the starting point for Pepa's specs. This page is how to read them. The one-page [EPC Cheat Sheet](/reference/epc-cheat-sheet/) has the same content condensed for printing.

## What an Event-driven Process Chain (EPC) is

An Event-driven Process Chain (EPC) reads as a chain of **states** and **actions**: something becomes true (an event), someone or something does work (a function), and that work makes something else true. Read it top to bottom; every path starts and ends on an event.

It came out of ARIS (Scheer, early 1990s) and was used to document the SAP reference model. It fits the eight ai4aging.org use cases because each scenario is a trigger ("José says *apaga el abanico*"), a short run of Pepa work, and a set of possible outcomes (done, not understood, nothing found).

## The five symbols

Shape tells you the role; read the shape before the words.

| Symbol | Shape | What it means | How to word it |
| --- | --- | --- | --- |
| Event | Hexagon | A passive state: a precondition before work, or the result after it. It takes no decision and does no work. | Noun + past participle: "Wake word detected" |
| Function | Rounded rectangle | An active task that turns one state into another. | Verb + object: "Transcribe utterance" |
| Connector | Small circle with ∧, × or ∨ | Splits one flow into several, or joins several into one. | AND, XOR or OR; no words |
| Control flow | Arrow | The order in which things happen. | No words |
| Process interface | Rectangle stacked on a hexagon | A jump to another EPC (another chart picks up from here). | The other process's name |

Extended EPCs (eEPC, the ARIS flavour) also hang side symbols off a function: an ellipse for the **organizational unit** that does it, a plain rectangle for the **information object** it reads or writes. They tell you *who* and *with what*, not *when*; the flow is still events, functions and connectors.

## Connectors: three types, two directions

A connector with one arrow in and several out is a **split**; several in and one out is a **join**. The symbol inside says the logic.

| Connector | As a split, read it as | As a join, read it as |
| --- | --- | --- |
| AND ∧ | All branches start, in parallel. | Wait until every branch has finished. |
| XOR × | Exactly one branch is taken. | Continue as soon as the one active branch arrives. |
| OR ∨ | One or more branches are taken. | Wait for every branch that was actually started. |

Two rules make connectors easier to read:

- **Events cannot decide.** An XOR or OR split always sits right after a *function* (the function made the choice), never right after an event. An AND split may follow either.
- **Splits and joins come in matched pairs.** A branch opened by an XOR should close on an XOR. A mismatched pair (XOR split closed by AND join) is a modelling error: the AND waits forever for branches that never ran.

## Reading method, step by step

1. **Find the start events.** They are hexagons with no arrow coming in. Several start events joined by a connector mean the process needs several triggers (AND) or any one of them (XOR / OR).
2. **Find the end events.** Hexagons with no arrow going out. Each one is a possible outcome; count them to know how many ways the process can finish.
3. **Walk the happy path.** Follow arrows from the main start event, taking the most likely branch at each split, and read it aloud as a sentence: *event, so function, so event*.
4. **Check the alternation.** Along any path, events and functions alternate (connectors sit in between and do not count). Two hexagons or two rounded rectangles in a row means something is missing.
5. **At each split, name the decision.** Look at the function just before it: that is who decides. Read the events right after it as the possible answers.
6. **Close every split.** Find the matching join and confirm it has the same symbol.
7. **Then read the side symbols.** Who does each function, and what data it touches.

## Worked example: "apaga el abanico"

![The UC4 fan command drawn as an EPC. Start event "Wake word heard", function "Parse the command", then an XOR split. One branch: event "Command understood", function "Switch the fan off", end event "Fan is off". Other branch: event "Command not understood", function "Ask the speaker to repeat", end event "Repeat requested".](../../../assets/epc/epc-uc4-worked-example.svg)

Read aloud: *wake word heard, so Pepa parses the command; it is either understood or not.* Understood leads to switching the fan off and the end state "Fan is off". Not understood leads to asking again. The XOR sits after a function, both branches end on an event, and each path alternates hexagon, rectangle, hexagon.

This chart is an illustration of the method, drawn for this page; it is not one of the use-case charts.

## Common traps

- **Reading an event as a step.** "Fan turned off" is a fact, not an action. If you catch yourself saying *Pepa does X* at a hexagon, the box is mislabeled.
- **A decision hanging off an event.** An XOR right after an event hides who decided. Look for the missing function.
- **The OR join.** It waits for "every branch that was started", which the join cannot see locally. Researchers spent a decade formalizing this; in practice, treat an OR join as a flag to ask *which branches really ran?*
- **Missing negative outcome.** A function that can fail but has only one event after it is incomplete. The "nothing found" step in [UC5, Knowledge Management](/general/usecases/#5-knowledge-management) is exactly this check.
- **Time is not drawn.** EPCs show order, not duration. "Shower running 20 minutes" has to be stated in an event's wording; the arrow says nothing about how long.

## References

1. Mendling, J., Neumann, G., Nüttgens, M. (2005). [Yet Another Event-driven Process Chain: Modelling Workflow Patterns with yEPCs](https://research.wu.ac.at/ws/files/38078424/Mendling_etal_2005_EMISA_Yet-Another-Event-driven.pdf). *Enterprise Modelling and Information Systems Architectures* 1(1), 3–13. Source for the symbol meanings, event/function alternation, why XOR and OR splits may not follow an event, and the AND / OR join behaviour.
2. Bruni, R. (2023). [06 – Event-driven Process Chains](https://didawiki.di.unipi.it/lib/exe/fetch.php/magistraleinformaticaeconomia/mpb/06-epc-2023.pdf), Business Processes Modelling course, University of Pisa. Source for the start/end-event rules, the no event-to-event and no function-to-function guideline, and worked examples of repairing badly formed EPCs.
