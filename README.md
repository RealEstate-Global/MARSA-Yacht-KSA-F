# 🛥️ MARSA — Saudi Marine Hospitality Platform

[![CI Pipeline](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/ci.yml)
[![Release](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/release.yml)
[![CodeQL Security Scan](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/codeql-analysis.yml)
[![Close stale issues and PRs](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/stale.yml/badge.svg)](https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F/actions/workflows/stale.yml)

> Premium bilingual Saudi Red Sea marine hospitality and yacht provisioning experience for owners, captains, crew, and VIP travelers.

## 🎯 Focus Points

- **Bilingual Support** (English/Arabic) with RTL layout
- **Premium UX** for luxury yacht provisioning and hospitality
- **Modular Architecture** with standalone Angular components and signals
- **Type-Safe** development with strict TypeScript configuration
- **Production-Ready** build optimization and performance

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
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md           # System design
│   ├── SETUP.md                  # Setup guide
│   └── DEVELOPMENT.md            # Development guidelines
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
**Version**: 1.0.2
