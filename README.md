<div align="center">

# 🛥️ Al Marsa — المرسى
### Gulf Luxury Vessel-Charter Lookbook

[![CI Pipeline](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml)
[![Release](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml)
[![CodeQL Security Scan](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml)
[![Angular](https://img.shields.io/badge/Angular-22.2-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <strong>The official web lookbook for Al Marsa (المرسى)</strong><br>
  A premium vessel-charter marketplace crafted for the Gulf, Saudi-first.<br>
  Verified yachts · Licensed captains · Coastguard-cleared · Transparent pricing
</p>

[🌐 Live Deployment](https://marsa-yacht.vercel.app/) · [📱 Official Platform](https://almarsa.app/) · [📖 Documentation](./docs/ARCHITECTURE.md)

---

</div>

## 🌟 Executive Summary

**Al Marsa** connects sea enthusiasts with curated private vessels across the Saudi coastline. 

- **The Website (`lookbook`)**: Editorial showcase, curated fleet categories, and charter workflow discovery.
- **The Mobile Application**: Booking, payment, KYC verification, coastguard clearance, and digital boarding passes happen exclusively inside the official Al Marsa mobile apps ([almarsa.app](https://almarsa.app/)).

> **Source-of-Truth Commitment:** All copy, taxonomy, and brand narratives are mirrored verbatim from the official brand source without fabricated claims, invented inventory, or artificial contact numbers.

---

## 🎯 Key Highlights

| Feature | Description |
| :--- | :--- |
| **Hill Robinson-Inspired Slider** | Editorial 3:4 portrait card horizontal slider (`#why`) with hardware-accelerated CSS scroll-snap, touch drag, keyboard arrow navigation, and full RTL mirror. |
| **Bilingual & RTL-First** | Native Arabic (Saudi dialect, Cairo typography) and English with instant runtime switching and zero layout shift. |
| **Fleet Taxonomy** | Interactive 19-category vessel directory (`#how`) reflecting real maritime classifications across the Red Sea and Arabian Gulf. |
| **Zoneless Angular 22** | Modern reactive state management powered entirely by Angular Signals, OnPush change detection, and tree-shakeable standalone components. |
| **Technical SEO & GEO** | OpenGraph metadata, JSON-LD Schema (`Organization` + `WebSite`), crawlable semantic anchors, and sitemap generation. |
| **Accessible & Inclusive** | WCAG 2.1 AA focus: full keyboard navigation, ARIA live announcements, high contrast dark/light themes, and strict `prefers-reduced-motion` compliance. |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `24.x` (LTS recommended, `22.x+` supported)
- **npm**: `10.x+`

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F.git
cd MARSA-Yacht-KSA-F/marsa

# Install dependencies
npm ci

# Start local development server (http://localhost:4200)
npm run dev
```

### Verification & Testing

```bash
# Run unit tests (Vitest + jsdom)
npm run test

# Validate TypeScript & template types
npm run typecheck

# Build optimized production bundle
npm run build
```

---

## 🏗️ Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│                   HomeComponent Shell                  │
├────────────────────────────────────────────────────────┤
│  1. Header             → Navigation pill, locale/theme  │
│  2. Hero               → Cinematic backdrop, taglines  │
│  3. Why (Slider)       → Editorial portrait card strip │
│  4. How (Taxonomy)     → 4-step workflow + 19 categories│
│  5. About              → Brand ethos, trust foundations│
│  6. CTA (Download)     → Mobile app ecosystem gateway  │
│  7. Footer             → Legal, copyright, navigation  │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Layout

```text
MARSA-Yacht-KSA-F/
├── .github/                   # CI/CD Workflows (CI, Release, CodeQL, Stale)
├── docs/                      # Core Engineering Documentation
│   ├── ARCHITECTURE.md        # Technical architecture, Signals & design tokens
│   ├── DEVELOPMENT.md         # Component conventions & coding standards
│   ├── MIGRATION.md           # Source-of-truth mapping & SEO/GEO notes
│   ├── SETUP.md               # Environment setup & deployment targets
│   └── TEAM.md                # Roles, governance & Definition of Done
├── marsa/                     # Angular 22 Application Source
│   ├── public/assets/         # High-resolution optimized visual assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Layout (header/footer) & Sections (hero, why, etc.)
│   │   │   ├── data/          # Type-safe bilingual copy models
│   │   │   ├── models/        # TypeScript interfaces & types
│   │   │   ├── pages/         # Page containers (HomeComponent)
│   │   │   └── services/      # Reactive signals services (SitePreferencesService)
│   │   └── styles.css         # Tailwind directives & design system utilities
│   ├── angular.json           # Angular build configuration
│   ├── tailwind.config.js     # Custom Marsa luxury color palette
│   └── package.json           # Scripts and dependencies
├── ACCESSIBILITY.md           # Accessibility commitments & keyboard shortcuts
├── CHANGELOG.md               # Automated version release notes
├── CONTRIBUTING.md            # Community & pull request guidelines
├── LICENSE                    # Project license
└── SECURITY.md                # Vulnerability disclosure policy
```

---

## 🎨 Tech Stack & Tooling

- **Core**: [Angular 22.2](https://angular.dev/) (Zoneless, Standalone Components, Signal Store)
- **Language**: [TypeScript 6.0](https://www.typescriptlang.org/) (Strict mode, ES2022)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom maritime tokens (`marsa-navy`, `marsa-sea`, `marsa-sand`, `marsa-gold`)
- **Testing**: [Vitest](https://vitest.dev/) via `@angular/build:unit-test` with jsdom
- **Typography**: [Cairo](https://fonts.google.com/specimen/Cairo) (Arabic) & Inter / Cinzel (Latin)
- **Hosting**: [Vercel](https://vercel.com/) with single-page routing rewrites

---

## 📚 Documentation Index

| Guide | Description |
| :--- | :--- |
| [Architecture Guide](./docs/ARCHITECTURE.md) | In-depth breakdown of signals, slider mechanics, and SEO schemas |
| [Development Guide](./docs/DEVELOPMENT.md) | Component patterns, bilingual guidelines, and styling rules |
| [Setup Guide](./docs/SETUP.md) | Toolchain requirements, commands, and deployment setup |
| [Content Migration](./docs/MIGRATION.md) | Verified almarsa.app audit, taxonomy map, and source alignment |
| [Governance & Team](./docs/TEAM.md) | Code ownership, PR workflow, and Definition of Done |
| [Accessibility](./ACCESSIBILITY.md) | Keyboard interactions, motion preferences, and assistive tech support |
| [Security Policy](./SECURITY.md) | Secure handling and responsible vulnerability disclosure |

---

## 🤝 Contributing

We welcome contributions! Please review our [Contribution Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) before opening a pull request.

## 📄 License

This project is proprietary and confidential — Copyright © 2026 Al Marsa. All rights reserved.
