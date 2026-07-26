# Portfolios — Website Templates Marketplace

A collection of 20 ready-made, fully responsive one-page website templates for
different professions, plus a main hub site ([index.html](index.html)) that
showcases every template with a live preview, pricing, and a contact form for
purchases.

## Live structure

- **`index.html` / `styles.css` / `script.js`** — the main marketplace page.
  Lists every template with a scaled live iframe preview, category filters,
  pricing plans, and a contact section.
- Each profession folder contains one or more design variants, each a
  self-contained static site (`index.html`, its own CSS/JS, `assets/`):
  - `accountants/` — 2 designs
  - `doctors/` — 3 designs
  - `engineers/` — civil, electrical, mechanical
  - `graphic_designers/` — 3 designs
  - `gym/` — 1 full multi-section site
  - `interior_design/` — 3 designs
  - `lawyers/` — 2 designs
  - `photographers/` — 3 designs

Every inner template page includes a floating "Buy This Template" badge
(bottom-right) linking back to the main site's contact section with the
template pre-selected.

## Pricing

| Plan | Price |
| --- | --- |
| Single template (up to 6 sections) | 1,500 EGP flat |
| Category bundle (all designs in one profession) | 2,950 EGP |
| Full collection (all 20 templates) | 14,950 EGP |
| Custom design | Contact for a quote |

Add-ons (apply to any template): extra section beyond 6 — 200 EGP; color
change — 200 EGP; font change — 100 EGP; first revision after delivery is
free, each revision after that — 200 EGP.

## Contact / Buy

- Email: mohamed.emad45621@gmail.com
- Phone / WhatsApp: 010 3274 6151
- Phone / WhatsApp: 012 8507 6888
- Facebook: https://www.facebook.com/joomedi3

## Running locally

These are static sites with no build step. Serve the project root with any
static file server, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.
