# CLAUDE.md — sergiogalaviz.com

Context and instructions for AI assistants working on this project.

---

## What This Project Is

A static personal landing page for **Sergio Galaviz**, a full-stack developer based in Mexico City. It is a single HTML page with separated CSS and JS — no framework, no bundler, no dependencies beyond Google Fonts.

**Aesthetic:** 80s concept car dashboard. Phosphor green VFD/LCD on near-black. CRT scanlines and vignette overlays. Monospace and geometric display fonts. The page should always feel like an instrument panel powering on.

---

## File Map

| File              | Purpose                                               |
|-------------------|-------------------------------------------------------|
| `index.html`      | All markup. Layout, widgets, SVG gauge, ticker        |
| `css/main.css`    | All styles. Design tokens, layout, animations, CRT FX |
| `js/main.js`      | Clock, uptime counter, geolocation / mouse coords     |
| `README.md`       | Style guide and architecture reference                |
| `CLAUDE.md`       | This file                                             |

---

## Design Rules (Strictly Enforced)

1. **Color tokens only.** Never write a raw hex or RGB value outside `:root` in `main.css`. All colors must reference a `--token`.

2. **Three fonts, no more.** Orbitron (display/instruments), Share Tech Mono (UI/labels), Rajdhani (taglines). Do not add a fourth.

3. **Three glow levels.** `--glow-sm`, `--glow-md`, `--glow-lg`. Use these for all text-shadow and box-shadow glow effects.

4. **CRT overlays stay.** The scanline (`body::before`), vignette (`body::after`), and noise (`.noise`) layers must not be removed or reduced — they are load-bearing aesthetic elements.

5. **One screen on desktop.** The layout is `overflow: hidden` at full viewport. No scrolling on desktop. All content must fit within 100vh.

6. **Animation = boot sequence.** Entry animations fire once on load with staggered delays. The only persistent animations are the ticker scroll and the status dot pulse. Do not add looping animations to other elements.

7. **Widget label convention.** All widget labels start with `//` and use `var(--g4)` color and `letter-spacing: 0.2em`. Don't break this pattern.

8. **No frameworks.** Do not introduce React, Vue, Tailwind, or any NPM dependency. This project is intentionally zero-tooling.

---

## Tone and Voice

- All visible text is uppercase or treated as such.
- Labels and status indicators use terse, instrument-panel language: `ONLINE`, `OPEN TO WORK`, `SYSTEMS NOMINAL`, `MEX CITY`, `BUILDER`.
- No full sentences in the UI. No punctuation except `·` as a separator and `//` as a label prefix.
- The personality is confident, technical, minimal.

---

## Common Tasks

### Update a nav link
Edit the `href` attribute on the relevant `.nav-link` anchor in `index.html`.

### Change the current project widget
Find the right panel widget with `// CURRENT PROJECT` label and update the project name, sub-label, and the two bar-fill widths + `bar-pct` values.

### Update stack bars
In the left panel widget `// STACK · PROFICIENCY`, update each `.bar-fill` `width` percentage and the corresponding `.bar-pct` text.

### Add a new widget
Follow the `.widget` pattern:
```html
<div class="widget">
  <div class="widget-label">// NEW LABEL</div>
  <!-- content using widget-value, widget-sub, etc. -->
</div>
```
Add it to `.panel-left` or `.panel-right`. Adjust `gap` if needed but do not let the panel overflow the viewport.

### Add a new color
Define it in `:root` in `main.css` with a descriptive name. Do not write it inline in HTML or JS.

---

## What to Preserve When Refactoring

- The three-column CSS Grid structure (`.cockpit`)
- The `.noise` div immediately after `<body>`
- The `body::before` and `body::after` CRT pseudo-elements
- The `@keyframes gaugeIn` definition (lives in `main.css` but is referenced by an SVG `style` attribute in `index.html`)
- The staggered `animation-delay` on `.panel-left > *` and `.panel-right > *`
- The seamless ticker loop (two identical copies of the content side-by-side)

---

## Deployment Context

- Hosted on **Vercel**, auto-deployed from the `main` branch of the GitHub repo `sergiogalaviz.com`.
- Domain `sergiogalaviz.com` DNS is managed through **Cloudflare**.
- No environment variables. No server-side logic. Pure static.
- To force a fresh deploy: `vercel --prod --force`

---

## Out of Scope

Do not suggest or implement:

- A dark/light mode toggle (the page is always dark — that's the aesthetic)
- A blog, portfolio grid, or case studies section (this is a business card, not a portfolio)
- Cookie banners, analytics scripts, or tracking pixels
- Any change that would require a bundler or build step
- Replacing inline SVG icons with an icon library
