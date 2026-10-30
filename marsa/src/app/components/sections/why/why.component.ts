import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { whyData } from '../../../data/why.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

/**
 * Why Al Marsa — Hill Robinson Identical Sticky-Pinned Scroll.
 *
 * Exact implementation of Hill Robinson "Beyond management → What we do":
 * - Pin container (.all-cards-pin) with runway spacer (.all-cards-spacer).
 * - Sticky viewport stage (.all-cards-hor) pinned at top: 0 while scrolling.
 * - Each card (.cardHor) translates horizontally from the right (100vw -> 0vw)
 *   driven directly by vertical mouse-wheel / touch scroll progress:
 *   transform: translate3d(-50%, -50%, 0) translate3d(x + 'vw', 0, 0).
 * - Underlying cards scale down with depth perspective as incoming cards slide over.
 * - RTL-aware: Inverts slide direction for Arabic (enters from -100vw on the left).
 * - Accessible with prefers-reduced-motion fallback and keyboard jump points.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './why.component.html',
})
export class WhyComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly whyData = whyData;

  @ViewChild('pinContainer') private pinRef?: ElementRef<HTMLElement>;
  @ViewChildren('cardRef') private cardElements!: QueryList<ElementRef<HTMLElement>>;

  activeCardIndex = 0;
  lockDistance = 2400;

  private isDestroyed = false;
  private ticking = false;
  private scrollPerCard = 650;

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
      this.measure();
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      // Initial positioning
      this.updateCards();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }
  }

  private onResize = (): void => {
    this.measure();
    this.updateCards();
  };

  private onScroll = (): void => {
    if (this.ticking || this.isDestroyed) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      this.updateCards();
      this.ticking = false;
    });
  };

  /**
   * Measure the scroll runway identical to Hill Robinson scripts.js:
   * Calculates scroll distance per card and total pinned lock distance.
   */
  private measure(): void {
    if (typeof window === 'undefined') return;
    const n = this.whyData.cards.length;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const speedFactor = vw < 768 ? 1.0 : 1.4;
    this.scrollPerCard = Math.max(350, Math.round(vh * speedFactor));
    const endPad = Math.round(vh * 0.35);
    this.lockDistance = Math.max(0, (n - 1) * this.scrollPerCard + endPad);
  }

  /**
   * Exact Hill Robinson card translation:
   * Maps vertical scroll offset inside the pinned section into horizontal slide-in:
   *   y = Math.max(0, -pin.top)
   *   progress = clamp(0, n - 1, y / scrollPerCard)
   *   local = clamp(0, 1, progress - i + 1)
   *   x = 100 - local * 100
   *   transform = translate3d(-50%, -50%, 0) translate3d(x + 'vw', 0, 0)
   */
  private updateCards(): void {
    if (!this.pinRef || !this.cardElements) return;
    const pin = this.pinRef.nativeElement;
    const cards = this.cardElements.toArray();
    const n = cards.length;
    if (n === 0) return;

    const pinTop = pin.getBoundingClientRect().top;
    const y = Math.max(0, -pinTop);
    const progress = Math.max(0, Math.min(n - 1, y / this.scrollPerCard));

    this.activeCardIndex = Math.min(n - 1, Math.floor(progress + 0.35));

    // Direction multiplier: +1 in LTR (slide in from right), -1 in RTL (slide in from left)
    const dir = this.isRtl ? -1 : 1;

    // Check prefers-reduced-motion
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach((cardRef, i) => {
      const el = cardRef.nativeElement;
      if (reducedMotion) {
        el.style.transform =
          i === this.activeCardIndex
            ? 'translate3d(-50%, -50%, 0)'
            : 'translate3d(150vw, -50%, 0)';
        el.style.opacity = i === this.activeCardIndex ? '1' : '0';
        return;
      }

      // local progress for card i: 0 when off-screen to the right, 1 when fully centered
      const local = Math.max(0, Math.min(1, progress - i + 1));
      const x = (100 - local * 100) * dir;

      // Subtle scale and ambient depth for cards underneath
      const after = Math.max(0, progress - i);
      const scale = Math.max(0.92, 1 - 0.05 * after);
      const brightness = Math.max(0.78, 1 - 0.14 * after);

      el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(2)}vw, 0, 0) scale(${scale.toFixed(3)})`;
      el.style.filter = `brightness(${brightness.toFixed(2)})`;
    });
  }

  scrollToCard(index: number): void {
    if (typeof window === 'undefined' || !this.pinRef) return;
    const pin = this.pinRef.nativeElement;
    const pinAbsoluteTop = window.scrollY + pin.getBoundingClientRect().top;
    const targetScrollY = pinAbsoluteTop + index * this.scrollPerCard + 15;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }
}
