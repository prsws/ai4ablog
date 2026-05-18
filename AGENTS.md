<!-- GSD:project-start source:PROJECT.md -->
## Project

**ai4ablog CI/CD Automation**

An automated deployment pipeline for the `ai4ablog` static site (Astro/Starlight) to the `ai4aging.org` production server. It replaces a manual `scp` process with a GitHub Actions workflow that triggers on pushes to the `main` branch.

**Core Value:** Safe, verified, and zero-touch deployments: a push to `main` should result in a built and tested site being live on the VPS without any manual intervention.

### Constraints

- **Technology**: Must use GitHub Actions for automation.
- **Deployment**: Only the `dist/` directory produced by `npm run build` should be transferred.
- **Security**: Must use SSH keys; no password-based authentication.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript - Used for configuration and minimal page logic (`tsconfig.json`, `astro.config.mjs`, `src/pages/robots.txt.ts`).
- Markdown/MDX - Primary content format for the documentation site (`src/content/docs/`).
- CSS - Styling via `src/styles/global.css`.
- JavaScript - Runtime for build and deployment.
## Runtime
- Node.js (Version inferred from `package.json` usage of "type": "module").
- npm (Lockfile `package-lock.json` present).
## Frameworks
- Astro ^6.0.5 - Static site generator for the documentation.
- Starlight (@astrojs/starlight ^0.38.1) - Documentation framework built on top of Astro.
- Not detected.
- Astro Build System - Handles static site generation and compilation.
## Key Dependencies
- `@astrojs/starlight` - provides the documentation structure, navigation, and UI.
- `astro` - core engine.
- `sharp` - image processing (`package.json`).
- `@astrojs/compiler-rs` - high-performance compilation (enabled in `astro.config.mjs` as `rustCompiler: true`).
## Configuration
- No dedicated environment variable files detected (e.g., `.env` not found).
- Site configuration is primarily handled in `astro.config.mjs`.
- `astro.config.mjs` - Main configuration file.
- `tsconfig.json` - TypeScript configuration.
## Platform Requirements
- Node.js environment.
- npm package manager.
- Static hosting (Site specified as `https://ai4aging.org`).
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Overview
## Style & Patterns
- **Language**: TypeScript (ESM).
- **Content Structure**: Follows Starlight's directory-based routing in `src/content/docs/`.
- **Naming**:
- **Formatting**: Standard TypeScript formatting.
## Error Handling
- **Build-time validation**: Astro's content layer ensures schema validity for content collections.
- **Type Safety**: TypeScript is used for configuration files (e.g., `src/content.config.ts`).
## Key Patterns
- **Content-First**: Logic is decoupled from content. Most "behavior" is defined by Starlight's plugin system and configuration.
- **Static Generation**: The site is pre-rendered, minimizing runtime error surfaces.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
```
## Component Responsibilities
| Component | Responsibility | File |
|-----------|----------------|------|
| Site Configuration | Defines site metadata, plugins, and sidebar structure | `astro.config.mjs` |
| Content Schema | Defines the structure and validation for content collections | `src/content.config.ts` |
| Documentation | Source files for all site content and guides | `src/content/docs/` |
| Global Styles | Custom CSS overrides for Starlight UI | `src/styles/global.css` |
| Application Logic | Custom routes and API endpoints (minimal) | `src/pages/` |
## Pattern Overview
- **Content-Driven:** The site structure is primarily derived from the filesystem layout in `src/content/docs/`.
- **Schema-Validated:** Content is validated against a schema defined in `src/content.config.ts`.
- **Plugin-Extensible:** Uses Starlight plugins for UI tweaks, page actions, and sidebar management.
## Layers
- Purpose: Stores all raw documentation and guides.
- Location: `src/content/docs/`
- Contains: Markdown (`.md`) and MDX (`.mdx`) files.
- Depends on: Frontmatter specifications.
- Used by: Starlight's `docsLoader`.
- Purpose: Orchestrates the build process and site behavior.
- Location: Root and `src/`
- Contains: `astro.config.mjs`, `tsconfig.json`, `package.json`.
- Depends on: Astro and Starlight dependencies.
- Used by: Astro Build Engine.
- Purpose: Renders content into accessible HTML.
- Location: Implicitly handled by `@astrojs/starlight`.
- Contains: Pre-built Starlight components and `src/styles/global.css`.
- Depends on: Content Layer.
## Data Flow
### Primary Content Path
## Key Abstractions
- Purpose: A way to organize and type-check content.
- Examples: `docs` collection in `src/content.config.ts`.
- Pattern: Astro Content Collections API.
- Purpose: Defines the navigation tree for the user.
- Examples: `sidebar` array in `astro.config.mjs`.
- Pattern: Configuration-as-Code.
## Entry Points
- Location: `astro.config.mjs`
- Triggers: Build time / Dev server start.
- Responsibilities: Initializes plugins, sets the site URL, and configures the navigation menu.
- Location: `src/content.config.ts`
- Triggers: Content processing phase.
- Responsibilities: Defines how the `docs` collection is loaded and validated.
## Architectural Constraints
- **Static Nature:** Since it's an SSG, any dynamic content must be handled via Client-side JS or rebuilt during deployment.
- **Starlight Dependency:** The site heavily relies on Starlight's routing and layout; breaking the Starlight directory convention will break the site.
- **Build Time:** As the number of documents in `src/content/docs/` grows, build times may increase.
## Error Handling
- **Schema Validation:** Errors in frontmatter trigger build failures, preventing broken pages from being deployed.
- **TypeScript Checking:** `tsconfig.json` ensures type safety for config files.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
