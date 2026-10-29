# 🛥️ Al Marsa — المرسى · Gulf Vessel-Charter Lookbook

[![CI Pipeline](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml)
[![Release](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml)
[![CodeQL Security Scan](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml)
[![Close stale issues and PRs](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/stale.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/stale.yml)

> The official "lookbook" for **Al Marsa (المرسى)** — a premium vessel-charter marketplace built for the Gulf, Saudi-first. Verified yachts, licensed captains, coastguard-cleared, clear pricing. Browsing happens on this site; **booking, payment, KYC, and coastguard clearance happen in the Al Marsa app** ([almarsa.app](https://almarsa.app/)).

## 🎯 Focus Points

- **Source-aligned bilingual content** (English/Arabic, Saudi dialect) with RTL layout — mirrored verbatim from [almarsa.app](https://almarsa.app/)
- **No fabricated facts** — store CTAs link the official site until real store listings exist; no invented inventory, prices, or contact details
- **Single-page lookbook architecture**: why → how → about → download, with accessible section anchors
- **Zoneless Angular** (standalone components, signals) and production-grade bundle budgets
- **Technical SEO + GEO**: canonical/OG metadata, JSON-LD Organization + WebSite, robots.txt, sitemap.xml
- **Type-Safe** development with strict TypeScript configuration

## 📋 Quick Start

### Prerequisites
- Node.js 24.x or higher
- npm 10.x or higher

### Installation
```bash
cd marsa
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:4200](http://localhost:4200) in your browser.

### Production Build
```bash
npm run build
```

### Tests
```bash
npm run test
```

## 📁 Project Structure

```
MARSA-Yacht-KSA-F/
├── marsa/                        # Main Angular application
│   ├── src/
│   │   ├── app/                  # Angular components and services
│   │   ├── assets → public/      # Static assets (public/assets)
│   │   └── styles.css            # Global styles
│   ├── angular.json              # Angular configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json              # Dependencies
├── .github/                      # GitHub workflows and templates
│   ├── workflows/                # CI/CD pipelines
│   └── ISSUE_TEMPLATE/           # Issue templates
├── docs/
│   ├── ARCHITECTURE.md           # System design
│   ├── SETUP.md                  # Setup guide
│   ├── DEVELOPMENT.md            # Development guidelines
│   ├── MIGRATION.md              # almarsa.app content migration + SEO/GEO notes
│   └── TEAM.md                   # Governance and code ownership
├── LICENSE                       # Project license
├── CONTRIBUTING.md               # Contribution guidelines
└── README.md                     # This file
```

## 🛠️ Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 4200) |
| `npm run build` | Production build |
| `npm run serve` | Serve production build |
| `npm run typecheck` | TypeScript and template type checking |
| `npm run test` | Unit tests (Vitest runner, `ng test`) |

## 🎨 Tech Stack

- **Framework**: Angular 22.2
- **Language**: TypeScript ~6.0
- **Build Tool**: Angular CLI (`@angular/build:application`)
- **Styling**: Tailwind CSS (via PostCSS)
- **State Management**: Angular signals (`SitePreferencesService`)
- **Routing**: Angular Router

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - System design and patterns
- [Setup Guide](./docs/SETUP.md) - Local development setup
- [Development Guide](./docs/DEVELOPMENT.md) - Development guidelines
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [Security Policy](./SECURITY.md) - Reporting vulnerabilities
- [Accessibility](./ACCESSIBILITY.md) - Accessibility commitments

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

This project is proprietary and confidential.

## 📧 Support

For questions or support, please reach out to the development team.

---

**Last Updated**: October 2026  
**Version**: 1.0.4

## 🛒 Content source of truth

All public copy is mirrored from the official brand site ([almarsa.app](https://almarsa.app/)) — see [docs/MIGRATION.md](./docs/MIGRATION.md) for the verified inventory, migration map, and known limitations (store-link placeholders, no real vessel inventory). Update both languages together and never invent prices, vessels, store URLs, or contact details.
