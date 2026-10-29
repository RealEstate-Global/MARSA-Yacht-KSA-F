# Architecture Guide

## Overview

MARSA is built using a modular Angular architecture with standalone components, signals-based state, and a service-based pattern for application configuration and side effects.

## Core Architecture

### 1. Application Structure

```
src/
├── app/
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Route configuration
│   ├── pages/                  # Page/container components
│   ├── components/             # Reusable UI components
│   ├── services/               # Application services
│   └── data/                   # Data models and constants
```

### 2. Design Patterns

#### Standalone Components
All Angular components are standalone, promoting better tree-shaking and module independence.

```typescript
@Component({
  selector: 'marsa-button',
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class ButtonComponent {}
```

#### Services Pattern
Application state is managed through services with Angular signals; observables are used only for true async flows (HTTP submissions).

```typescript
@Injectable({ providedIn: 'root' })
export class SitePreferencesService {
  readonly locale = signal<Locale>(this.readLocale());
}
```

#### Component Composition
Complex UIs are built by composing smaller, focused components with clear input/output contracts.

### 3. Routing

The application uses Angular Router with lazy loading for optimal performance.

- Main routes defined in `app.routes.ts`
- Feature modules can implement their own route configurations
- Lazy loading applied where appropriate

### 4. Styling

- **Global Styles**: `src/styles.css`
- **Component Styles**: Scoped to component encapsulation
- **Design System**: Tailwind CSS for utility-first styling

## State Management

### Pattern
- Angular **signals** for reactive state (`SitePreferencesService`)
- OnPush change detection for performance
- Subscriptions stored in fields and cleaned up in `ngOnDestroy`

### Example (actual implementation)
```typescript
@Injectable({ providedIn: 'root' })
export class SitePreferencesService {
  readonly locale = signal<Locale>(this.readLocale());
  readonly theme = signal<Theme>(this.readTheme());

  toggleLocale(): void {
    this.locale.update((value) => (value === 'en' ? 'ar' : 'en'));
    localStorage.setItem('marsa-locale', this.locale());
  }
}
```

## Performance Considerations

1. **OnPush Change Detection**: Used to minimize change detection cycles
2. **Lazy Loading**: Routes are lazy-loaded to reduce initial bundle size
3. **Tree Shaking**: Standalone components improve bundle optimization
4. **Unsubscription**: Memory leaks prevented through proper subscription management

## Type Safety

- Strict TypeScript configuration enforced
- No implicit `any` types allowed
- Strong typing across services and components
- Use of discriminated unions for complex types

## Testing Strategy

- Unit tests run with the `@angular/build:unit-test` builder (Vitest, jsdom)
- Specs live next to their sources (`*.spec.ts`) and run via `npm run test`
- CI executes typecheck, tests, and the production build on every PR
- Covered areas today: routing/anchors, locale resolution, honest form
  submission behaviour, reduced-motion slider gating

## Bilingual Support

The application supports both English (LTR) and Arabic (RTL) through:
- `SitePreferencesService` managing locale state
- Responsive text data structures with `{ en: string, ar: string }`
- Dynamic language switching at runtime

---

For more details, see [DEVELOPMENT.md](./DEVELOPMENT.md)
