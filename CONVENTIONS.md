# Published Notes — Conventions

Working notes from the Pepa design process, published alongside the curated site
pages. This file governs how they are written and filed. It is a meta-doc — not
itself a published page, so it lives at the repo root, not under
`src/content/docs/`.

Rules here were mostly discovered by publishing, not decided in advance. Where a
rule was written first and then contradicted by what actually worked, the
practice won and this file was corrected.

## Placement

Sections, in the order they appear in the sidebar:

- `general/` — front-of-house pages: manifesto, use cases, about, legal
- `principles/` — a named principle, stated. Satisfying a principle does not
  make a document belong here; only stating one does
- `arms/<arm>/` — documents whose subject is one arm
- `beak/` — the infrastructure layer
- `reference/` — shared artifacts used across arms: fixtures, glossaries,
  the design system and style guide
- `fieldnotes/` — the work of finding out. Bench measurements and recon reports
  with verdicts. Evidence, not argument
- `media/` — video and visual material

Two placement rules were wrong when first written, and both were corrected by
looking at the content instead of applying a rule:

- A `head/` directory was specified for cross-arm notes. Nothing ever landed
  there. Version histories that looked cross-arm turned out to belong to a
  specific arm, and principle documents turned out to want a section of their
  own. `head/` remains available; it has not been needed.
- Genre was going to be a top-level directory (`recon/`). It became
  `fieldnotes/`, which covers both recon and bench work, because those two
  share a purpose even though their subjects differ.

When a document does not fit an existing section, look at the content again
before inventing a category. Both new sections that stuck — `principles/` and
`fieldnotes/` — came from noticing what a document *was for*, not what it was
about.

## Naming

- **Living** document → clean slug: `synthetic-fixtures.md`, `ontology.md`
- **Frozen** document (recon, incident — dated, never revised) → kind-prefixed:
  `recon-uc1-uc7-convergence.md`, `bench-sizing-psa-reasoning-arms.md`
- Arm version histories use the same filename in every arm:
  `arms/<arm>/version-history.md`

An earlier version of this file specified date-prefixed filenames
(`2026-08-25-...`) for frozen documents. That is **not** what was built. The
date lives in the title and in the body; the filename carries the *kind*, which
turned out to be more readable and sorts related documents together. The date is
never lost, only relocated.

Filenames are permanent public URLs. Never rename a published page. A title can
be changed at any time — the Reasoning Arm page is titled "The Reasoning Arm"
while living at `/version-history/`, deliberately, because it is mostly
architecture with history as one section.

## File format

`.md` by default. Use `.mdx` only when a page needs a component import — the
YouTube embed is currently the only case. MDX parses `{` and `<` in prose as
JSX, so a `.md` page converted to `.mdx` may break on content that was fine
before.

Notion's HTML table export (`<table header-row="true">`) does not render.
Convert tables to GFM pipe tables when porting, and say so on the page if the
document claims to be verbatim.

## Frontmatter

```yaml
title: ...
description: ...
template: doc
version: "0.21"      # optional; versioned living docs only
draft: false
```

`version` is a **quoted string**, always. Unquoted, YAML reads `0.21` as a float
and truncates it: a later `0.30` becomes `0.3` and `1.10` becomes `1.1`,
silently changing the version's meaning and sort order. Versions are
identifiers, not quantities. The schema enforces `z.string()` and caught exactly
this on the first versioned page.

No `topic:` — the sidebar-topics plugin is inert; don't feed it. No new taxonomy
fields. Resist the 347-type drift: a field earns its place when a real document
needs it, not before.

## Provenance badges

Every page carries the provenance labels defined in the
[Terms of Use](https://ai4aging.org/general/termsofuse/), which is the source of
truth for the vocabulary. Five values:

- **AI Generated** — content was AI generated
- **AI Assisted** — human content enhanced with AI
- **Human Curated** — AI-generated content reviewed and curated by the editor
- **Collaborative Mess** — human and AI both wrote substantive parts, and the
  seams aren't marked. Either or both can contain errors
- **No Badge** — purely human, or we missed it

`AI Generated` + `Human Curated` together is the common pair and is not a
contradiction. `Collaborative Mess` exists because that pair could not honestly
describe a page where raw human material, AI structuring, and human correction
are interleaved — the vocabulary grew a fifth value when it hit a case it could
not express. `No Badge` is a real category with real members, not an oversight.

Badges are raw HTML, because `.md` cannot run Starlight's `<Badge>` component:

```html
<p>
  <span class="a4a-badge collaborative-mess">Collaborative Mess</span>
</p>
```

Classes: `ai-generated`, `ai-assisted`, `human-curated`, `collaborative-mess`,
`neutral`. Styling lives in `src/styles/global.css`.

Each badge carries its own text label. That is load-bearing, not redundant:
amber and green are exactly the pair red-green color deficiency compresses, so
meaning must never depend on telling colors apart. This is style-guide rule 3.

## Append-only

Living documents change by commit; git is the history. Frozen documents —
anything in `fieldnotes/`, and any dated recon — are **not rewritten**. A
correction is struck with a dated note and appended, never edited in place. The
Sensory version history carries a struck-through wrong version number in public
for exactly this reason.

Open TODOs and self-flagged gaps stay in. They are the discipline showing its
work, not unfinished business to hide.

The distinction that matters: append-only protects *superseded reasoning*, not
typos. A transcription artifact from a Notion port is fixed silently, because
there is no decision history to preserve.

## Publishing

Land a new page with `draft: true` when the build is uncertain — it compiles but
stays invisible in production. Flip to `false` once verified. Straightforward
pages can publish directly; the draft step is a safety net, not a ritual.

Wire a new section's `autogenerate` sidebar line in the **same** commit as the
first non-draft page. Never point `autogenerate` at a directory whose only page
is a draft.

## Notion sources

A page published from Notion gets a stamp on the **Notion original**: a callout
naming the repo path and live URL, saying edit-in-git-not-here. Git is canonical
from that moment; the Notion page is retained as the pre-publication source.

Where the published copy is deliberately different from the Notion original —
redacted, de-identified, restructured — the stamp says so explicitly and says
**do not sync**. Two pages currently carry that warning.