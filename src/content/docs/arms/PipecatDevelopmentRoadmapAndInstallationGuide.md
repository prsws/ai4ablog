---
title: Pipecat Plan
description: Development roadmap and Debian ARM64 installation guide for Pipecat.
template: doc
---

## Development Roadmap

1. Fork Pipecat, create a Windows-audio feature branch, get it running in the existing virtualenv.
2. Build a minimal mic → STT → LLM → TTS → speakers pipeline behind clean interfaces.
3. Add basic configuration (`.env`/config file) and a tiny demo to exercise the pipeline.
4. Implement Windows device enumeration/selection and normalize sample rate/channel formats.
5. Add robust start/stop/shutdown semantics with guaranteed cleanup on exceptions.
6. Implement recoverable error handling with retries, timeouts, and backoff.
7. Enable incremental/streaming STT and dispatch partial hypotheses to the LLM.
8. Enable incremental/streaming TTS with chunked playback and backpressure management.
9. Add turn-taking (VAD, barge-in, silence detection) and interruption/continuation rules.
10. Measure end-to-end latency; tune buffers, chunk sizes, threading, and priorities.
11. Add structured telemetry (logs, metrics, optional traces) with opt-in configuration.
12. Build a simple launcher (CLI and minimal GUI) for day-to-day use with profiles.
13. Document setup, run, and troubleshooting; add a one-command dev workflow.
14. Prepare Windows-specific fixes as focused commits with tests and docs.
15. Submit upstream PR(s), iterate on feedback, maintain branch until merged.
16. Rebase regularly against upstream; tag internal releases; minimize delta until acceptance.

## Installation Guide — Debian 12 (ARM64)

**Tested on:** Raspberry Pi 4 (4GB RAM, 120GB SATA SSD), Debian 12 Bookworm, Python 3.11.2

### Steps
1. Create dedicated user
   sudo adduser pipecat su - pipecat
2. System preparation
   sudo apt update sudo apt install python3 python3-venv python3-pip git build-essential
3. Create project environment
   mkdir ~/pipecat-src && cd ~/pipecat-src python3 -m venv venv source venv/bin/activate
4. Clone repository
   git clone https://github.com/pipecat-ai/pipecat.git .
5. Install dependencies
   pip install --upgrade pip pip install -r pyproject.toml pip install --upgrade build
6. Build wheel
   python -m build
7. Install wheel
   cd dist pip install pipecat_ai-0.0.92.dev12-py3-none-any.whl
8. Verify
   python -c "import pipecat; print(pipecat.version)"

### Troubleshooting

- **Build fails** — `pip install python-dotenv fastapi websockets daily-python` then retry `python -m build`
- **Wheel install fails** — Use the full filename: `pip install pipecat_ai-<version>-py3-none-any.whl`
- 