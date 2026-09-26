# CLAUDE.md

This repository is Asser Abdelgawad's personal portfolio website, hosted at asserabdelgawad.com via GitHub Pages.

## About the owner

Asser is an Engineering Science student at the University of Toronto, interested in embedded systems, circuit design, and artificial intelligence applications. This website should represent him — his projects, experience, and skills should be presented accurately and in a way that reflects these interests.

## Workflow

- Don't push to GitHub until the end of the session. Make and commit changes locally as needed, but hold off on `git push` until explicitly told the session is wrapping up or asked to push.
- Single `main` branch — no separate design/feature branches. The site went through a redesign (retro pixel-art "maker desk" theme); the old design and the classic/snazzy dual-design scaffolding have been removed to keep things simple.

## File structure — what to edit

- **`assets/js/content.js`** — single source of truth for all visible text/data (About bullets, project/experience/skills entries, contact info, nav labels, etc.). Edit this for any content change.
- **`index.html`** — the page markup and styling (pixel-art theme). Edit this for layout/visual changes.
- **`assets/js/site-shared.js`** — small shared rendering helpers (escapeHtml, copy-email button, scroll-reveal). Rarely needs touching.
- **`assets/hero-desk.png`** — the hero banner image.
- There is no build step and no separate "design" folder — `index.html` at the root is the live file, always.
