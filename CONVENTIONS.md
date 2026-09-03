# Published Notes — Conventions

Working notes from the Pepa design process, published as reference alongside
the curated site pages. This file governs how they are written and filed.
It is a meta-doc — not itself a published page, so it lives at the repo root,
not under `src/content/docs/`.

## What these are

Raw-ish engineering notes — recon, evaluations, design ledgers — promoted from
the private workspace. Lower polish than a curated page, higher signal than
nothing. Because notes share directories with curated pages, a reader tells them
apart by the **status badge** (below).

## Placement (arm-first)

- `arms/<arm>/` — note specific to one arm (e.g. `arms/memory/`)
- `head/` — cross-arm notes; the thing they share is the Head
- `reference/` — shared artifacts used by every arm (fixtures, primers, glossaries)

Genre is not a directory. It rides in the badge and, for frozen docs, the filename.

## Naming

- **Living** note → clean slug: `synthetic-fixtures.mdx`, `memory-scheme-roster.mdx`
- **Frozen** note (recon/incident — dated, never revised) → date-prefixed:
  `2026-08-25-digital-preservation.mdx`

Filenames are permanent public URLs. Never rename a published note. Corrections
are new commits (living) or a new dated file (frozen) — never a silent edit.

## Frontmatter

```yaml
title: ...
description: ...
template: doc
version: "0.21"      # optional; versioned living docs only.
                     # Source of truth for the version — git carries the history.
```

`version` is a **quoted string**, always. Unquoted, YAML reads `0.21` as a
float and truncates it: a later `0.30` becomes `0.3` and `1.10` becomes `1.1`,
silently changing the version's meaning and sort order. Versions are identifiers,
not quantities — quote them.

No `topic:` — the sidebar-topics plugin is inert; don't feed it. No new taxonomy
fields. Resist the 347-type drift: a field earns its place when a real note needs
it, not before.

## Status badge — the only signal that a page is a note

First line of the body, after the `Badge` import:

- Living → `<Badge text="Working Note" variant="note"/>`
- Frozen → `<Badge text="Frozen YYYY-MM-DD" variant="tip"/>`
- Superseded → `<Badge text="Superseded" variant="danger"/>` + a link to the successor

Version, when it matters, lives in frontmatter only — never repeated in the badge,
so nothing can drift out of sync.

## Append-only

Living notes change by commit (and a `version` bump if versioned); git is the
history. Frozen notes are never edited — supersede with a new file. Open TODOs and
self-flagged gaps stay in: they are the discipline showing its work, not unfinished
business to hide.

## Publishing gate

Land a new note with `draft: true` — it builds but stays invisible. Flip to `false`
only after the build is verified. Wire a new arm's `autogenerate` sidebar line in
the **same** change as the draft-flip — never point `autogenerate` at a directory
whose only page is still a draft.