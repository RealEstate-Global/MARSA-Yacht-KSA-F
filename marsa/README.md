# Al Marsa — Angular Application Workspace

This directory contains the main Angular 22 source code for the **Al Marsa (المرسى)** luxury vessel-charter lookbook.

For high-level project documentation, architecture overviews, and contribution guidelines, see the [Root README](../README.md) and [Documentation Directory](../docs/).

---

## 🚀 Quick Development Commands

Run all commands from within this directory (`marsa/`):

```bash
# Start local development server on http://localhost:4200
npm run dev

# Run unit tests using Vitest & jsdom
npm run test

# Typecheck TypeScript and Angular template bindings
npm run typecheck

# Build production bundle (outputs to dist/public/browser)
npm run build

# Preview the production build locally
npm run serve
```

---

## 📁 Source Code Directory Map

- `src/app/components/layout/`: Navigation header pill and footer with dynamic copyright year.
- `src/app/components/sections/`:
  - `hero/`: Cinematic vessel background and primary brand action.
  - `why/`: Hill Robinson-inspired horizontal image-led scroll slider (`#why`).
  - `products/`: 4-step charter workflow and interactive 19-category taxonomy (`#how`).
  - `about/`: Brand philosophy, Saudi maritime heritage, and standards (`#about`).
  - `cta/`: Mobile application ecosystem gateway (`#download`).
- `src/app/data/`: Strongly typed localized copy files (`LocalizedText` for EN and AR).
- `src/app/models/`: TypeScript interfaces and data definitions.
- `src/app/services/`: Reactive signals services (`SitePreferencesService`).
- `src/styles.css`: Design system tokens, Tailwind layers, and custom slider CSS classes.
- `public/assets/`: Optimized photography assets and brand graphics.

---

## 📖 Related Guides

- [System Architecture](../docs/ARCHITECTURE.md)
- [Development Guidelines](../docs/DEVELOPMENT.md)
- [Local Setup Guide](../docs/SETUP.md)
- [Accessibility Guide](../ACCESSIBILITY.md)
