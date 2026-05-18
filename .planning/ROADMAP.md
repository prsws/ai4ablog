# Roadmap: ai4ablog CI/CD Automation

**Date:** 2026-05-17
**Project Mode:** mvp

## Overview
This roadmap implements a zero-touch deployment pipeline from GitHub to a Mail-In-A-Box VPS. The approach is vertical: each phase delivers a verifiable piece of the pipeline.

## Phases

### Phase 1: Infrastructure & Access
**Goal:** Establish secure communication between GitHub and the VPS.
**Mode:** mvp
**Success Criteria**:
1. SSH deployment key is generated and active on the VPS.
2. GitHub Secrets are populated with the private key and VPS details.
3. SSH connection from a test runner is verified.

**Mapped Requirements**: SEC-01, SEC-02, SEC-03

---

### Phase 2: Build Pipeline
**Goal:** Automate the creation of production-ready static assets.
**Mode:** mvp
**Success Criteria**:
1. GitHub Action triggers on push to `main`.
2. `npm run build` completes successfully in the runner.
3. `dist/` folder is generated and verified as non-empty.

**Mapped Requirements**: BLD-01, BLD-02, BLD-03, BLD-04

---

### Phase 3: Deployment Logic
**Goal:** Securely transport and activate the built assets on the server.
**Mode:** mvp
**Success Criteria**:
1. `dist/` contents are transferred to the production folder via SCP.
2. Site is live and accessible via `ai4aging.org`.
3. VPS file permissions are correctly set for the web server.

**Mapped Requirements**: DPL-01, DPL-02, DPL-03

---

### Phase 4: Verification & Testing
**Goal:** Ensure the deployed site is functional before marking the deploy as a success.
**Mode:** mvp
**Success Criteria**:
1. Automated HTTP check returns 200 OK for the homepage.
2. Smoke test verifies the existence of key content.

**Mapped Requirements**: VFY-01, VFY-02

---

### Phase 5: Alerting & Finalization
**Goal:** Close the loop with status notifications and final verification.
**Mode:** mvp
**Success Criteria**:
1. Success email sent to `jfrs50@gmail.com` after a full pipeline run.
2. Failure email sent upon pipeline error.
3. End-to-end "Push $\rightarrow$ Live" flow tested and verified.

**Mapped Requirements**: NOT-01, NOT-02

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEC-01      | 1     | Pending |
| SEC-02      | 1     | Pending |
| SEC-03      | 1     | Pending |
| BLD-01      | 2     | Pending |
| BLD-02      | 2     | Pending |
| BLD-03      | 2     | Pending |
| BLD-04      | 2     | Pending |
| DPL-01      | 3     | Pending |
| DPL-02      | 3     | Pending |
| DPL-03      | 3     | Pending |
| VFY-01      | 4     | Pending |
| VFY-02      | 4     | Pending |
| NOT-01      | 5     | Pending |
| NOT-02      | 5     | Pending |
