# MARSA — Team, Ownership & Engineering Workflow

This document is the working agreement for contributors to the MARSA Yacht KSA repository. The application lives in `marsa/` and is an Angular/TypeScript project.

## Team responsibilities

| Area | Primary owner | Supporting owner(s) | Scope |
|---|---|---|---|
| Product direction & architecture | @samir-akram | @Mostafa-SAID7 | Requirements, architecture decisions, cross-team coordination |
| Full-stack technical lead | @Mostafa-SAID7 | @samir-akram | Technical direction, reviews, integration and release readiness |
| Frontend & UI implementation | @eng-shimo | @Mostafa-SAID7 | Angular components, routes, responsive behavior, accessibility, RTL/LTR |
| Backend / integrations | @mohamed-monged | @Mostafa-SAID7 | API/integration design and implementation when relevant to the current architecture |
| QA & test strategy | @eng-loola | @Mostafa-SAID7 | Test plans, regression checks, reproducible defect reports |
| DevOps & CI/CD | @dev-elbasha | @Mostafa-SAID7 | GitHub Actions, build/release workflow, deployment and operational configuration |
| UI/UX & media | @ashraqat-salim | @eng-shimo | Design handoff, approved visual assets, interaction and layout feedback |
| Content & SEO | @cw-hakam | @samir-akram | Content quality, metadata, discoverability and editorial consistency |
| Repository/business owner | @companyrealestate | @Mostafa-SAID7 | Business approvals, repository administration and access decisions |

## Repository access — observed at setup time

The following access was returned by GitHub when this governance change was prepared:

| GitHub login | Observed repository permission | Guidance |
|---|---|---|
| @companyrealestate | Admin | Keep as repository/business owner |
| @Mostafa-SAID7 | Admin | Consider reducing to Maintain if repository administration is not part of the role |
| @samir-akram | Write | Appropriate for architecture and code review |
| @dev-elbasha | Write | Appropriate for CI/CD contributions; keep production secrets separately scoped |
| @eng-shimo | Write | Appropriate for frontend contributions |
| @eng-loola | Write | Appropriate for QA and test contributions |
| @cw-hakam | Write | Appropriate where content/SEO changes are committed |
| @ashraqat-salim | Read | Upgrade to Triage or Write only if the role needs issue triage or direct asset commits |
| @mohamed-monged | Read | Upgrade to Write before assigning direct implementation work or CODEOWNERS review duties |

These are observations, not permission changes. This documentation does not grant, revoke, or upgrade access. Re-check access before relying on this table.

## Branch and pull-request workflow

1. Create a focused branch from `main`, for example `feat/short-description`, `fix/short-description`, `docs/short-description`, or `chore/short-description`.
2. Keep commits small and explain the reason for the change.
3. Open a pull request against `main`; describe the user impact, link related issues, and include screenshots for visual changes.
4. Request review from the relevant code owner(s). Authors should not approve their own pull requests.
5. Resolve review comments and wait for required CI checks before merging.
6. Prefer squash merging for a clean, readable history. Do not commit secrets, credentials, personal data, generated build output, or unapproved licensed assets.

## Definition of Done

- [ ] The change matches an agreed requirement and has a clear acceptance criterion.
- [ ] Type checking and the relevant tests pass; run `npm run typecheck`, `npm run test`, and `npm run build` from `marsa/` as applicable.
- [ ] UI changes are checked at mobile and desktop sizes, in English/LTR and Arabic/RTL, and in supported themes.
- [ ] Accessibility, loading, empty, and error states have been considered where relevant.
- [ ] Documentation, metadata, and tests are updated when needed.
- [ ] The PR has the required review and CI checks; no secrets or unrelated changes are included.

## Security and operational access

- Store credentials in approved GitHub Actions secrets or the deployment platform's secret manager, never in source control or issue/PR comments.
- Use least privilege for repository roles, deployment environments, cloud credentials, and tokens.
- Require review for workflow, dependency, release, and deployment changes.
- Report vulnerabilities privately using the process in [SECURITY.md](../SECURITY.md); do not publish exploit details in a public issue.
- Repository code owners are review routing only. They do not grant repository access and do not by themselves enforce required reviews.

## Recommended GitHub settings

A repository administrator should verify these settings in GitHub after reviewing the team's release needs:

- Protect `main` with a pull request before merge and at least one approval from someone other than the author.
- Require approval of the most recent reviewable push when appropriate, dismiss stale approvals after new commits, and require conversation resolution.
- Require successful CI checks for build, type checking, and tests once the corresponding check names are confirmed in Actions.
- Restrict force pushes and branch deletion on `main`; do not enable bypasses casually.
- Enable secret scanning and push protection where available, and review organization/repository access periodically.

These settings are recommendations only; this document does not change branch protection or collaborator permissions.
