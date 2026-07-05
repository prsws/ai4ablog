# AI4Aging.org Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Version](https://img.shields.io/badge/version-20260320-blue.svg)](https://github.com/prsws/ai4ablog/releases)
[![Build Status](https://github.com/aradlein/hass-agent-llm/workflows/CI/badge.svg)](https://github.com/prsws/pepa-arm-ha/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A personal documentation site built with Astro and Starlight for organizing and publishing reference material, guides, and topic-based articles.

## Overview

This site is structured as a documentation hub for curated content and notes, with sections that can cover:

- general reference material
- practical guides
- topic-specific documentation
- personal or project-related articles

It uses Astro + Starlight for content-driven publishing with a clean documentation layout.

## Project Structure
```
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/ 
│   ├── pages/ 
│   ├── styles/ 
│   └── content.config.ts 
├── astro.config.mjs 
├── package.json 
├── package-lock.json 
├── tsconfig.json 
└── README.md
```
## Content Organization

Content lives primarily in `src/content/docs/` and is grouped by topic. Current structure includes areas such as:

- general
- guides
- reference
- head
- beak
- arms

Each section can be expanded with new documents, navigation structure, and frontmatter metadata.

## Development

Install dependencies:
```bash npm install```

Start the development server:```bash npm run dev``` 

Build the site for production:```bash npm run build```

Preview the production build locally:```bash npm run preview``` 

## Version Control Notes

Commit source content and configuration, including:

- `src/`
- `public/`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `README.md`

Do not commit generated or local-only files such as:

- `dist/`
- `.astro/`
- `node_modules/`
- `.idea/`
- machine-specific editor state or local environment files

## License

Refer to the [LICENSE](LICENSE.md).
