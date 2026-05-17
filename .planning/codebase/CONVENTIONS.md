# Coding Conventions
Date: 2026-05-17

## Overview
The project is a documentation-driven site built with Astro and Starlight. The codebase is primarily composed of content files (Markdown/MDX) with minimal TypeScript configuration.

## Style & Patterns
- **Language**: TypeScript (ESM).
- **Content Structure**: Follows Starlight's directory-based routing in `src/content/docs/`.
- **Naming**:
  - Files use `kebab-case` for URLs and content files.
  - Component/config files use `camelCase` or `PascalCase`.
- **Formatting**: Standard TypeScript formatting.

## Error Handling
As a static site generator, error handling is primarily focused on:
- **Build-time validation**: Astro's content layer ensures schema validity for content collections.
- **Type Safety**: TypeScript is used for configuration files (e.g., `src/content.config.ts`).

## Key Patterns
- **Content-First**: Logic is decoupled from content. Most "behavior" is defined by Starlight's plugin system and configuration.
- **Static Generation**: The site is pre-rendered, minimizing runtime error surfaces.
