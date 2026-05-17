# Codebase Structure

**Analysis Date:** 2026-05-17

## Directory Layout

```
[project-root]/
├── .astro/                 # Astro generated cache and fonts
├── dist/                   # Final build output (generated)
├── import/                 # Archive of Notion exports (legacy/source)
├── public/                 # Static assets served at root
├── src/
│   ├── assets/             # Site images and logos
│   ├── content/
│   │   └── docs/           # Primary documentation source
│   │       ├── arms/       # Component-specific guides (Automation, Knowledge, etc)
│   │       ├── beak/       # Beak-related documentation
│   │       ├── general/     # High-level docs (Manifesto, Privacy, etc)
│   │       ├── head/       # Core architecture documentation
│   │       └── reference/   # Technical references and reading lists
│   ├── pages/              # Custom routes (e.g., robots.txt)
│   └── styles/             # Global CSS overrides
├── astro.config.mjs        # Main Astro/Starlight configuration
├── package.json            # Project dependencies and scripts
└── src/content.config.ts   # Content collection definitions
```

## Directory Purposes

**`src/content/docs/`:**
- Purpose: The single source of truth for all site content.
- Contains: `.md` and `.mdx` files.
- Key files: `general/manifesto.mdx`, `head/CognitiveAssistanceArchitecture.mdx`.

**`src/assets/`:**
- Purpose: Stores images and graphics used within the documentation.
- Contains: `.png`, `.jpg`, `.svg`.
- Key files: `Pepa_Logo_v0_NoBG.png`, `cognitive-assistance-architecture.png`.

**`src/pages/`:**
- Purpose: Definitive routes that sit outside the Starlight documentation structure.
- Contains: `.ts` or `.astro` files.
- Key files: `robots.txt.ts`.

**`import/`:**
- Purpose: A storage area for original Notion exports used to populate the site.
- Contains: `.md`, `.csv`, `.png`.
- Status: Not part of the active build process.

## Key File Locations

**Entry Points:**
- `astro.config.mjs`: Main site config and sidebar definition.
- `src/content.config.ts`: Content schema for the `docs` collection.

**Configuration:**
- `package.json`: Scripts and dependencies.
- `tsconfig.json`: TypeScript configuration.

**Core Logic:**
- The logic is primarily declarative, residing in `astro.config.mjs`.

**Testing:**
- Not detected.

## Naming Conventions

**Files:**
- Content files: Use `kebab-case` or `PascalCase` (observed inconsistency in `src/content/docs/`, e.g., `manifesto.mdx` vs `CognitiveAssistanceArchitecture.mdx`).
- config files: `*.config.ts` or `*.config.mjs`.

**Directories:**
- Content categories: Lowercase folders within `src/content/docs/` (e.g., `arms`, `beak`, `general`).

## Where to Add New Code

**New Documentation Page:**
- Primary code: `src/content/docs/[category]/[filename].md` or `.mdx`.
- Note: Update the `sidebar` in `astro.config.mjs` if the page is not in a directory configured for `autogenerate`.

**New Image/Asset:**
- Implementation: `src/assets/[filename]`. Reference via relative paths in Markdown.

**New Global Style:**
- Implementation: `src/styles/global.css`.

**New Custom Route:**
- Implementation: `src/pages/[route].ts` or `.astro`.

## Special Directories

**`.astro/`:**
- Purpose: Internal Astro cache.
- Generated: Yes.
- Committed: No.

**`dist/`:**
- Purpose: Final production build.
- Generated: Yes.
- Committed: No.

---

*Structure analysis: 2026-05-17*
