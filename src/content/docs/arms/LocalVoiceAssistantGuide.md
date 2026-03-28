---
title: Local Voice Assistant
description: Fully local Whisper, Ollama, and Piper voice assistant setup and model guide.
template: doc
---

Fully local voice assistant with GPU acceleration. No cloud services required.

## Architecture
[Microphone] â†’ Whisper STT (GPU) â†’ Ollama LLM â†’ Piper TTS â†’ [Speakers]

## Components

- **Whisper** (faster-whisper) â€” Speech-to-text on RTX 2070 Super
- **Ollama** â€” Local LLM inference
- **Piper** â€” Text-to-speech synthesis
- **Wyoming Protocol** â€” Service communication

## Hardware

- Dell G7 7700 / Intel i7-10750H / 32GB RAM / Nvidia RTX 2070 Super (8GB VRAM) / Windows 11

## Quick Start

1. Double-click `start-services.bat`
2. Wait for all three windows to show "Ready" (~10 seconds)
3. Press and **hold spacebar**, speak your question
4. Release spacebar when done
5. Wait for AI response (plays automatically)

To stop: double-click `stop-services.bat` or close all three service windows.

## Configuration

| Service | Endpoint |
|---|---|
| Whisper STT | `tcp://127.0.0.1:10300` |
| Piper TTS | `tcp://127.0.0.1:10200` |
| Ollama | `http://127.0.0.1:11434` |

## LLM Model Guide

### Top Tier 7B Models

| Model | Category | Recommended Quantization | Notes |
|---|---|---|---|
| Llama 3 7B Instruct | General / Chat | `Q4_K_M` | Best default brain, excellent EN/ES |
| Mistral 7B Instruct v0.3 | Reasoning | `Q4_K_M` | Coherent, strong context retention |
| Gemma 7B Instruct | Conversational | `Q4_K_M` | Warm tone, good multilingual |
| Qwen 2 7B Instruct | Bilingual EN+ES | `Q4_K_M` | Best for Pepa-style personality |
| Yi 1.5 7B Chat | Creative / Narrative | `Q4_K_M` | Good for informal dialogue |

### Compact Models (â‰¤ 4B)

| Model | VRAM | Notes |
|---|---|---|
| Phi-3 Mini (3.8B) | ~4 GB | Fast + smart, ideal for quick assistants |
| Gemma 2B | ~3 GB | Lightweight CPU+GPU mix |
| TinyLlama 1.1B | < 2 GB | Experiments only |

### Selection Tips

- **Default:** Llama 3 7B Instruct (`Q4_K_M`)
- **Bilingual ENâ†”ES:** Qwen 2 7B Instruct
- **Tight VRAM:** Phi-3 Mini (3.8B)

## Troubleshooting

- **Services won't start** â€” Verify `D:\Pepa\venv` exists; run `ollama list`; check Device Manager for GPU.
- **No audio** â€” Must run on bare metal (not RDP); check Windows audio settings.
- **Slow responses** â€” Check GPU usage in Task Manager; verify Whisper is using CUDA.
- **"No speech detected"** â€” Speak closer to mic; increase hold time on spacebar.

## Performance

| Component | Latency |
|---|---|
| Whisper (base, GPU) | ~0.5â€“1s |
| Ollama (3B model) | ~1â€“2s |
| Piper TTS | ~0.2â€“0.5s |
| **Total end-to-end** | **< 1 second** |
