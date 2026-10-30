---
title: Reading EPC Charts
description: How to read an Event-driven Process Chain (EPC) and its extended form (eEPC) — symbols, connectors, satellites, a seven-step reading method, traps, and how eEPC maps onto Pepa's Head, Arms and people.
template: doc
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
</p>

Each of the eight [use cases](/general/usecases/) has been drawn as an EPC chart, and those charts are the starting point for Pepa's specs. This page is how to read them. The two-page [EPC Cheat Sheet](/reference/epc-cheat-sheet/) has the same content condensed for printing.

## What an Event-driven Process Chain (EPC) is

An Event-driven Process Chain (EPC) reads as a chain of **states** and **actions**: something becomes true (an event), someone or something does work (a function), and that work makes something else true. Read it top to bottom; every path starts and ends on an event.

It was introduced by Keller, Nüttgens and Scheer in 1992 and became widely used through the ARIS modelling framework, including for the SAP reference model. It fits the eight ai4aging.org use cases because each scenario is a trigger ("José says *apaga el abanico*"), a short run of Pepa work, and a set of possible outcomes (done, not understood, nothing found).

## The five symbols

Shape tells you the role; read the shape before the words.

| Symbol | Shape | What it means | How to word it |
| --- | --- | --- | --- |
| Event | Hexagon | A passive state: a precondition before work, or the result after it. It takes no decision and does no work. | Noun + past participle: "Wake word detected" |
| Function | Rounded rectangle | An active task that turns one state into another. | Verb + object: "Transcribe utterance" |
| Connector | Small circle with ∧, × or ∨ | Splits one flow into several, or joins several into one. | AND, XOR or OR; no words |
| Control flow | Arrow | The order in which things happen. Solid in ARIS; some textbooks dash it, and the dash means nothing. | No words |
| Process interface | Most tools: a function shape in front of an event shape | A hand-off to another EPC at the same level; control does not come back. Older ARIS texts call it a process path. | The other process's name |

Extended EPCs (eEPC, the ARIS flavour) also hang side symbols off a function: an ellipse for the **organizational unit** that does it, a plain rectangle for the **information object** it reads or writes. They tell you *who* and *with what*, not *when*; the flow is still events, functions and connectors. Pepa's charts need them; they get [their own section](#extended-epc-eepc-who-with-what-under-which-rules) below.

## Connectors: three types, two directions

A connector with one arrow in and several out is a **split**; several in and one out is a **join**. The symbol inside says the logic.

| Connector | As a split, read it as | As a join, read it as |
| --- | --- | --- |
| AND ∧ | All branches start, in parallel. | Wait until every branch has finished. |
| XOR × | Exactly one branch is taken. | Continue as soon as the one active branch arrives. |
| OR ∨ | One or more branches are taken. | Wait for every branch that was actually started. |

Three rules make connectors easier to read:

- **Events cannot decide.** An XOR or OR split always sits right after a *function* (the function made the choice), never right after an event. This is the standard EPC rule, and Pepa enforces it strictly. An AND split may follow either; after an event it means one event starts several functions in parallel, which is allowed but rare.
- **Match splits and joins.** Closing each split with a join of the same type is a convention, not required syntax, but it keeps a chart sound. A mismatched pair (XOR split closed by AND join) can deadlock: the AND waits forever for branches that never ran.
- **An XOR join expects one branch.** If more than one branch can arrive at it, the chart has a problem; the literature disagrees on what an XOR join does then.

## Reading method, step by step

1. **Find the start events.** They are hexagons with no arrow coming in. When several start events send their arrows into one connector, the process needs all of those triggers (AND) or any one of them (XOR / OR).
2. **Find the end events.** Hexagons with no arrow going out. Each one is a possible outcome; count them to know how many ways the process can finish.
3. **Walk the happy path.** Follow arrows from the main start event, taking the most likely branch at each split, and read it aloud as a sentence: *event, so function, so event*.
4. **Check the alternation.** Along any path, events and functions alternate (connectors sit in between and do not count). Two hexagons or two rounded rectangles in a row means something is missing.
5. **At each split, name the decision.** The function just before it says what is being decided; in an eEPC, its *decides on* line says who has the authority. Read the events right after the split as the possible answers.
6. **Close every split.** Find the matching join and confirm it has the same symbol.
7. **Then read the side symbols.** Who decides, who carries each function out, what data and software it uses, and which rule binds it.

## Worked example: "apaga el abanico"

![The UC4 fan command drawn as an EPC. Start event "Wake word heard", function "Parse the command", then an XOR split. One branch: event "Command understood", function "Switch the fan off", end event "Fan is off". Other branch: event "Command not understood", function "Ask the speaker to repeat", end event "Repeat requested".](../../../assets/epc/epc-uc4-worked-example.svg)

Read aloud: *wake word heard, so Pepa parses the command; it is either understood or not.* Understood leads to switching the fan off and the end state "Fan is off". Not understood leads to asking again. The XOR sits after a function, both branches end on an event, and each path alternates hexagon, rectangle, hexagon.

This chart is an illustration of the method, drawn for this page; it is not one of the use-case charts.

## Extended EPC (eEPC): who, with what, under which rules

A plain EPC says *what happens, in what order*. An extended EPC (eEPC), the ARIS flavour, hangs **satellites** off each function to say *who does it, with what data and software, and under which rules*. In the eEPC convention taught here, satellites attach to functions only, never to events or connectors, and they never change the flow: read the chain first, then the satellites.

| Satellite | Usual look (varies by tool) | Question it answers | Definition, in short |
| --- | --- | --- | --- |
| Organizational unit | Ellipse | Which unit does or owns this step? | A unit in the organization's hierarchy. |
| Role, position, person | Ellipse with a figure or mark | Which kind of actor, or which named one? | Role: a group of people. Position: the smallest organizational unit, not necessarily a person. Person: one individual. |
| Information carrier, cluster, entity type | Rectangle | What data does the step read or write? | Where knowledge or data is kept; a cluster groups related entity types into one business object. |
| Application system type, application system | Rectangle with bars at the sides | What software supports the step? | Software that supports a function; the *type* is the kind, the *system* is the installed one. |
| Software robot, attended software robot | Tool-specific icon | Does software carry the step out on its own? | A robot performs the function autonomously; an attended robot needs a human to step in. |
| IoT object | Tool-specific icon | Which device is sensed or driven? | A type of connected thing. |
| Location | Tool-specific icon | Where does it happen? | A physical place. |
| Risk | Tool-specific icon | What could defeat the step's goal? | The possible danger that the objective is not met. |
| Business policy | Tool-specific icon | Which rule governs the step? | A directive that governs or guides. |
| KPI instance | Tool-specific icon | How is success measured? | The degree to which a goal is met. |
| Requirement | Tool-specific icon | Which requirement does the step satisfy? | What a system, product or service should be or do. |

### The lines carry verbs (RASCI)

The line from a person, role or unit to a function is labelled with a verb. Read it as a sentence: *the Sensory Arm carries out Switch the fan off.*

| Letter | The line reads | Meaning |
| --- | --- | --- |
| R, Responsible | carries out | Does the work. |
| A, Accountable | decides on | Owns the outcome and can say no. |
| S, Supportive | contributes to | Helps with the work. |
| C, Consulted | has consulting role in | Is asked before. |
| I, Informed | must be informed about | Is told after. |

Data lines have a direction instead of a verb: an arrow *into* the function means the function reads the data (input); an arrow *out of* it means the function writes it (output).

### Keeping a chart readable

- **Function Allocation Diagram (FAD).** When satellites crowd the chart, move each function's satellites to its own small FAD and keep the EPC to events, functions and connectors.
- **Lower-level EPC.** A function can be detailed by a whole EPC of its own (a drill-down, one level down). Control returns to the parent chart when it finishes.
- **Process interface.** A hand-off sideways to another EPC at the same level. Unlike a drill-down, control does not come back.

## Applying eEPC to Pepa

In Pepa's charts the satellites are where the architecture shows: which arm carries out each function, which person decides, what data it touches, and which rule binds it. The mapping below is a proposed convention for the use-case specs. It follows the architecture as it stands and will move with it.

| eEPC satellite | In Pepa | Examples |
| --- | --- | --- |
| Organizational unit | The Head or an Arm | Head; Sensory Arm (house scope); Sensory Arm (human scope); Memory Arm; Knowledge Arm; Reasoning Arm; Human Sentinel Arm; Self-Monitor Arm |
| Role, person | The people Pepa serves | The senior, the authority on their own life; a co-authority for shared actions; an escalation contact |
| Information carrier, cluster | Pepa's stores and records | House state; human telemetry; the memory store; scanned documents; knowledge sources; the health record; the utterance transcript |
| Application system | The software an arm runs on | Home Assistant; Paperless-ngx; Open Notebook; the local language model; speech-to-text and text-to-speech |
| Software robot, attended software robot | An arm acting alone, or waiting for a person | A requested house action (robot); a check-in that waits for "estoy bien" (attended) |
| IoT object | Sensors and actuators | Presence sensor; ceiling fan; watch; scale |
| Location | Rooms of the house | Office; bathroom; porch |
| Risk | Known ways a step goes wrong | Wrong device actuated; a memory recalled wrong; a misheard command |
| Business policy | Pepa's principles and guardrails | Memory Is Not Authority; the [No "Trust-Me-Bro" Rule](/principles/no-trust-me-bro-rule/); the [governance](/principles/governance/) tiers |
| KPI instance | A measurable promise | Response time of a voice command |
| Requirement | The spec line a function satisfies | An item from a use-case spec |

### Pepa's rules, read as eEPC checks

When a use-case chart gets its satellites, these are the lines to look for and the lines that must never appear. In Pepa, *decides on* means the person has authority over the action, which is stronger than ordinary RACI accountability; that is a Pepa convention, not ARIS's definition.

1. **People decide; arms carry out.** An action on the house or the outside world has a person on its *decides on* line. An arm is at most *carries out*.
2. **Retrieval is not authority.** The Memory Arm and the Knowledge Arm appear as *contributes to*, or as information carriers, never as *decides on* an action.
3. **One voice to people.** Every *must be informed about* line to a person runs through the Sensory Arm's house scope, Pepa's only way of speaking to people.
4. **The human scope looks inward.** Human telemetry is written by the Sensory Arm's human scope and read by the Human Sentinel Arm. It never feeds a conversation function.
5. **Observations, not conclusions.** A Human Sentinel Arm function outputs an observation, never a diagnosis. Calling someone is a separate function, with a person on its *decides on* line.
6. **A check-in is an attended robot.** An observation becomes a question the device asks, and nothing further happens until the person answers.
7. **Abstention is an output.** A retrieval function writes either a result or a "nothing found" record, and the chart shows both events.
8. **No camera objects.** No camera appears as an IoT object on any Pepa function.

## eEPC worked example: one Pepa function

![eEPC fragment from UC4. Event "Command understood" leads to function "Switch the fan off", which leads to event "Fan is off". Satellites on the function: the senior (role) decides on it; the Sensory Arm's house scope carries it out; Home Assistant supports it; the function reads and writes the house state.](../../../assets/epc/epc-eepc-fan-fragment.svg)

Read the chain first: *command understood, so switch the fan off, so the fan is off.* Then the satellites: the senior *decides on* it (rule 1), the Sensory Arm's house scope *carries it out*, Home Assistant *supports* it, and the function reads and writes the house state. None of the satellites adds a step to the flow. Like the chart above, this is an illustration drawn for this page.

## Common traps

- **Reading an event as a step.** "Fan turned off" is a fact, not an action. If you catch yourself saying *Pepa does X* at a hexagon, the box is mislabeled.
- **A decision hanging off an event.** An XOR right after an event hides who decided. Look for the missing function.
- **The OR join.** It waits for "every branch that was started", which the join cannot see locally. Researchers spent a decade formalizing this; in practice, treat an OR join as a flag to ask *which branches really ran?*
- **Missing negative outcome.** In Pepa's use-case specs, a function that can fail but has only one event after it is incomplete. This is a Pepa completeness rule, not EPC syntax. The "nothing found" step in [UC5, Knowledge Management](/general/usecases/#5-knowledge-management) is exactly this check.
- **Time is not drawn.** EPCs show order, not duration. "Shower running 20 minutes" has to be stated in an event's wording; the arrow says nothing about how long.
- **A satellite drawn as a step.** An arm, a store or Home Assistant in the flow line, between events, means a satellite was drawn as a function. Move it to the side and connect it with a verb.

## References

1. Mendling, J., Neumann, G., Nüttgens, M. (2005). [Yet Another Event-driven Process Chain: Modelling Workflow Patterns with yEPCs](https://research.wu.ac.at/ws/files/38078424/Mendling_etal_2005_EMISA_Yet-Another-Event-driven.pdf). *Enterprise Modelling and Information Systems Architectures* 1(1), 3–13. Source for the symbol meanings, event/function alternation, why XOR and OR splits may not follow an event, and the AND / OR join behaviour.
2. Bruni, R. (2023). [06 – Event-driven Process Chains](https://didawiki.di.unipi.it/lib/exe/fetch.php/magistraleinformaticaeconomia/mpb/06-epc-2023.pdf), Business Processes Modelling course, University of Pisa. Source for the start/end-event rules, the no event-to-event and no function-to-function guideline, and worked examples of repairing badly formed EPCs.
3. Software AG (2023). [EPC for ARIS](https://documentation.softwareag.com/aris/Connect/10-0sr24/ycs10-0sr24e/10-0sr24_EPC_Cheat_Sheet.pdf), ARIS cheat sheet. Source for the eEPC satellite types (organizational, data, application system, IoT, risk, policy, KPI and requirement objects), the RASCI connection verbs, the Function Allocation Diagram, and lower-level EPCs.
