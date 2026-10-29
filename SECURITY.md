# Security Policy

MARSA is a bilingual customer-facing web application for Saudi marine
hospitality and yacht provisioning. Keeping guest data and the trust of owners,
captains, and crew safe matters.

## Supported Versions

The application is continuously deployed from `main` (currently version
1.0.x). Only the latest build deployed from `main` receives security fixes —
there are no long-lived maintenance branches or released version lines.

## Reporting a Vulnerability

Please do **not** open a public issue for anything you believe is exploitable.

1. Report privately via GitHub Security Advisories ("Report a vulnerability"
   button on the repository's Security tab, available to maintainers and
   authorized reporters), **or**
2. Contact a repository maintainer directly through GitHub
   ([@Mostafa-SAID7](https://github.com/Mostafa-SAID7)).

When reporting, include:

- A description of the issue and its impact
- Steps to reproduce (URLs, code paths, proof-of-concept where possible)
- Any relevant logs or screenshots — **never** include live credentials,
  tokens, or personal data

You can expect an acknowledgement within 7 days and status updates while the
report is being triaged. Findings will be fixed as soon as practical and
credited where the reporter wishes. Reports that are declined will receive an
explanation.

## Security Practices in this Repository

- CodeQL scans run on every push/PR to `main` and weekly
- Dependabot keeps npm and GitHub Actions dependencies current
- CI runs typecheck, unit tests, and the production build before merge
- No secrets are committed to version control
- Dynamic backend configuration (e.g., the request endpoint) lives outside
  source control and is never invented as fake wiring

## In-Scope Concerns

- Cross-site scripting through template rendering or unsafe HTML
- Dependency vulnerabilities in the Angular application (`marsa/package.json`)
- Workflow and permissions issues in `.github/workflows/`
- Personal data collection or exposure through the request forms

Out-of-scope: social engineering, automated scanner noise without a
demonstrated impact path, and infrastructure concerns outside this repository
(e.g., the hosting account or domain registration).
