---
title: Style Guide
description: Every visual decision ai4aging.org makes on one page — colors, type, spacing, and eight rules. The live swatches read the site's own variables.
template: doc
sidebar:
  label: Style Guide
  badge:
    text: New
    variant: tip
draft: false
---

<p>
  <span class="a4a-badge ai-generated">AI Generated</span>
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

<style>
.sg-ladder { display:flex; border-radius:10px; overflow:hidden; border:1px solid var(--sl-color-gray-5); margin-top:1rem; }
.sg-ladder div { flex:1; height:64px; }
.sg-labels { display:flex; margin-top:6px; }
.sg-labels span { flex:1; text-align:center; font-family:var(--sl-font-mono); font-size:10px; color:var(--sl-color-gray-3); }
.sg-live { display:flex; gap:10px; flex-wrap:wrap; margin:1rem 0; }
.sg-live figure { margin:0; flex:1 1 130px; }
.sg-live .sg-chip { height:56px; border-radius:10px; border:1px solid var(--sl-color-gray-5); }
.sg-live figcaption { font-family:var(--sl-font-mono); font-size:11px; color:var(--sl-color-gray-3); margin-top:5px; word-break:break-all; }
.sg-swatch { display:inline-block; width:1.1em; height:1.1em; border-radius:4px; vertical-align:-0.2em; margin-right:0.4em; border:1px solid var(--sl-color-gray-5); }
.sg-bar { display:inline-block; height:16px; border-radius:3px; background:var(--sl-color-accent); vertical-align:middle; }
</style>

Every visual decision this site makes is on this sheet. If it isn't here, it
isn't decided. The reasoning behind it is on the [Design System](/reference/design-system/) page.

The **Live wiring** swatches below read the site's own CSS variables rather than
copies of them, so they cannot drift from what the site actually renders — and
they change when you flip the theme toggle. Everything else on this page is the
source palette: a set of values to select from, not values the site reads
directly.

## Live wiring

What the theme is using right now, in the mode you are viewing. Flip the theme
toggle and these change; the hex captions do not update, but the colors do.

<div class="sg-live">
  <figure><div class="sg-chip" style="background:var(--sl-color-accent-low)"></div><figcaption>--sl-color-accent-low</figcaption></figure>
  <figure><div class="sg-chip" style="background:var(--sl-color-accent)"></div><figcaption>--sl-color-accent</figcaption></figure>
  <figure><div class="sg-chip" style="background:var(--sl-color-accent-high)"></div><figcaption>--sl-color-accent-high</figcaption></figure>
  <figure><div class="sg-chip" style="background:var(--sl-color-gray-2)"></div><figcaption>--sl-color-gray-2 · body text</figcaption></figure>
  <figure><div class="sg-chip" style="background:var(--sl-color-gray-3)"></div><figcaption>--sl-color-gray-3 · secondary</figcaption></figure>
  <figure><div class="sg-chip" style="background:var(--sl-color-gray-6)"></div><figcaption>--sl-color-gray-6 · hairline</figcaption></figure>
</div>

Only ten values per mode are wired. Starlight takes three accents and seven grays
(six in dark mode), not the full eleven-step ladder — and it inverts the gray
scale between modes. The ladders below are the palette those ten are chosen from.

| Slot | Light | Dark | Used for |
|---|---|---|---|
| `--sl-color-accent-low` | Ocean 100 | Ocean 900 | Aside tints, subtle fills |
| `--sl-color-accent` | Ocean 600 | Ocean 500 | Links, buttons, focus rings |
| `--sl-color-accent-high` | Ocean 800 | Ocean 200 | Link text — inverts by mode |
| `--sl-color-gray-2` | Slate 700 | Slate 300 | Body copy |
| `--sl-color-gray-3` | Slate 600 | Slate 400 | Secondary text |
| `--sl-color-gray-6` | Slate 200 | Slate 800 | Hairline dividers |

## Ocean — the brand color

Lifted from the octopus's body. Links, active nav, focus rings.
**600 (`#1a7191`)** is the working color in light mode. **500 (`#238bad`)** is the
one you'd name if someone asked "what teal is Pepa?"

<div class="sg-ladder">
<div style="background:#f0f9fb"></div><div style="background:#dcf1f5"></div><div style="background:#b3e0ea"></div><div style="background:#7fc7dc"></div><div style="background:#4aabc7"></div><div style="background:#238bad"></div><div style="background:#1a7191"></div><div style="background:#135773"></div><div style="background:#0f425c"></div><div style="background:#0b3247"></div><div style="background:#082433"></div>
</div>
<div class="sg-labels"><span>50</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>700</span><span>800</span><span>900</span><span>950</span></div>

## Slate — the grays

Backgrounds, borders, body copy. Not neutral: every step carries a little blue so
nothing falls outside the ocean family. Body text sits at **700**, quiet
secondary text at **600** — not lighter, it stops being readable. Hairline
dividers at **200**, visible borders at **500**.

<div class="sg-ladder">
<div style="background:#f7fafb"></div><div style="background:#eef2f4"></div><div style="background:#dde5e9"></div><div style="background:#bdcad1"></div><div style="background:#93a5b0"></div><div style="background:#6b8290"></div><div style="background:#4a6270"></div><div style="background:#304754"></div><div style="background:#203542"></div><div style="background:#142530"></div><div style="background:#0b161d"></div>
</div>
<div class="sg-labels"><span>50</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>700</span><span>800</span><span>900</span><span>950</span></div>

## The warm accents

Used rarely and on purpose.

- <span class="sg-swatch" style="background:#e59a2a"></span> **Amber `#e59a2a`** — the brain gold and the CasaDelta bulb. Exactly one element per screen: the single most important action. Text on it is always ink (`#0a222f`), never white.
- <span class="sg-swatch" style="background:#e07330"></span> **Coral `#e07330`** — CasaDelta's orange. Reserve stock, present so it exists when you need it.
- <span class="sg-swatch" style="background:#74a852"></span> **Seagrass `#74a852`** — the green suction-cup dot. Reserve stock.

## Asides

The most-used pattern on the site. Starlight tints these from the accent color,
so they follow Ocean automatically and are not restyled here.

:::note
Pepa is infrastructure. If the network is flaky, everything else is noise.
:::

:::tip
Bare metal HAOS is faster, more resilient, and easier to manage than Docker.
:::

:::caution
Voice is not typing. It will break things. That's the point.
:::

:::danger
Painful $ mistakes were made.
:::

## Type

Three faces, all self-hosted. One serif for voice, one sans for reading, one mono
for machines. These samples render in the site's real fonts — if one looks wrong
here, it is wrong everywhere.

<p style="font-family:var(--pepa-display); font-size:32px; line-height:1.2; margin:0.5rem 0 0;">Pepa remembers your life's digital traces</p>
<p style="font-family:var(--sl-font-mono); font-size:11px; color:var(--sl-color-gray-3); margin:4px 0 1.5rem;">LORA — headings, the manifesto voice</p>

<p style="font-size:17px; max-width:62ch; margin:0.5rem 0 0;">At 65, I recognized that the tools I'd need in fifteen years didn't exist yet in a form I could trust — so I started building them in my own house, where I'm patient zero.</p>
<p style="font-family:var(--sl-font-mono); font-size:11px; color:var(--sl-color-gray-3); margin:4px 0 1.5rem;">FIGTREE — body and UI, 17px base</p>

<p style="font-family:var(--sl-font-mono); font-size:15px; margin:0.5rem 0 0;">--sl-color-accent: #1a7191;</p>
<p style="font-family:var(--sl-font-mono); font-size:11px; color:var(--sl-color-gray-3); margin:4px 0 0;">IBM PLEX MONO — configs, schemas, homelab detail</p>

## Size scale

Body is 17px, not 16. One notch above web default — the single most useful
accessibility decision on the site.

<p style="font-family:var(--pepa-display); font-size:44px; line-height:1.2; margin:0.6rem 0;">Display · 44px</p>
<p style="font-family:var(--pepa-display); font-size:34px; line-height:1.2; margin:0.6rem 0;">Page title · 34px</p>
<p style="font-family:var(--pepa-display); font-size:28px; line-height:1.2; margin:0.6rem 0;">Section · 28px</p>
<p style="font-size:22px; font-weight:600; margin:0.6rem 0;">Subsection · 22px</p>
<p style="font-size:19px; margin:0.6rem 0;">Lede paragraph · 19px</p>
<p style="font-size:17px; margin:0.6rem 0;">Body copy, the default · 17px</p>
<p style="font-size:15px; color:var(--sl-color-gray-3); margin:0.6rem 0;">Secondary / captions · 15px</p>
<p style="font-size:13px; color:var(--sl-color-gray-3); margin:0.6rem 0;">Labels, badges · 13px</p>

## Spacing

Multiples of 4. Nothing else. If a gap doesn't come off this list, it's a mistake.

<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:4px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">4</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:8px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">8</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:12px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">12</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:16px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">16</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:24px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">24</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:32px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">32</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:48px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">48</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:64px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">64</span></p>
<p style="margin:0.6rem 0;"><span class="sg-bar" style="width:96px"></span> <span style="font-family:var(--sl-font-mono); font-size:12px;">96</span></p>

## The rules

Eight. If you remember nothing else on this page, remember these.

1. **Headings in Lora, body in Figtree at 17px.** Never shrink the body text to fit more in.
2. **Amber marks exactly one thing per screen.** The moment there are two, neither is the important one.
3. **Never use color alone** to say what something means. Color plus a word, or color plus a shape.
4. **Check contrast before you ship a color.** 4.5:1 for text. The readers are older; this is not a nicety.
5. **No bounce, no spring, no delight-animation.** 120–240ms, standard easing. Nothing here should startle anyone.
6. **Corners are soft** — 10px on controls, 16px on cards. Tide-worn, never sharp.
7. **Shadows are ocean ink, never black**, and barely there.
8. **Label AI involvement on every page that has it.** An editorial trust signal, not decoration — and the one thing this brand can't be sloppy about.

Rule 3 is why the provenance badges at the top of this page carry text and not
just a color. Amber and green are precisely the pair that red-green color
deficiency compresses; the label is what carries the meaning.