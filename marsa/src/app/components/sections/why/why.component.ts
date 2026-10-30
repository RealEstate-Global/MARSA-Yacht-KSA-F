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
 * Ported verbatim from Hill Robinson scripts.js lines 31-39:
 *
 *   var $pin = $('.all-cards-pin');
 *   var $track = $pin.find('.all-cards-hor');
 *   var $cards = $track.find('.cardHor');
 *
 *   function update() {
 *     var scrollPerCard = $pin.data('scrollPerCard') || 1;
 *     var y = Math.max(0, -$pin[0].getBoundingClientRect().top);
 *     var progress = Math.max(0, Math.min(n - 1, y / scrollPerCard));
 *     $cards.each(function(i) {
 *       var local = Math.max(0, Math.min(1, progress - i + 1));
 *       var x = 100 - local * 100;
 *       this.style.transform =
 *         "translate3d(-50%, -50%, 0) translate3d(" + x + "vw, 0, 0)";
 *     });
 *   }
 *
 * Key structural requirements (from their HTML):
 *   .all-cards-pin   → position: relative  (scroll runway wrapper)
 *   .all-cards-hor   → position: sticky; top: 0; height: 100vh  (locked viewport)
 *   .cardHor         → position: absolute; top: 50%; left: 50%  (each card)
 *   .all-cards-spacer → SIBLING of .all-cards-hor  (vertical runway length)
 *
 * RTL-aware: direction multiplied by -1 for Arabic locale.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './why.component.html',
})
export class WhyComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly whyData = whyData;

  /** The outer pin container — used to read getBoundingClientRect().top */
  @ViewChild('pinContainer') private pinRef?: ElementRef<HTMLElement>;

  /** The sticky stage — used only for height measurement */
  @ViewChild('horStage') private stageRef?: ElementRef<HTMLElement>;

  /** The individual card elements — JS drives their transform */
  @ViewChildren('cardRef') private cardElements!: QueryList<ElementRef<HTMLElement>>;

  /** Active card index for dot nav */
  activeCardIndex = 0;

  /** Vertical runway height (px) — bound to spacer [style.height.px] */
  lockDistance = 2400;

  private isDestroyed = false;
  private ticking = false;

  /** Cached scroll-per-card distance (px) — updated on resize */
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
    if (typeof window === 'undefined') return;
    this.measure();
    this.update();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('orientationchange', this.onResize, { passive: true });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
  }

  // ─── Private event handlers ───────────────────────────────────────────────

  private onResize = (): void => {
    this.measure();
    this.update();
  };

  private onScroll = (): void => {
    if (this.ticking || this.isDestroyed) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  };

  // ─── Core: measure() — mirrors Hill Robinson scripts.js measure() ─────────

  /**
   * Calculates scrollPerCard and lockDistance.
   * Mirrors Hill Robinson's getSpeedFactor / getEndPad / measure():
   *
   *   function getSpeedFactor() {
   *     if (lastW < 451) return 0.85;
   *     if (lastW < 769) return 1;
   *     return 2;
   *   }
   *   function getEndPad() {
   *     if (lastW < 451) return stableVH * 0.55;
   *     if (lastW < 769) return stableVH * 0.45;
   *     return stableVH * 0.2;
   *   }
   *   scrollPerCard = availH * speedFactor;
   *   lockDistance  = (n - 1) * scrollPerCard + endPad;
   */
  private measure(): void {
    if (typeof window === 'undefined') return;
    const n = this.whyData.cards.length;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Header height offset (matches Hill Robinson's headerH logic)
    const headerH = vw <= 768 ? 70 : 90;
    const availH = Math.max(200, vh - headerH);

    // Speed factor and end pad (exact Hill Robinson values)
    let speedFactor: number;
    let endPad: number;
    if (vw < 451) {
      speedFactor = 0.85;
      endPad = vh * 0.55;
    } else if (vw < 769) {
      speedFactor = 1.0;
      endPad = vh * 0.45;
    } else {
      speedFactor = 2.0;
      endPad = vh * 0.2;
    }

    this.scrollPerCard = availH * speedFactor;
    this.lockDistance = Math.max(0, (n - 1) * this.scrollPerCard + endPad);
  }

  // ─── Core: update() — EXACT Hill Robinson update() function ──────────────

  /**
   * Exact port of Hill Robinson scripts.js update():
   *
   *   var y = Math.max(0, -$pin[0].getBoundingClientRect().top);
   *   var progress = Math.max(0, Math.min(n - 1, y / scrollPerCard));
   *   $cards.each(function(i) {
   *     var local = Math.max(0, Math.min(1, progress - i + 1));
   *     var x = 100 - local * 100;
   *     this.style.transform =
   *       "translate3d(-50%, -50%, 0) translate3d(" + x + "vw, 0, 0)";
   *   });
   */
  private update(): void {
    if (!this.pinRef || !this.cardElements) return;
    const pin = this.pinRef.nativeElement;
    const cards = this.cardElements.toArray();
    const n = cards.length;
    if (n === 0) return;

    // y = vertical scroll consumed INSIDE the pin container
    const y = Math.max(0, -pin.getBoundingClientRect().top);

    // progress: 0 when no scroll, up to (n-1) when fully scrolled
    const progress = Math.max(0, Math.min(n - 1, y / this.scrollPerCard));

    // Update active dot
    this.activeCardIndex = Math.min(n - 1, Math.floor(progress + 0.35));

    // Reduced motion: instant snap, no translate animation
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // RTL direction multiplier (HR doesn't have RTL, we add it)
    const dir = this.isRtl ? -1 : 1;

    cards.forEach((cardRef, i) => {
      const el = cardRef.nativeElement;

      if (reducedMotion) {
        el.style.transform =
          i === this.activeCardIndex
            ? 'translate3d(-50%, -50%, 0)'
            : `translate3d(${dir * 150}vw, -50%, 0)`;
        return;
      }

      // local: 0 → card is 100vw off-screen to the right
      //         1 → card is fully centred (x = 0vw)
      const local = Math.max(0, Math.min(1, progress - i + 1));
      const x = (100 - local * 100) * dir;

      // Exact Hill Robinson transform — no scale, no brightness (HR doesn't use them)
      el.style.transform =
        `translate3d(-50%, -50%, 0) translate3d(${x}vw, 0, 0)`;
    });
  }

  // ─── Public: scrollToCard() — quick-jump for dot nav ─────────────────────

  scrollToCard(index: number): void {
    if (typeof window === 'undefined' || !this.pinRef) return;
    const pin = this.pinRef.nativeElement;
    const pinAbsTop = window.scrollY + pin.getBoundingClientRect().top;
    const target = pinAbsTop + index * this.scrollPerCard + 15;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}
