---
title: Design System
description: Why ai4aging.org looks the way it does — the Ocean palette, the type, and the rules. The reasoning behind the style guide.
template: doc
sidebar:
  label: Design System
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

The rules in words. The [Style Guide](/reference/style-guide/) is the same
information as a picture; this page is why.

Everything the site looks like lives in one file, `src/styles/global.css`.
Change a value there and it changes everywhere. That was true in Ventura Publisher in
1986 and it is the only reason any of this exists.

## The decisions

**Ocean is the brand.** A teal taken from the octopus's body. Links, active
navigation, focus rings.

**Slate is the gray, and it isn't neutral.** Every step carries a little blue so
the grays stay in the same family as the teal. Put it beside a true gray and the
difference is obvious.

**Amber is the one loud thing.** The octopus's brain, the CasaDelta bulb. It
marks the single most important action on a screen. One per screen — two ambers
means zero ambers.

**Body copy is 17px, not 16.** One notch above the web default. Of everything on
this list, this is the decision that does the most work for the actual audience.

**Motion is calm.** 120–240ms, standard easing, no bounce, no spring, nothing
that pops. Calm Technology taken literally: nothing here should startle a
78-year-old.

**Corners are soft, shadows are ocean ink.** 10px on controls, 16px on cards.
Shadows tinted `rgba(11, 50, 71, …)`, never pure black, and barely visible.

**Fonts are self-hosted.** Lora, Figtree and IBM Plex Mono ship from this origin
as static files, installed through Fontsource. Loading them from a CDN would
hand every visitor's IP address to a third party on every page load, from a site
whose manifesto is about local-first and no cloud dependencies. Self-hosting is
also more robust: the page doesn't depend on someone else being reachable.

## What the first draft got wrong

This is recorded rather than quietly fixed, because each mistake is the kind
that looks like success.

**The theme was written in a syntax this project doesn't compile.** The original
specified a Tailwind `@theme { --color-accent-500: … }` block. The project has no
Tailwind — no `tailwindcss`, no `@tailwindcss/vite`, no
`@astrojs/starlight-tailwind` — so the browser met an unknown at-rule and skipped
it. Every variable in it computed empty. The site had been serving Starlight's
factory indigo (`#3d50f5`) the entire time, while a yellow-green nobody chose sat
inert in the stylesheet. Both the "current" color the draft set out to replace
and the replacement itself were invisible.

The fix was to write the same values onto the properties Starlight actually
reads: `--sl-color-accent-low/-accent/-accent-high` and `--sl-color-gray-1`
through `-7`.

**Dark mode was not free.** The draft claimed that defining eleven-step ladders
let Starlight derive both themes automatically. It does not. Two blocks are
written by hand, and the light one is *inverted* — Starlight numbers grays from
"closest to the text" to "closest to the background," so `gray-1` is the lightest
on a dark page and the darkest on a light one, `white` and `black` swap meanings,
and light mode carries a seventh gray that dark mode has no use for. The accent
inverts too: the link color has to be a pale rung on dark and a deep rung on
light, or links become unreadable in one of the two.

The eleven-step ladders are still the right source of truth. They are a palette
to select from, not a thing that maps itself.

**The serif nearly didn't appear at all.** The heading rule targeted
`.sl-markdown-content h1, h2, h3`. Starlight renders the page title *outside*
that container, so the title fell through to the body font. The rule now also
targets `h1#_top` — the id Starlight gives the page title, and what the
"Overview" entry in the table of contents links to. Never target the `astro-*`
scoped class instead; that hash is regenerated whenever the component changes.

Worth noticing what these three have in common. None produced an error. A missing
serif falls back to Georgia, which is also a serif. A missing sans falls back to
the system face, which is also clean. An uncompiled theme leaves a default that
looks deliberate. Everything failed into something plausible — which is the same
failure class the rest of this project is built to catch.

**Several colors were also failing contrast** in the first pass, the aside labels
worst at 2.9:1 against their own backgrounds where 4.5:1 is the floor. On a site
written for older readers that is the one thing you can't hand-wave. Corrected;
every value now in use has been checked.

## What isn't here, on purpose

The first pass had about ninety files: twelve React components, TypeScript
definitions, a lint config, a build manifest, and a mock-up of the docs site.

Most of it solved a problem this project doesn't have. Those components were
built for a React app; this site is Astro/Starlight, which already ships its own
buttons, asides, badges, cards and tabs. The hand-built `Callout` was a copy of
an `<Aside>` that comes free in the box.

Add a component back when you have written the same markup by hand three times
and you are tired of it. Not before. A design system earns its keep by removing
decisions, and every part that isn't pulling that weight is just more surface to
maintain.