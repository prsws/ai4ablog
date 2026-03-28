---
title: Pipecat Voice Pipeline
description: How Pipecat orchestrates Whisper, Ollama, and Piper in a local voice pipeline.
template: doc
---

Pipecat is a Python framework that orchestrates STT, TTS, and LLM services. It supports **Ollama**, **Whisper**, and **Piper** as first-class services.

## What Pipecat Gives You

- A pipeline framework: audio capture → STT → LLM → TTS → playback
- Service adapters for Ollama, Whisper, and Piper — minimal custom glue needed
- Quickstart examples to test a full voice loop in minutes

## Mapping to the Homelab

1. **Ollama** — Keep running bare-metal. Point Pipecat to `http://localhost:11434`.
2. **Whisper (Docker)** — Expose STT endpoint to Pipecat via host networking or published port.
3. **Piper (Docker)** — Wire container so Pipecat can post text and receive audio stream.
4. **Pipecat server** — Install on same host, configure service URIs, run quickstart to validate.

## Minimal Wiring Checklist

1. `pip install "pipecat-ai[ollama,whisper,piper]"`
2. Confirm Ollama is reachable: `ollama ps`
3. Start Whisper and Piper containers; verify health endpoints
4. Configure `services: { llm: ollama://..., stt: whisper://..., tts: piper://... }` and run quickstart

## Practical Notes

- **Networking** — Run Pipecat and Ollama on the same host; use host networking for containers.
- **GPU** — Verify NVIDIA drivers and Ollama GPU config for Ollama and Faster-Whisper.
- **Audio formats** — Ensure Whisper container accepts Pipecat's sample rate/format.
- **Security** — Bind services to localhost; firewall external access.

## Resources

- [Pipecat GitHub](https://github.com/pipecat-ai/pipecat)
- [Supported Services Docs](https://docs.pipecat.ai/server/services/supported-services)
- [Quickstart Repo](https://github.com/pipecat-ai/pipecat-quickstart)
- [On-prem Ollama + Pipecat guide](https://webrtc.ventures/2025/03/on-premise-voice-ai-creating-local-agents-with-llama-ollama-and-pipecat/)
