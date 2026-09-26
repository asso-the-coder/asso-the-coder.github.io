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
- **`assets/js/analytics.js`** / **`google-apps-script.gs`** — opt-in visitor logging to a Google Sheet, with bot/scraper filtering. See the comment header in analytics.js for setup steps.
- **`resume/jakes_resume.tex`** — LaTeX source for the resume (the "Jake's Resume" Overleaf template). Compile with MiKTeX (installed on this machine at `/mnt/c/Users/16132/AppData/Local/Programs/MiKTeX/miktex/bin/x64/pdflatex.exe`) from inside `resume/`, then copy the resulting `jakes_resume.pdf` to `assets/resume.pdf` — that's the canonical file the site's Resume links point to. Build artifacts (`.aux`/`.log`/`.out`/`.pdf`) in `resume/` are gitignored; only the `.tex` source and `assets/resume.pdf` are committed.
- There is no build step for the website itself, and no separate "design" folder — `index.html` at the root is the live file, always.
