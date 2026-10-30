# Contributing to Al Marsa

Thank you for your interest in contributing to **Al Marsa (المرسى)**! We are building a world-class luxury yacht lookbook for the Gulf, and we appreciate contributions from the community and engineering team.

---

## 1. Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please treat everyone with respect, kindness, and professionalism.

---

## 2. Getting Started

1. **Fork & Clone**: Fork the repository on GitHub and clone your fork locally.
2. **Environment Setup**: Follow our [Setup Guide](./docs/SETUP.md) to install dependencies (`Node.js 24.x`, `npm ci`).
3. **Coding Standards**: Read the [Development Guide](./docs/DEVELOPMENT.md) for architecture rules, standalone component patterns, and bilingual handling.

---

## 3. Development Workflow

### Create a Focused Branch
Always branch from `main`:
```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Validate Before Committing
Run all verification scripts from the `marsa/` directory:
```bash
cd marsa
npm run typecheck    # TypeScript & Angular template check
npm run test         # Component unit tests with Vitest
npm run build        # Production bundle compilation
```

### Write Conventional Commits
Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:
```bash
git commit -m "feat(slider): add touch swipe dampening to why section"
git commit -m "fix(locale): ensure cairo font applies correctly in RTL"
git commit -m "docs(readme): modernize architecture overview"
```

---

## 4. Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request targeting `main`.
3. Complete the pull request template:
   - Provide a concise summary of the problem and your solution.
   - Attach screenshots or recordings for any UI/UX or responsive layout changes.
   - Link related issue numbers (e.g. `Fixes #123`).
4. Ensure all GitHub Actions CI checks pass.
5. Request review from the designated code owners in [.github/CODEOWNERS](./.github/CODEOWNERS).

---

## 5. Definition of Done Checklist

Every pull request must satisfy:
- [ ] TypeScript strict mode compliance with no implicit `any`.
- [ ] Change verified in both **English (LTR)** and **Arabic (RTL)**.
- [ ] Responsive layout checked at mobile (375px), tablet (768px), and desktop (1280px+).
- [ ] Accessibility validated (keyboard navigation, ARIA landmarks, `prefers-reduced-motion`).
- [ ] No fabricated claims, invented inventory, or live credentials.

---

## 6. Questions or Need Help?

- Check the [Architecture Guide](./docs/ARCHITECTURE.md)
- Check the [Migration Notes](./docs/MIGRATION.md)
- Reach out to the maintainers or open a GitHub discussion.
