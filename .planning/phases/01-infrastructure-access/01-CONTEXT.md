# Phase 1: Infrastructure & Access - Context

**Gathered:** 2026-05-17
**Status:** Ready for planning

## Phase Boundary

Establish the secure, non-interactive communication channel between GitHub Actions and the Mail-In-A-Box VPS to enable automated deployments.

## Implementation Decisions

### SSH Key Management
- **D-01:** Use a dedicated deployment key for the automation pipeline.
- **D-02:** Key pair to be generated locally by the user and the public key manually added to the VPS authorized_keys.

### VPS Target Path
- **D-03:** Target directory for `dist/` deployment: `/home/user-data/www/ai4aging.org`.

### Connectivity & Firewall
- **D-04:** VPS firewall is configured to allow SSH access from any source (all GitHub runner IPs are permitted).

### the agent's Discretion
No areas deferred to agent discretion.

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/PROJECT.md` — High-level project context and core value.
- `.planning/REQUIREMENTS.md` — Specific v1 requirements (SEC-01, SEC-02, SEC-03).

### Infrastructure
- No external specifications — requirements fully captured in decisions above.

## Existing Code Insights

### Reusable Assets
- None. This is infrastructure setup.

### Established Patterns
- Current manual deployment via `scp` establishes the desired end-state (files moving to the production path).

### Integration Points
- GitHub Actions Secrets $\rightarrow$ VPS SSH authorized_keys.

## Specific Ideas

- None. Open to standard secure deployment patterns.

## Deferred Ideas

None — discussion stayed within phase scope.

---

*Phase: 1-Infrastructure & Access*
*Context gathered: 2026-05-17*
