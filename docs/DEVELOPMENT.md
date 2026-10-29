# Development Guide

## Development Workflow

### 1. Starting Development
```bash
cd marsa
npm run dev
```
The dev server starts in watch mode, automatically recompiling on file changes.

### 2. Creating Components

#### Standalone Component
```typescript
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'marsa-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  title = input.required<string>();
}
```

### 3. Creating Services (signals-based)

State in MARSA is managed with Angular signals — no RxJS subjects needed:

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly items = signal<Item[]>([]);

  /** Derived state recomputes automatically. */
  readonly count = computed(() => this.items().length);

  addItem(item: Item): void {
    this.items.update((current) => [...current, item]);
  }
}
```

See `src/app/services/site-preferences.service.ts` for the real implementation
(locale + theme preferences backed by `localStorage`).

### 4. Using Services in Components

```typescript
import { Component, inject } from '@angular/core';

@Component({
  selector: 'marsa-page',
  standalone: true,
  template: `<div>{{ preferences.locale() }}</div>`,
})
export class PageComponent {
  readonly preferences = inject(SitePreferencesService);
}
```

## Code Style Guidelines

### TypeScript
- Use strict type annotations (no implicit `any`)
- Prefer interfaces for object shapes
- Use constants for magic strings/numbers
- Document complex logic with comments

### Components
- Keep components focused and single-responsibility
- Use `ChangeDetectionStrategy.OnPush`
- Leverage `OnDestroy` for cleanup (observers, intervals, subscriptions)
- Subscriptions must be stored and unsubscribed (`RequestSubmissionService` flows)

### Naming Conventions
- **Components**: PascalCase + `Component` suffix (e.g., `HeroComponent`)
- **Services**: PascalCase + `Service` suffix (e.g., `RequestSubmissionService`)
- **Files**: names matching the class (e.g., `hero.component.ts`, `header.ts`)
- **Interfaces**: PascalCase (e.g., `MarsaRequest`, `LocalizedText`)

## File Organization

```
src/
├── app/
│   ├── components/
│   │   ├── layout/           # header, footer
│   │   └── sections/         # hero, intro, products, services, destinations,
│   │                         # about, testimonials, cta
│   ├── pages/                # home.component.ts (+ templates)
│   ├── services/             # site-preferences, request-submission
│   ├── data/                 # content.ts — all bilingual copy
│   ├── testing/              # shared test helpers
│   ├── app.component.ts      # Root component
│   └── app.routes.ts         # Route configuration (section anchors)
├── environments/             # environment.ts (requestEndpoint)
└── styles.css                # Global styles
```

## Working with Routes

Routes point at the single `HomeComponent` and scroll to section anchors
(`#why`, `#how`, `#about`, `#download`); legacy provisioning-era paths map to
the closest new section:

```typescript
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent), pathMatch: 'full' },
  { path: 'services', loadComponent: ..., data: { anchor: 'how' } },
  { path: '**', redirectTo: '' },
];
```

Navigation must use `routerLink` with `fragment` (never raw `href="#..."`):
```html
<a routerLink="/" fragment="how">How it works</a>
```

## Styling

### Global Styles
Modify `src/styles.css` for global styles (Tailwind layers + custom utilities).

### Tailwind CSS
Use Tailwind classes in templates; the theme tokens live in `tailwind.config.js`
under `theme.extend.colors.marsa`:
```html
<div class="flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold">Title</h1>
</div>
```

## Bilingual Support

All user-visible copy lives in `src/app/data/content.ts` as `LocalizedText`
(`{ en, ar }`). Never inline user-facing strings in templates:

```typescript
constructor(public preferences: SitePreferencesService) {}

text() {
  return this.preferences.text({
    en: 'Hello',
    ar: 'مرحباً',
  });
}
```

RTL is applied via `dir="rtl"` on the page container. Keep styles
direction-safe (avoid physical `left/right` where logical properties work).

## Debugging

### Browser DevTools
- Use Angular DevTools browser extension
- Inspect component tree and change detection
- Monitor HTTP requests

### Type Checking
```bash
npm run typecheck
```

### Tests
```bash
npm run test
```

Specs live next to their sources (`*.spec.ts`) and run with the
`@angular/build:unit-test` builder (Vitest in jsdom — no browser needed).

## Common Patterns

### Async Operations
```typescript
this.submission
  .submit(request)
  .subscribe({
    next: () => { /* confirmed delivery */ },
    error: (error: unknown) => { /* honest failure state, never fake success */ },
  });
```

### Subscription Cleanup
```typescript
private sendSubscription?: Subscription;

submit(): void {
  this.sendSubscription?.unsubscribe();
  this.sendSubscription = service.submit(payload).subscribe({ ... });
}

ngOnDestroy(): void {
  this.sendSubscription?.unsubscribe();
}
```

## Commit Messages

Follow conventional commit format:
```
type(scope): subject

body

footer
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
fix(forms): handle request submission correctly
```

---

For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
