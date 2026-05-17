<!-- refreshed: 2026-05-17 -->
# Architecture

**Analysis Date:** 2026-05-17

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Documentation Content                    │
│           `src/content/docs/**/*.md` / `*.mdx`             │
├────────────────┬───────────────────────┬────────────────────┤
│  Config Layer  │    Framework Layer    │    Asset Layer      │
│ `astro.config.mjs` │  `@astrojs/starlight` │   `src/assets/`    │
└───────┬───────┴─────────────┬─────────┴───────────┬─────────┘
        │                     │                    │
        ▼                     ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Astro Build Engine                       │
│         `static site generation (SSG)`                      │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                      Static Web Output                      │
│                      `dist/` (generated)                    │
└─────────────────────────────────────────────────────────────┘
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

**Overall:** Static Site Generation (SSG) using a Content-First approach.

**Key Characteristics:**
- **Content-Driven:** The site structure is primarily derived from the filesystem layout in `src/content/docs/`.
- **Schema-Validated:** Content is validated against a schema defined in `src/content.config.ts`.
- **Plugin-Extensible:** Uses Starlight plugins for UI tweaks, page actions, and sidebar management.

## Layers

**Content Layer:**
- Purpose: Stores all raw documentation and guides.
- Location: `src/content/docs/`
- Contains: Markdown (`.md`) and MDX (`.mdx`) files.
- Depends on: Frontmatter specifications.
- Used by: Starlight's `docsLoader`.

**Configuration Layer:**
- Purpose: Orchestrates the build process and site behavior.
- Location: Root and `src/`
- Contains: `astro.config.mjs`, `tsconfig.json`, `package.json`.
- Depends on: Astro and Starlight dependencies.
- Used by: Astro Build Engine.

**Presentation Layer:**
- Purpose: Renders content into accessible HTML.
- Location: Implicitly handled by `@astrojs/starlight`.
- Contains: Pre-built Starlight components and `src/styles/global.css`.
- Depends on: Content Layer.

## Data Flow

### Primary Content Path

1. **Source:** User creates/edits a file in `src/content/docs/` (`.md` or `.mdx`).
2. **Validation:** `src/content.config.ts` validates the file against the `docsSchema` (extended by `topicSchema`).
3. **Routing:** Astro maps the file path to a URL based on the directory structure.
4. **Rendering:** Starlight injects the content into the documentation template, applying styles from `src/styles/global.css`.
5. **Output:** The site is built into static HTML files in the `dist/` folder.

## Key Abstractions

**Content Collections:**
- Purpose: A way to organize and type-check content.
- Examples: `docs` collection in `src/content.config.ts`.
- Pattern: Astro Content Collections API.

**Sidebar Configuration:**
- Purpose: Defines the navigation tree for the user.
- Examples: `sidebar` array in `astro.config.mjs`.
- Pattern: Configuration-as-Code.

## Entry Points

**Astro Config:**
- Location: `astro.config.mjs`
- Triggers: Build time / Dev server start.
- Responsibilities: Initializes plugins, sets the site URL, and configures the navigation menu.

**Content Config:**
- Location: `src/content.config.ts`
- Triggers: Content processing phase.
- Responsibilities: Defines how the `docs` collection is loaded and validated.

## Architectural Constraints

- **Static Nature:** Since it's an SSG, any dynamic content must be handled via Client-side JS or rebuilt during deployment.
- **Starlight Dependency:** The site heavily relies on Starlight's routing and layout; breaking the Starlight directory convention will break the site.
- **Build Time:** As the number of documents in `src/content/docs/` grows, build times may increase.

## Error Handling

**Strategy:** Build-time validation.

**Patterns:**
- **Schema Validation:** Errors in frontmatter trigger build failures, preventing broken pages from being deployed.
- **TypeScript Checking:** `tsconfig.json` ensures type safety for config files.

## Cross-Cutting Concerns

**Logging:** Handled by the Astro CLI during build/dev.
**Validation:** Performed by `docsSchema` in `src/content.config.ts`.
**Authentication:** Not applicable (Public static site).

---

*Architecture analysis: 2026-05-17*
