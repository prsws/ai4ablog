# ai4ablog CI/CD Automation

## What This Is

An automated deployment pipeline for the `ai4ablog` static site (Astro/Starlight) to the `ai4aging.org` production server. It replaces a manual `scp` process with a GitHub Actions workflow that triggers on pushes to the `main` branch.

## Core Value

Safe, verified, and zero-touch deployments: a push to `main` should result in a built and tested site being live on the VPS without any manual intervention.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **CI-01**: Automated build of the Astro project in GitHub Actions.
- [ ] **CI-02**: Secure transfer of the `dist/` folder to the MIAB VPS via SSH/SCP.
- [ ] **CI-03**: Deployment triggered exclusively by pushes to the `main` branch.
- [ ] **CI-04**: Implementation of a "smoke test" (e.g., link checking or basic HTTP response check) as a pre-deployment gate.
- [ ] **CI-05**: Email notifications to `jfrs50@gmail.com` upon pipeline success or failure.
- [ ] **CI-06**: Use of a dedicated deployment key for secure, non-interactive SSH access.

### Out of Scope

- **Server-side build** — The VPS is limited to serving static files; all builds must happen in the CI environment.
- **Blue-Green Deployment** — Simple overwrite of the static folder on the VPS is sufficient given the site's nature.

## Context

- **Frontend**: Astro / Starlight.
- **Infrastructure**: Mail-In-A-Box (MIAB) VPS.
- **CI/CD Tool**: GitHub Actions.
- **Repo**: `github.com/prsws/ai4ablog`.
- **Existing State**: Manual deployment via `scp`.

## Constraints

- **Technology**: Must use GitHub Actions for automation.
- **Deployment**: Only the `dist/` directory produced by `npm run build` should be transferred.
- **Security**: Must use SSH keys; no password-based authentication.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cloud Build | Offloads build load from VPS and ensures a clean environment | — Pending |
| GitHub Actions | Natural fit for a repository hosted on GitHub | — Pending |
| SSH Deploy Key | Standard security practice for automation | — Pending |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

*Last updated: 2026-05-17 after initialization*
