# Development Guide — Al Marsa

Guidelines and conventions for developing features in the Al Marsa lookbook application.

---

## 1. Quick Development Workflow

### Starting the Local Server
```bash
cd marsa
npm run dev
```
The server starts at `http://localhost:4200` with hot module reloading.

### Running Quality Checks
Always verify before committing:
```bash
npm run typecheck    # Validate TypeScript types & template bindings
npm run test         # Execute Vitest component specs
npm run build        # Validate production bundle and budget
```

---

## 2. Component Development Conventions

All components in Al Marsa are **standalone** and use **`ChangeDetectionStrategy.OnPush`**.

### 2.1 Standard Component Blueprint
```typescript
import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitePreferencesService } from '../../services/site-preferences.service';

@Component({
  selector: 'app-custom-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSectionComponent {
  readonly prefs = inject(SitePreferencesService);
  
  // Strongly-typed inputs using modern input signal syntax
  readonly sectionTitle = input<string>();
}
```

### 2.2 Section Structure Guidelines
Every landing section must include:
- A descriptive unique `id` (e.g. `id="why"`, `id="how"`) for anchor scrolling.
- Accessible heading hierarchy (`h2` for section header, `h3` for cards/steps).
- RTL-safe styling using Tailwind's directional utilities (`ms-*`, `me-*`, `text-start`, `text-end`).
- Proper `aria-labelledby` or descriptive aria attributes.

---

## 3. Bilingual Copy Pattern (`LocalizedText`)

All user-visible text is maintained in the `src/app/data/` directory using strongly-typed `LocalizedText` objects. **Never inline user-facing text directly in HTML templates.**

```typescript
// Define copy in src/app/data/*.data.ts:
export const sectionData: SectionCopy = {
  title: {
    en: 'Why Al Marsa',
    ar: 'ليش المرسى',
  },
  subtitle: {
    en: 'Verified yachts, licensed captains, clear pricing.',
    ar: 'يخوت معتمدة، قباطنة مرخصون، وأسعار واضحة.',
  },
};
```

```html
<!-- Render in template using the active locale -->
<h2>
  {{ isRtl ? data.title.ar : data.title.en }}
</h2>
```

---

## 4. Slider & Interactive Component Patterns

When building interactive UI elements like the Hill Robinson-inspired horizontal slider in `WhyComponent`:

1. **Hardware-Accelerated CSS**: Prefer CSS scroll-snap (`scroll-snap-type: x mandatory`) over JavaScript animation loops.
2. **RTL Direction Inversion**: Invert mouse/touch delta calculations when `isRtl` is true so dragging matches physical expectations.
3. **Reduced Motion Compliance**: Check `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable smooth scrolling for accessibility.
4. **Observer Cleanup**: Always disconnect `ResizeObserver`, `IntersectionObserver`, and window event listeners in `ngOnDestroy()`.

---

## 5. Coding Standards

### TypeScript
- Strict type-checking is enforced (`noImplicitAny`, `strictNullChecks`).
- Avoid type assertions (`as unknown as ...`) or non-null assertions (`!`).
- Use dedicated interfaces in `src/app/models/` for all structured domain models.

### CSS & Tailwind
- Use custom Marsa design tokens: `text-marsa-sand`, `bg-marsa-navy`, `border-marsa-sea`.
- Ensure dark and light mode compatibility with `dark:` variants.
- Never use physical `left` / `right` utilities if logical `start` / `end` utilities apply.

---

## 6. Git & Conventional Commits

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Common Types:
- `feat`: A new user-facing feature or section enhancement
- `fix`: A bug fix or visual defect correction
- `docs`: Documentation updates or clarification
- `style`: Formatting, whitespace, or non-functional styling cleanup
- `refactor`: Code reorganization without functional changes
- `test`: Adding or updating test cases
- `chore`: Tooling, build config, or dependency updates

### Example:
```bash
git commit -m "feat(why): add touch velocity drag to horizontal image slider"
```
