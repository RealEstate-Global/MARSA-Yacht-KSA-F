import { Injectable, signal } from '@angular/core';
import { Locale, Theme } from '../models';

@Injectable({ providedIn: 'root' })
export class SitePreferencesService {
  readonly locale = signal<Locale>(this.readLocale());
  readonly theme = signal<Theme>(this.readTheme());

  constructor() {
    this.applyPreferences();
  }

  toggleLocale(): void {
    this.locale.update((value) => (value === 'en' ? 'ar' : 'en'));
    localStorage.setItem('marsa-locale', this.locale());
    this.applyPreferences();
  }

  toggleTheme(event?: MouseEvent): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';

    // ── View Transitions API: circular clip-path wipe from button position ──
    // Identical technique to ms-reall-estate.vercel.app
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Graceful fallback: instant switch
      this.theme.set(nextTheme);
      localStorage.setItem('marsa-theme', nextTheme);
      this.applyPreferences();
      return;
    }

    // Compute origin point: centre of clicked button, or top-right corner fallback
    const x = event?.clientX ?? window.innerWidth - 40;
    const y = event?.clientY ?? 40;

    // Max radius needed so the circle covers the entire viewport from that origin
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      this.theme.set(nextTheme);
      localStorage.setItem('marsa-theme', nextTheme);
      this.applyPreferences();
    });

    // After the new DOM snapshot is ready, animate the clip-path circle outward
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        { clipPath },
        {
          duration: 500,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // same ease-out spring as reference
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  }

  text(value: { en: string; ar: string }): string {
    return value[this.locale()];
  }

  private applyPreferences(): void {
    const locale = this.locale();
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    
    if (this.theme() === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }

  private readLocale(): Locale {
    return localStorage.getItem('marsa-locale') === 'ar' ? 'ar' : 'en';
  }

  private readTheme(): Theme {
    const stored = localStorage.getItem('marsa-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}