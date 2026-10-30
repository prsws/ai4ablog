---
title: EPC Cheat Sheet
description: A two-page, printable cheat sheet for reading Event-driven Process Chain (EPC) charts and their extended form (eEPC) — symbols, connectors, rules, a worked example, traps, and how eEPC maps onto Pepa.
template: doc
lastUpdated: 2026-10-29
sidebar:
  label: EPC Cheat Sheet
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
</p>

Two pages, Letter landscape, for keeping beside the use-case charts. Page 1 covers plain EPC; page 2 covers the extended EPC (eEPC) satellites and how they map onto Pepa. The full explanation is in [Reading EPC Charts](/reference/reading-epc-charts/).

**[Download the PDF](/downloads/epc-cheat-sheet.pdf)** (two pages, Letter landscape) for printing.

## Page 1: reading EPC charts

![EPC cheat sheet, page 1. Top row: the five symbols — Event (hexagon), Function (rounded rectangle), Connector (AND, XOR, OR circles), Control flow (arrow) and Process interface. Middle row: a table of what each connector means as a split and as a join; five rules of a well-formed chart; and the UC4 fan command drawn as a worked example. Bottom row: seven steps to read any chart, and four traps.](../../../assets/epc/epc-cheat-sheet.png)

## Page 2: eEPC for Pepa

![EPC cheat sheet, page 2, eEPC for Pepa. Top row: five satellites with their usual look and what each means in Pepa — organizational unit (the Head or an Arm), role or person (the senior, a co-authority, an escalation contact), information carrier (house state, telemetry, memory store, documents, health record), application system (Home Assistant, Paperless-ngx, Open Notebook, the local model) and software robot (a requested house action; attended: a check-in waiting for "estoy bien"). Middle row: the RASCI line verbs — carries out, decides on, contributes to, has consulting role in, must be informed about — and the other satellites in Pepa: IoT object, location, risk, business policy, KPI instance, requirement. Bottom: eight of Pepa's rules read as eEPC checks.](../../../assets/epc/epc-cheat-sheet-eepc.png)

Sources: Mendling, Neumann & Nüttgens (2005), [Yet Another Event-driven Process Chain](https://research.wu.ac.at/ws/files/38078424/Mendling_etal_2005_EMISA_Yet-Another-Event-driven.pdf), EMISA 1(1) · Bruni (2023), [Event-driven Process Chains](https://didawiki.di.unipi.it/lib/exe/fetch.php/magistraleinformaticaeconomia/mpb/06-epc-2023.pdf), University of Pisa · Software AG (2023), [EPC for ARIS](https://documentation.softwareag.com/aris/Connect/10-0sr24/ycs10-0sr24e/10-0sr24_EPC_Cheat_Sheet.pdf).
