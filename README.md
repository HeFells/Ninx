# Ninxware — GitHub for AI (SPA Mock)

A fully front-end Single Page Application inspired by Hugging Face/GitHub for sharing AI models.

## Project Structure

- `index.html` — App shell and CDN dependencies.
- `styles.css` — Custom animations, card interactions, and UI refinements.
- `app.js` — Main app controller, state manager, routing, and event orchestration.
- `components/` — Reusable UI blocks (navbar, model card, modals).
- `pages/` — Page-level renderers (home, models, detail, upload, auth).
- `utils/` — Storage and helper utilities.
- `data/` — Initial mock model dataset.

## Features

- Hash-based SPA routes: `#/home`, `#/models`, `#/model/:id`, `#/upload`, `#/login`
- LocalStorage-backed session and data persistence
- Login/Register mock auth with validation
- Model listing with search, tag filters, and sorting
- Model details with files table, parameter table, README, and code usage
- Simulated model download as zip blob
- Simulated model testing (NLP/CV/Audio behavior)
- Upload flow that adds new models to localStorage
- Responsive mobile-first design with Tailwind + custom CSS
- Light/Dark mode toggle

## Run Instructions

### Option 1: Open directly
Open `index.html` in a browser.

### Option 2 (recommended): Static server
Use any static server for best compatibility:

```bash
# Python
python3 -m http.server 5500
```

Then visit: `http://localhost:5500`

## Notes

- No backend is required; all behavior is simulated on the client.
- To reset data, clear browser localStorage for this site.
