---
title: No "Trust-Me-Bro" Rule
description: Every component must be explainable, reproducible, and traceable. Uncertainty is allowed; unacknowledged uncertainty is not.
template: doc
sidebar:
  label: No "Trust-Me-Bro" Rule
  order: 1
  badge:
    text: New
    variant: tip
draft: false
---
<span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
<span class="a4a-badge human-curated">Human Curated</span>

**Definition**

Any component, decision, or behavior in Pepa must be **explainable, reproducible, and traceable**. If it relies on intuition, memory, or undocumented assumptions, it is not valid.

---

### **Why it exists**

Prevents:

- Knowledge decay (“why did I do this?”)
- Hidden coupling between components
- LLM hallucination becoming “architecture”
- Future-you reverse engineering your own system

---

### **Minimum Requirements (per component / feature)**

1. **Source of Truth**
    - Spec, doc, or reference (internal or external)
    - Not just “it worked in testing”
2. **Explicit Behavior**
    - Inputs → outputs clearly defined
    - Deterministic parts separated from probabilistic ones
3. **Reproducibility**
    - Another system (or future you) can rebuild it from scratch
    - Includes configs, prompts, and dependencies
4. **Traceability**
    - Logs, state, or decision paths available
    - “Why did Pepa do this?” must be answerable
5. **Tradeoffs Documented**
    - Why this approach vs alternatives
    - Known limitations

---

### **Litmus Test**

If you can’t answer in <1 minute:

- *What is this doing?*
- *Why is it here?*
- *What would break if I remove it?*

→ It violates the rule.

---

### **Practical Implementation Hooks**

- YAML + comments for deterministic flows
- Versioned prompts for LLM components
- Lightweight “decision logs” (even text files)
- Architecture map (even rough) updated over time

---

### **Bottom Line**

> If Pepa can’t explain itself, it can’t be trusted to support you later.
>

---

That’s it—clean, enforceable, and aligned with what you’re already building.

## **Refined Rule: “No Unexamined Trust-Me-Bro”**

Pepa doesn’t require everything to be deterministic—it requires **everything to declare what it is**:

• **Deterministic parts** → must be reproducible and exact

• **Probabilistic parts (LLMs, heuristics)** → must be:

  - labeled as such

  - bounded (scope, confidence, fallback)

  - observable (logs / outcomes)

**Key idea**
Uncertainty is allowed. **Unacknowledged uncertainty is not.**

**One-liner version**
Pepa may reason under uncertainty, but it must never hide it.

That keeps it aligned with reality without turning into chaos.