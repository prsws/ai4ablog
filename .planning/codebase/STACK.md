# Technology Stack

**Analysis Date:** 2026-05-17

## Languages

**Primary:**
- TypeScript - Used for configuration and minimal page logic (`tsconfig.json`, `astro.config.mjs`, `src/pages/robots.txt.ts`).
- Markdown/MDX - Primary content format for the documentation site (`src/content/docs/`).

**Secondary:**
- CSS - Styling via `src/styles/global.css`.
- JavaScript - Runtime for build and deployment.

## Runtime

**Environment:**
- Node.js (Version inferred from `package.json` usage of "type": "module").

**Package Manager:**
- npm (Lockfile `package-lock.json` present).

## Frameworks

**Core:**
- Astro ^6.0.5 - Static site generator for the documentation.
- Starlight (@astrojs/starlight ^0.38.1) - Documentation framework built on top of Astro.

**Testing:**
- Not detected.

**Build/Dev:**
- Astro Build System - Handles static site generation and compilation.

## Key Dependencies

**Critical:**
- `@astrojs/starlight` - provides the documentation structure, navigation, and UI.
- `astro` - core engine.
- `sharp` - image processing (`package.json`).

**Infrastructure:**
- `@astrojs/compiler-rs` - high-performance compilation (enabled in `astro.config.mjs` as `rustCompiler: true`).

## Configuration

**Environment:**
- No dedicated environment variable files detected (e.g., `.env` not found).
- Site configuration is primarily handled in `astro.config.mjs`.

**Build:**
- `astro.config.mjs` - Main configuration file.
- `tsconfig.json` - TypeScript configuration.

## Platform Requirements

**Development:**
- Node.js environment.
- npm package manager.

**Production:**
- Static hosting (Site specified as `https://ai4aging.org`).

---

*Stack analysis: 2026-05-17*
