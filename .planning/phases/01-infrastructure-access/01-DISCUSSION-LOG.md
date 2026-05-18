# Phase 1: Infrastructure & Access - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-17
**Phase:** 1-Infrastructure & Access
**Areas discussed:** SSH Key Management, VPS Target Path, Connectivity & Firewall

---

## SSH Key Management

| Option | Description | Selected |
|--------|-------------|----------|
| Local Generation | I will generate the key pair locally and add the public key to the VPS myself. (Recommended/Safest) | ✓ |
| Automated Management | I want the pipeline to manage keys if possible. | |

**User's choice:** Local Generation
**Notes:** User will handle the initial setup and placement of the public key manually.

---

## VPS Target Path

| Option | Description | Selected |
|--------|-------------|----------|
| I'll provide the path | I will provide the exact path and ensure the user has write access. | ✓ |
| Suggest a path | I'm not sure, can you suggest a standard MIAB path? | |

**User's choice:** `/home/user-data/www/ai4aging.org`
**Notes:** This is the explicit production path on the MIAB VPS.

---

## Connectivity & Firewall

| Option | Description | Selected |
|--------|-------------|----------|
| Allow All | VPS firewall is configured to allow SSH access from any source. | ✓ |
| IP Whitelisting | Restrict to GitHub runner IP ranges. | |

**User's choice:** VPS firewall is configured to allow ssh access from any source.
**Notes:** No specific IP restrictions are currenty in place.

---

## the agent's Discretion

None.

## Deferred Ideas

None.
