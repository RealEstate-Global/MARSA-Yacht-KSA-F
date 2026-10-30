import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { whyData } from '../../../data/why.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

/**
 * Why Al Marsa — Hill Robinson-Style Vertical Stacking Cards Section.
 *
 * Direct implementation of Hill Robinson "Beyond management → What we do":
 * - Natural vertical page scroll drives the interaction.
 * - Cards are stacked vertically (.all-cards).
 * - Each card (.card1) is sticky at the top threshold (position: sticky; top: 96px).
 * - As the user scrolls down, each card locks into place, while underlying cards
 *   scale down with perspective depth (perspective(1200px) scale(0.90..0.96)).
 * - Each card features an editorial maritime photo, eyebrow badge, title,
 *   description, and an "Explore Fleet" CTA.
 * - Bidirectional (LTR & RTL) support with zero layout glitch.
 * - Fully accessible and compliant with prefers-reduced-motion.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './why.component.html',
})
export class WhyComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly whyData = whyData;

  @ViewChildren('cardElement') private cardElements!: QueryList<ElementRef<HTMLElement>>;

  private isDestroyed = false;
  private ticking = false;

  constructor(public preferences: SitePreferencesService) {}

  get isRtl(): boolean {
    return this.preferences.locale() === 'ar';
  }

  text(val?: { en: string; ar: string }): string {
    return val ? this.preferences.text(val) : '';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      // Calculate initial layout
      this.updateCardTransforms();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
  }

  private onScroll = (): void => {
    if (this.ticking || this.isDestroyed) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      this.updateCardTransforms();
      this.ticking = false;
    });
  };

  /**
   * Hill Robinson exact perspective and scaling transform:
   * When each card reaches the sticky threshold beneath the header,
   * previous cards scale down and gain perspective depth:
   * Card 0: scale(0.90)
   * Card 1: scale(0.93)
   * Card 2: scale(0.96)
   * Last/active card: scale(1.0)
   */
  private updateCardTransforms(): void {
    if (!this.cardElements) return;
    const cards = this.cardElements.toArray();
    const count = cards.length;
    if (count === 0) return;

    // Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      cards.forEach((cardRef) => {
        cardRef.nativeElement.style.transform = 'none';
        cardRef.nativeElement.style.filter = 'none';
      });
      return;
    }

    const stickyTop = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 96;

    cards.forEach((cardRef, index) => {
      const el = cardRef.nativeElement;
      const rect = el.getBoundingClientRect();
      const fromTop = rect.top;
      const isLast = index === count - 1;

      // When the card has stuck to the top threshold
      if (fromTop <= stickyTop + 10) {
        if (isLast) {
          el.style.transform = 'perspective(1200px) scale(1)';
          el.style.filter = 'brightness(1)';
        } else {
          // Card scaling based on index progression as on Hill Robinson
          const baseScale = 0.9 + index * 0.03;
          el.style.transform = `perspective(1200px) scale(${baseScale.toFixed(3)})`;
          // Subtle ambient depth dimming
          const brightness = 0.85 + index * 0.05;
          el.style.filter = `brightness(${brightness.toFixed(2)})`;
        }
      } else {
        // Natural position before reaching sticky top
        el.style.transform = 'perspective(1200px) scale(1)';
        el.style.filter = 'brightness(1)';
      }
    });
  }
}
