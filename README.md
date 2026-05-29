# sergiogalaviz.com

Personal landing page for Sergio Galaviz — Full-Stack Developer, Builder, Problem Solver.

**Live:** [sergiogalaviz.com](https://sergiogalaviz.com)

---

## Overview

A single-page personal site designed around the aesthetic of an **80s concept car dashboard** — specifically the all-green phosphor VFD/LCD instrument clusters found in cars like the Pontiac 6000 STE and early Buick Riviera. The page functions as a digital business card: who I am, what I build, and how to reach me.

No frameworks. No build step. Pure HTML, CSS, and vanilla JS.

---

## Project Structure

```
sergiogalaviz.com/
├── index.html        # Markup and layout
├── css/
│   └── main.css      # All styles and design tokens
├── js/
│   └── main.js       # Clock, uptime, geolocation
├── README.md         # This file
└── CLAUDE.md         # AI assistant context
```

---

## Style Guide

### Aesthetic Direction

**80s concept car dashboard / phosphor CRT monitor.**

The design evokes the instrument clusters of late-70s and early-80s concept and luxury cars — a moment when automotive designers imagined the future as an array of glowing green LCD segments, arc gauges, and segmented displays, all set against near-total darkness. References include the Pontiac 6000 STE dashboard, Japanese Dekotora truck lighting culture, and DAW sequencer UI layouts.

Every design decision should reinforce this world: information density over decoration, glow over flat color, monospace type over humanist, dark over light.

---

### Color Tokens

All colors are defined as CSS custom properties in `:root` inside `css/main.css`.

| Token       | Value     | Usage                                      |
|-------------|-----------|--------------------------------------------|
| `--black`   | `#020704` | Page background                            |
| `--deep`    | `#050f08` | Deepest surfaces                           |
| `--panel`   | `#0a1a0f` | Widget/card backgrounds                    |
| `--g0`      | `#001a05` | Bar track backgrounds, grid lines          |
| `--g1`      | `#00ff6a` | Primary text, hero name, clock — brightest |
| `--g2`      | `#00c952` | Secondary highlights, bar fills            |
| `--g3`      | `#00783a` | Muted text, taglines, sub-labels           |
| `--g4`      | `#004d26` | Very muted labels, widget labels           |
| `--g5`      | `#003018` | Borders, dividers                          |
| `--amber`   | `#ffb700` | Availability indicator, accent status      |
| `--red`     | `#ff2244` | Reserved for error/alert states            |

**Rule:** Never introduce a new color outside these tokens. If a new shade is needed, add it as a token first.

---

### Glow System

Three glow levels are predefined as box-shadow / text-shadow values:

| Token        | Spread  | Usage                                        |
|--------------|---------|----------------------------------------------|
| `--glow-sm`  | Tight   | Status dots, small interactive elements      |
| `--glow-md`  | Medium  | Widget values, nav link hover states         |
| `--glow-lg`  | Wide    | Hero name, clock, any featured VFD readout   |

Always use the glow tokens rather than writing raw shadow values inline.

---

### Typography

Three typefaces, each with a specific role:

| Family            | Role                                                    |
|-------------------|---------------------------------------------------------|
| `Orbitron`        | Display / instrument readouts — hero name, clock, values |
| `Share Tech Mono` | Body / UI text — labels, status bar, nav links          |
| `Rajdhani`        | Tagline / sub-display — thin, wide-tracked descriptors  |

**Rules:**
- `Orbitron` is only for primary values and the hero name. Never use it for body copy.
- All text should be `uppercase` or rendered in a way that reads as such.
- Letter-spacing is deliberately wide throughout (0.1em–0.35em). Do not reduce it.
- Never introduce a fourth typeface.

---

### Layout

The page uses a **CSS Grid cockpit** with three columns and three rows:

```
[ top bar                                    ]   ← full-width, auto height
[ left panel ] [ center / hero ] [ right panel ]   ← 220px · 1fr · 220px
[ bottom bar                                 ]   ← full-width, fixed height
```

- Left and right panels contain instrument widgets.
- Center contains the identity: name, tagline, nav links.
- Top and bottom bars contain status and metadata.
- The entire layout is `overflow: hidden` on desktop — it must fit one screen.

---

### CRT Overlay Stack

Three pseudo/overlay layers sit above all content (z-index 997–999):

1. **Scanlines** (`body::before`) — repeating 2px/2px dark lines
2. **Vignette** (`body::after`) — radial gradient darkening the corners
3. **Noise** (`.noise` div) — SVG fractal noise at 4% opacity for analog texture

These must remain in place. They are core to the aesthetic, not decoration.

---

### Animation Principles

- All entry animations use `fadeUp` (opacity + translateY) with staggered `animation-delay`.
- The `barIn` animation (scaleX from 0) fires on page load for all bar fills.
- The `gaugeIn` SVG animation fires on load for the arc gauge.
- The `ticker` scrolls the tech stack horizontally across the bottom bar in a seamless loop.
- The `pulse` animation blinks status dots at different phases.

**Rule:** Keep animations subtle and load-triggered. No looping motion except the ticker and pulse dots. The page should feel like an instrument panel powering on — one boot sequence, then stable.

---

### Widget Pattern

All side-panel items follow the `.widget` pattern:

```html
<div class="widget">
  <div class="widget-label">// LABEL TEXT</div>
  <!-- content -->
</div>
```

- Labels always start with `//` and are `var(--g4)` colored.
- The `::before` pseudo-element adds a gradient top highlight line.
- Padding is `14px 16px`.

---

## Live Instruments

### Clock (`#clock`, `#datestr`)
Updated every second via `setInterval` in `js/main.js`. Displays local time in `HH:MM:SS` and date in `DAY DD MON YYYY` format.

### Uptime (`#uptime`)
Counts seconds since page load. Resets on refresh — intentional, analogous to a vehicle ignition.

### Coordinates (`#coords`)
Shows latitude/longitude. Priority order:
1. Real GPS via `navigator.geolocation` (shown immediately if permission granted)
2. Mouse-position-mapped coordinates as a fallback (maps cursor position to a lat/lng range)

---

## Deployment

The site is hosted on **Vercel** and served via the custom domain `sergiogalaviz.com` (DNS managed through Cloudflare).

### Deploy manually
```bash
vercel --prod
```

### Deploy via Git
Push to `main` on GitHub — Vercel auto-deploys on every push.

---

## Customisation Checklist

When updating personal details, change these specific things:

- `index.html` — nav link `href` values (email, GitHub, LinkedIn, résumé URL)
- `index.html` — location widget text and coordinates if location changes
- `index.html` — bar fill percentages and labels in the Stack widget
- `index.html` — current project name, deploy/test percentages in right panel
- `index.html` — ticker tech stack items in the bottom bar
- `css/main.css` — no changes needed for content updates

---

## Browser Support

Targets modern evergreen browsers. The `mask-image` on `.grid-bg` requires a webkit prefix for older Safari — add `-webkit-mask-image` if needed.

No polyfills required. No build tooling. Open `index.html` directly in a browser to develop.
