import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
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
  slides = [
    '/assets/marsa-hero.jpg',
    '/assets/marsa-deck.jpg',
    '/assets/marsa-marina.jpg',
    '/assets/marsa-coastline.jpg',
  ];
  activeSlideIndex = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  constructor(public preferences: SitePreferencesService) {}

  ngOnInit() {
    this.startSlider();
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
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  }

  setSlide(index: number) {
    this.activeSlideIndex = index;
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
