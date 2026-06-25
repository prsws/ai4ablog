---
sessionId: session-260624-110338-1ttc
---

# Requirements

### Overview & Goals
Migrate the existing Astro + Starlight documentation site from `astro` v6 to Astro v7 while preserving the current site behavior, navigation, content rendering, and build/preview workflow.

The project is currently a content-driven Astro site using:
- `astro` `^6.0.5`
- `@astrojs/starlight` `^0.38.1`
- Starlight plugins in `astro.config.mjs`
- Content collections via `src/content.config.ts`
- Markdown/MDX docs in `src/content/docs/**`

### Scope
#### In Scope
- Upgrade Astro and compatible official/community Starlight packages in `package.json` and `package-lock.json`.
- Remove Astro v7-obsolete experimental flags from `astro.config.mjs`:
  - `experimental.rustCompiler`
  - `experimental.queuedRendering`
- Verify that no `src/fetch.ts` reserved filename conflict exists; the current project does not contain that file.
- Validate content under `src/content/docs/**` against Astro v7’s stricter Rust compiler behavior.
- Run the project’s existing validation commands: `npm run build` and, if needed, `npm run preview`.

#### Out of Scope
- Redesigning the Starlight theme or navigation.
- Changing published content structure, routes, slugs, or site copy unless required to fix Astro v7 build failures.
- Adding a new framework, adapter, deployment target, or testing framework.

### Functional Requirements
- The site continues to build successfully with `npm run build`.
- Starlight docs pages, sidebar configuration, custom CSS, logo/favicon assets, `robots.txt.ts`, and content collections continue to work.
- Existing Starlight plugins remain enabled unless a plugin is incompatible and must be temporarily removed or replaced.
- The resulting dependency graph should not keep v6-only peer dependency conflicts.
- Implementation proceeds step-by-step: after each delivery step, the agent summarizes what changed, reports validation results or blockers, and waits for explicit user approval before starting the next step.

# Technical Design

### Current Implementation
- `package.json` defines a minimal Astro project with scripts for `astro dev`, `astro build`, and `astro preview`.
- `astro.config.mjs` configures:
  - Astro experimental flags at lines 10–13 for `rustCompiler` and `queuedRendering`.
  - `site: 'https://ai4aging.org'`.
  - Starlight as the only integration.
  - Community Starlight plugins: `starlight-ui-tweaks`, `starlight-scroll-to-top`, and `starlight-page-actions`.
- `src/content.config.ts` uses Astro content collections with Starlight’s `docsLoader()` and `docsSchema()` extended by `starlight-sidebar-topics`’s `topicSchema`.
- `src/pages/robots.txt.ts` is the only custom page route currently visible.
- There is no `src/fetch.ts`, so Astro v7’s new reserved filename rule does not currently conflict with the project.

### Astro v7 Migration Findings
Based on Astro v7 migration documentation/search results:
- Astro v7 upgrades the dev/build stack to Vite 8.
- Experimental flags including `rustCompiler` and `queuedRendering` have been removed because they are now default/stable behavior.
- The Rust compiler is now the only compiler and is stricter about invalid Astro/HTML markup:
  - unclosed tags now error;
  - semantically invalid HTML is no longer auto-corrected by the old compiler behavior.
- `advancedRouting` is now default, and `src/fetch.ts` is reserved.
- Cache-related experimental options, if used, must move to root config; this project does not currently use them.

### Key Decisions
- Use the official upgrade path (`npx @astrojs/upgrade`) or equivalent npm dependency updates so Astro and official integrations are upgraded together.
- Keep the site on the existing Astro + Starlight architecture; no new architecture is needed for this migration.
- Remove only obsolete Astro v7 experimental configuration, not unrelated Starlight/plugin configuration.
- Treat community plugin compatibility as a verification gate: upgrade plugins when compatible versions exist; if a plugin has no Astro v7-compatible release and blocks the build, isolate the failure and propose a minimal fallback.
- Use an approval-gated delivery flow: complete one delivery step, summarize the outcome, then pause until the user approves proceeding to the next step.

### Proposed Changes
- Update `package.json`:
  - bump `astro` from `^6.0.5` to the latest stable v7-compatible range;
  - update `@astrojs/starlight` to a version compatible with Astro v7;
  - remove `@astrojs/compiler-rs` if no longer required directly, because Astro v7 includes the Rust compiler behavior by default;
  - update community Starlight plugin versions when newer compatible releases are available.
- Refresh `package-lock.json` with `npm install` after dependency changes.
- Update `astro.config.mjs`:
  - remove the `experimental` block currently containing `rustCompiler` and `queuedRendering`;
  - leave `fonts`, `site`, `integrations`, sidebar, logo, favicon, and plugin options intact unless validation exposes compatibility problems.
- Inspect and fix only build-breaking markup issues in `src/content/docs/**/*.md` and `src/content/docs/**/*.mdx` if Astro v7’s stricter compiler reports them.

### Files Affected
- `package.json` — dependency versions and possible removal of direct `@astrojs/compiler-rs` dependency.
- `package-lock.json` — refreshed dependency lockfile.
- `astro.config.mjs` — removal of obsolete Astro v7 experimental flags.
- `src/content/docs/**/*.md` / `src/content/docs/**/*.mdx` — only if strict compiler validation finds invalid markup.

### Risks
- Some community Starlight plugins may lag Astro v7/Starlight compatibility.
- MDX/Markdown content that relied on tolerant old compiler behavior may fail under Astro v7.
- Vite 8 may surface issues in transitive plugins or integrations, although this project has no visible custom Vite config.

# Testing

### Validation Approach
- Run dependency installation after updates to detect peer dependency conflicts.
- Run `npm run build` as the primary acceptance check.
- If the build succeeds, optionally run `npm run preview` to manually verify rendered navigation and key pages.

### Key Scenarios
- Home page content in `src/content/docs/index.mdx` renders.
- Starlight sidebar sections defined in `astro.config.mjs` still appear.
- Autogenerated content groups such as `head` and `reference` still build.
- `src/pages/robots.txt.ts` continues to generate `robots.txt`.
- Custom CSS from `src/styles/global.css` remains included.

### Edge Cases
- MDX files with invalid nested HTML or unclosed tags fail under Astro v7 and require targeted fixes.
- Plugin compatibility failures should identify the specific plugin before disabling or replacing it.
- Asset path casing should be verified because `astro.config.mjs` references `Pepa_Logo_V0_NoBG.png` while the listed asset is `Pepa_Logo_v0_NoBG.png`; migration validation may surface this depending on filesystem/deploy target sensitivity.

# Delivery Steps

### ✓ Step 1: Update Astro and Starlight dependency set
The project dependencies are upgraded to Astro v7-compatible versions, then the agent pauses for approval before Step 2.

- Update `astro` from `^6.0.5` to the latest stable Astro v7 range.
- Update `@astrojs/starlight` to a version compatible with Astro v7.
- Review community Starlight plugin versions for `starlight-page-actions`, `starlight-plugin-icons`, `starlight-scroll-to-top`, `starlight-sidebar-topics`, and `starlight-ui-tweaks`.
- Remove the direct `@astrojs/compiler-rs` dependency if validation confirms it is no longer needed.
- Refresh `package-lock.json` with npm so installed versions and peer dependencies are consistent.
- Summarize dependency/version changes, peer dependency results, and any blockers.
- Wait for explicit user approval before adapting `astro.config.mjs`.

### ✓ Step 2: Adapt Astro configuration for v7 defaults
`astro.config.mjs` no longer uses experimental flags removed by Astro v7, then the agent pauses for approval before Step 3.

- Remove the `experimental` block containing `rustCompiler: true` and `queuedRendering`.
- Keep the existing Starlight integration, Starlight plugin configuration, sidebar entries, `fonts`, `site`, logo, favicon, and custom CSS configuration unchanged.
- Confirm the project has no `src/fetch.ts` reserved filename conflict.
- Summarize configuration changes and any reserved filename findings.
- Wait for explicit user approval before running build-driven migration fixes.

### ✓ Step 3: Fix migration build issues surfaced by Astro v7
Any Astro v7 compiler or plugin failures are resolved with minimal targeted changes, then the agent pauses for approval before Step 4.

- Run `npm run build` to surface Vite 8, Starlight, plugin, content collection, and Rust compiler errors.
- Fix invalid MDX/Markdown markup only where the Astro v7 compiler reports issues.
- Resolve dependency/plugin compatibility errors by upgrading the affected plugin where possible.
- If a community plugin blocks Astro v7 and no compatible version exists, isolate it and make the smallest safe configuration change needed to restore the build.
- Summarize build output, applied fixes, remaining risks, and whether the build passes.
- Wait for explicit user approval before final site validation.

### ✓ Step 4: Validate the migrated documentation site
The upgraded site builds and the main documentation flows still work, and the agent provides a final migration summary.

- Re-run `npm run build` after fixes and confirm it completes successfully.
- Optionally run `npm run preview` to check the generated site locally.
- Verify representative pages from `general`, `guides`, `head`, `arms`, and `reference` render through Starlight.
- Confirm `robots.txt`, custom CSS, sidebar navigation, logo/favicon, and Starlight plugin features still behave as expected.
- Summarize final validation results, any known follow-ups, and the exact files changed.