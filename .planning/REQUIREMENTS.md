# Requirements: ai4ablog CI/CD Automation

**Defined:** 2026-05-17
**Core Value:** Safe, verified, and zero-touch deployments: a push to `main` should result in a built and tested site being live on the VPS without any manual intervention.

## v1 Requirements

### Security & Access
- [ ] **SEC-01**: Dedicated SSH deployment key created and added to the VPS.
- [ ] **SEC-02**: Deployment key stored securely as a GitHub Action Secret.
- [ ] **SEC-03**: VPS firewall configured to allow SSH access from GitHub Action runners.

### Build Process
- [ ] **BLD-01**: GitHub Action workflow triggers exclusively on push to `main` branch.
- [ ] **BLD-02**: Workflow environment initialized with correct Node.js version.
- [ ] **BLD-03**: Automated execution of `npm install` and `npm run build`.
- [ ] **BLD-04**: Verification that `dist/` folder is successfully generated.

### Deployment
- [ ] **DPL-01**: Secure transfer of only the `dist/` folder to the production directory on the VPS via SCP/SSH.
- [ ] **DPL-02**: Atomic-style replacement of site files to prevent downtime during transfer.
- [ ] **DPL-03**: Correct permissions set on the VPS for the deployed files.

### Verification (Smoke Test)
- [ ] **VFY-01**: Automated HTTP request check to verify site returns 200 OK after deploy.
- [ ] **VFY-02**: Check for existence of a key index page to ensure content was transferred.

### Notifications
- [ ] **NOT-01**: Email notification sent to `jfrs50@gmail.com` upon successful deployment.
- [ ] **NOT-02**: Urgent email notification sent to `jfrs50@gmail.com` upon pipeline failure.

## v2 Requirements

### Optimizations
- **OPT-01**: Implement caching for `node_modules` in GitHub Actions to reduce build time.
- **OPT-02**: Implement a "dry-run" or staging environment deploy before production.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Server-side build | MIAB VPS is static-only; build must be external |
| Blue-Green Deployment | Overkill for a static blog; simple overwrite is sufficient |
| Full E2E Testing | Basic smoke tests are sufficient for this scale |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEC-01      | Phase 1| Pending |
| SEC-02      | Phase 1| Pending |
| SEC-03      | Phase 1| Pending |
| BLD-01      | Phase 2| Pending |
| BLD-02      | Phase 2| Pending |
| BLD-03      | Phase 2| Pending |
| BLD-04      | Phase 2| Pending |
| DPL-01      | Phase 3| Pending |
| DPL-02      | Phase 3| Pending |
| DPL-03      | Phase 3| Pending |
| VFY-01      | Phase 4| Pending |
| VFY-02      | Phase 4| Pending |
| NOT-01      | Phase 5| Pending |
| NOT-02      | Phase 5| Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-17*
*Last updated: 2026-05-17 after initial definition*
