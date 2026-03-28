---
title: Voice Interface Architecture
description: Bilingual English and Spanish voice pipeline architecture for Pepa.
template: doc
---

## Pipeline Flow

User → Microphone → Wake Word Detection → Language Context → ASR → NLP / Intent Parser → Automation Layer → TTS / Feedback → User

## Step-by-Step

1. **Wake Word Detection** — Listens for "Pepa, English" → `mode = EN` or "Pepa, Español" → `mode = ES`. Can auto-detect, but explicit phrases reduce errors.
2. **Language Context** — Stores session variable `language_mode = EN/ES`, used by all downstream modules.
3. **ASR** — Switches model based on `language_mode`: English Whisper model or Spanish/bilingual Whisper model.
4. **NLP / Intent Parsing** — Converts speech to actionable intent. Maps multiple phrasings to the same entity: e.g. "Turn on the hall light" ↔ "Enciende la luz del pasillo".
5. **Automation Layer** — Triggers Home Assistant actions. Device IDs remain language-neutral (e.g. `luz_pasillo`).
6. **TTS / Feedback** — Spoken response in current language mode via Piper. Optional visual display on NSPanel or Magic Mirror.
7. **Session / Timeout** — Language mode persists until timeout (60s), explicit switch, or reset command.

## Optional Extensions

- **Guest mode:** "Pepa, Guest" → English-only, simplified commands, confirmation prompts.
- **Care mode:** "Pepa, Care" → slower speech, extra confirmations.
- **Speaker-aware:** ASR + speaker ID remembers preferred language per person.
