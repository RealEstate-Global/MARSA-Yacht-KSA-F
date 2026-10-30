# MARSA — Team, Ownership & Engineering Workflow

This document defines the governance agreement and engineering standards for contributors to the MARSA Yacht KSA repository.

---

## 1. Team Responsibilities

| Area | Primary Owner | Supporting Owner(s) | Scope |
| :--- | :--- | :--- | :--- |
| **Product Direction & Architecture** | @samir-akram | @Mostafa-SAID7 | Architectural decisions, requirements roadmap, cross-functional alignment |
| **Full-Stack Technical Lead** | @Mostafa-SAID7 | @samir-akram | Technical quality, PR approvals, release readiness |
| **Frontend & UI Implementation** | @eng-shimo | @Mostafa-SAID7 | Angular components, slider interactions, responsive layouts, RTL/LTR design |
| **Backend & Integrations** | @mohamed-monged | @Mostafa-SAID7 | API design, service integration, external redirects |
| **QA & Test Strategy** | @eng-loola | @Mostafa-SAID7 | Test plans, Vitest component specs, cross-browser regression checks |
| **DevOps & CI/CD** | @dev-elbasha | @Mostafa-SAID7 | GitHub Actions, Vercel deployments, CodeQL & Dependabot config |
| **UI/UX & Media Design** | @ashraqat-salim | @eng-shimo | Visual assets, editorial photography curation, typography & micro-interactions |
| **Content & Technical SEO** | @cw-hakam | @samir-akram | Verbatim brand copy, Saudi Arabic localization, schema markup, GEO |
| **Repository Owner** | @companyrealestate | @Mostafa-SAID7 | Executive approvals, repository permissions, brand governance |

---

## 2. Branch & Pull Request Workflow

1. **Feature Branches**: Branch from `main` using descriptive naming:
   - `feat/why-slider-enhancements`
   - `fix/locale-switch-layout`
   - `docs/modernize-readme`
   - `chore/update-dependencies`
2. **Atomic Commits**: Keep commits concise and adhere to Conventional Commits.
3. **Pull Request Protocol**:
   - Link related issue tickets (`Closes #...`).
   - Include visual screenshots or screen recordings for any UI/UX change.
   - Request review from designated code owners in [.github/CODEOWNERS](../.github/CODEOWNERS).
   - Require passing CI workflows (build, typecheck, tests, CodeQL).
4. **Merge Strategy**: Use **Squash and Merge** to maintain a clean linear commit history on `main`.

---

## 3. Definition of Done (DoD)

Before any pull request can be approved and merged into `main`, it must satisfy:

- [ ] **Typecheck**: `npm run typecheck` passes with zero errors.
- [ ] **Tests**: `npm run test` passes all Vitest specs in jsdom.
- [ ] **Build Budget**: `npm run build` succeeds within performance budgets.
- [ ] **Bidirectional Verification**: Tested in English (LTR) and Arabic (RTL) across viewports (mobile 375px, tablet 768px, desktop 1280px+).
- [ ] **Accessibility Check**: Full keyboard operability, ARIA attributes, and `prefers-reduced-motion` compliance.
- [ ] **Brand Truthfulness**: No fabricated claims, artificial ratings, or unverified contact data.
- [ ] **Security Review**: No secrets, sensitive tokens, or unapproved dependencies included.

---

## 4. Security & Access Standards

- Store production tokens exclusively in approved GitHub Secrets or Vercel environment managers.
- Enforce branch protection on `main` requiring minimum 1 approving review and passing status checks.
- Report all vulnerabilities privately through GitHub Security Advisories or by contacting the lead maintainer directly.
