import { Component, ViewChild, ElementRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { navData } from '../../../data/navigation.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import {
  LucideArrowUpRight,
  LucideSun,
  LucideMoon,
  LucideGlobe,
  LucideMenu,
  LucideX,
} from '@lucide/angular';

@Component({
  selector: 'marsa-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideArrowUpRight,
    LucideSun,
    LucideMoon,
    LucideGlobe,
    LucideMenu,
    LucideX,
  ],
  templateUrl: './header.html',
})
export class Header {
  readonly navData = navData;
  readonly preferences: SitePreferencesService;
  isMenuOpen = false;

  /**
   * Scroll-reactive nav (CAiR-Turbo pattern): transparent pill over the hero,
   * frosted glass once the page scrolls past 20 px (also while the mobile
   * menu overlay is open, so the pill keeps its surface).
   */
  readonly scrolled = signal(false);

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  constructor(preferences: SitePreferencesService) {
    this.preferences = preferences;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  /** True when the pill should carry its glass surface. */
  pillGlass(): boolean {
    return this.scrolled() || this.isMenuOpen;
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (!this.isMenuOpen) {
      return;
    }
    this.isMenuOpen = false;
  }

  /** Escape closes the open overlay and returns focus to the menu toggle. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
      window.setTimeout(() => this.menuToggle?.nativeElement.focus(), 0);
    }
  }

  isLightTheme(): boolean {
    return this.preferences.theme() === 'light';
  }
}
