# Codebase Concerns

**Analysis Date:** 2026-05-17

## Tech Debt

**Configuration Redundancy:**
- Issue: There is a duplicate configuration file `astro.config.mjs.new` alongside the active `astro.config.mjs`. This suggests a pending migration or a manual backup committed to the repository.
- Files: `astro.config.mjs`, `astro.config.mjs.new`
- Impact: Confusion regarding which configuration is the source of truth; risk of applying changes to the wrong file.
- Fix approach: Compare the two files, merge necessary changes into `astro.config.mjs`, and delete `astro.config.mjs.new`.

**Unprocessed Import Data:**
- Issue: The `import/` directory contains raw Notion exports from March 2026. While much of this content has likely been moved to `src/content/docs/`, the original export remains in the repository.
- Files: `import/Notion Export 20260316/`
- Impact: Increases repository size and creates ambiguity about where the "official" source of truth for content resides.
- Fix approach: Verify all required content is migrated to `src/content/docs/`, then remove the `import/` directory or move it to an external archive.

## Known Bugs

**Not detected**

## Security Considerations

**Static Site Architecture:**
- Risk: Minimal, as the project is an Astro SSG site.
- Files: `astro.config.mjs`
- Current mitigation: No server-side runtime to attack; deployment is via static files.
- Recommendations: Ensure that the deployment pipeline does not accidentally include the `import/` directory if it contains sensitive notes (though none were found during this scan).

## Performance Bottlenecks

**Experimental Features:**
- Problem: The project uses `experimental.rustCompiler` and `experimental.queuedRendering` in `astro.config.mjs`.
- Files: `astro.config.mjs`
- Cause: Use of bleeding-edge Astro features to improve build times/performance.
- Improvement path: Monitor build stability during Astro version upgrades, as experimental features are the first to break.

## Fragile Areas

**Plugin Dependency Chain:**
- Files: `package.json`
- Why fragile: The site depends on several community-made Starlight plugins (`starlight-ui-tweaks`, `starlight-scroll-to-top`, `starlight-page-actions`, `starlight-sidebar-topics`). These are often tightly coupled to specific Starlight/Astro versions.
- Safe modification: Always test the build in a separate branch when updating `astro` or `@astrojs/starlight`.
- Test coverage: No automated E2E or regression tests detected for the UI/layout.

## Scaling Limits

**Content Management:**
- Current capacity: Small to medium documentation site.
- Limit: As the number of `.mdx` files in `src/content/docs/` grows, the manual sidebar configuration in `astro.config.mjs` may become unmanageable.
- Scaling path: Transition more sections to `autogenerate: { directory: '...' }` to reduce manual entry in the config file.

## Dependencies at Risk

**Not detected**

## Missing Critical Features

**Automated Testing:**
- Problem: There are no test files (unit, integration, or E2E) in the repository.
- Blocks: Safe refactoring of the site structure or upgrading core dependencies without manual verification of every page.

## Test Coverage Gaps

**Entire Application:**
- What's not tested: Everything.
- Files: `src/`
- Risk: High risk of regression during updates to the Astro framework or Starlight plugins.
- Priority: Medium (due to the static nature of the site).

---

*Concerns audit: 2026-05-17*
