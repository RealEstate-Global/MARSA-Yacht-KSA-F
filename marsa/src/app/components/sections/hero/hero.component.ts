import { Component, EventEmitter, OnInit, Output, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { copy } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucideArrowUpRight, LucideArrowDown, LucideMouse } from '@lucide/angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideArrowUpRight, LucideArrowDown, LucideMouse],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  copy = copy;
  @Output() requestService = new EventEmitter<void>();

  // The former second entry duplicated marsa-hero.jpg byte-for-byte, making
  // the first auto-advance a no-op (issue #38). Each slide is now distinct.
  // AVIF cuts every slide to ~40% of its former JPEG weight.
  slides = [
    '/assets/marsa-hero.avif',
    '/assets/marsa-deck.avif',
    '/assets/marsa-marina.avif',
    '/assets/marsa-coastline.avif',
  ];

  // Signal so the zoneless scheduler picks up timer-driven slide changes.
  activeSlideIndex = signal(0);
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  constructor(public preferences: SitePreferencesService) {}

  ngOnInit() {
    this.startSlider();
  }

  /**
   * Only the active slide and its successor may download. Binding the others
   * to `null` removes their background image, so the browser fetches one
   * slide at a time instead of eager-downloading the whole slider on page
   * load; the successor is fetched while the active slide is displayed so
   * advancement stays seamless.
   */
  slideLoads(index: number): boolean {
    return index === this.activeSlideIndex() || index === this.successorIndex();
  }

  private successorIndex(): number {
    return (this.activeSlideIndex() + 1) % this.slides.length;
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    if (typeof window === 'undefined') {
      return; // guard for SSR/test environments
    }
    // Respect prefers-reduced-motion: no automatic cycling (issue #38).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.stopSlider();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopSlider() {
    if (this.slideInterval !== undefined) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  nextSlide() {
    this.activeSlideIndex.update(index => (index + 1) % this.slides.length);
  }

  /**
   * Manual selection restarts the timer so the shown slide gets its full turn.
   */
  setSlide(index: number) {
    this.activeSlideIndex.set(index);
    // Manual selection restarts the timer so the shown slide gets its full turn.
    this.startSlider();
  }

  goToSlideLabel(index: number): string {
    const base = this.text(copy.slider.goToSlide);
    return `${base} ${index + 1}`;
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
