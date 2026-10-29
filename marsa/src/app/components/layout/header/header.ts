import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { copy } from '../../../data/content';
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
  readonly copy = copy;
  readonly preferences: SitePreferencesService;
  isMenuOpen = false;

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  constructor(preferences: SitePreferencesService) {
    this.preferences = preferences;
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
