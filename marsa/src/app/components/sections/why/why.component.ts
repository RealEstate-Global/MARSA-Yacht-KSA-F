import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { whyData } from '../../../data/why.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

/**
 * Why Al Marsa — Image-Led Horizontal Slider Section.
 *
 * Design inspiration: Hill Robinson "Beyond management → What we do" section.
 * - Premium portrait-format image cards in a horizontal snap-scroll container.
 * - Arrow navigation controls (keyboard accessible).
 * - CSS scroll-snap for crisp card alignment.
 * - Touch/mouse drag support via pointer events.
 * - RTL-aware: reverses slide direction for Arabic locale.
 * - Respects prefers-reduced-motion.
 *
 * Implementation: pure CSS scroll-snap + JS scroll control.
 * No external slider library required.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why.component.html',
})
export class WhyComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly whyData = whyData;

  @ViewChild('track') private trackRef?: ElementRef<HTMLElement>;

  /** Zero-based index of the active / most-visible card. */
  activeIndex = 0;

  /** Whether the prev/next buttons should be disabled. */
  canPrev = false;
  canNext = true;

  /** Drag state for mouse/pointer dragging */
  private isDragging = false;
  private dragStartX = 0;
  private dragScrollLeft = 0;

  /** ResizeObserver to recompute button state after viewport changes */
  private resizeObserver?: ResizeObserver;

  /** IntersectionObserver for section reveal animation */
  private sectionObserver?: IntersectionObserver;

  /** Reduced-motion preference */
  private prefersReducedMotion = false;

  constructor(public preferences: SitePreferencesService) {}

  ngOnInit(): void {
    this.prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngAfterViewInit(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    // Keep button state in sync as user scrolls
    track.addEventListener('scroll', this.onTrackScroll, { passive: true });

    // Pointer drag support
    track.addEventListener('pointerdown', this.onPointerDown);
    track.addEventListener('pointermove', this.onPointerMove);
    track.addEventListener('pointerup', this.onPointerUp);
    track.addEventListener('pointercancel', this.onPointerUp);

    // Recompute on resize
    this.resizeObserver = new ResizeObserver(() => this.updateButtonState());
    this.resizeObserver.observe(track);

    this.updateButtonState();
  }

  ngOnDestroy(): void {
    const track = this.trackRef?.nativeElement;
    if (track) {
      track.removeEventListener('scroll', this.onTrackScroll);
      track.removeEventListener('pointerdown', this.onPointerDown);
      track.removeEventListener('pointermove', this.onPointerMove);
      track.removeEventListener('pointerup', this.onPointerUp);
      track.removeEventListener('pointercancel', this.onPointerUp);
    }
    this.resizeObserver?.disconnect();
    this.sectionObserver?.disconnect();
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  prev(): void {
    if (!this.canPrev) return;
    this.scrollToIndex(this.activeIndex - 1);
  }

  next(): void {
    if (!this.canNext) return;
    this.scrollToIndex(this.activeIndex + 1);
  }

  scrollToIndex(index: number): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const clampedIndex = Math.max(0, Math.min(index, this.whyData.cards.length - 1));
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.why-slide-card'));
    const targetCard = cards[clampedIndex];
    if (!targetCard) return;

    const isRtl = this.preferences.locale() === 'ar';

    if (isRtl) {
      // RTL: scroll from the right edge; cards flow right-to-left
      const trackWidth = track.offsetWidth;
      const cardRight = targetCard.offsetLeft + targetCard.offsetWidth;
      const scrollTarget = cardRight - trackWidth;
      track.scrollTo({
        left: scrollTarget,
        behavior: this.prefersReducedMotion ? 'instant' : 'smooth',
      });
    } else {
      track.scrollTo({
        left: targetCard.offsetLeft - (track as HTMLElement).offsetLeft,
        behavior: this.prefersReducedMotion ? 'instant' : 'smooth',
      });
    }

    this.activeIndex = clampedIndex;
    this.updateButtonState();
  }

  goToCard(index: number): void {
    this.scrollToIndex(index);
  }

  // ── Scroll state ────────────────────────────────────────────────────────────

  private onTrackScroll = (): void => {
    this.updateButtonState();
    this.updateActiveIndex();
  };

  private updateButtonState(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const tolerance = 4; // px tolerance for float rounding
    this.canPrev = track.scrollLeft > tolerance;
    this.canNext = track.scrollLeft < track.scrollWidth - track.clientWidth - tolerance;
  }

  private updateActiveIndex(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.why-slide-card'));
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const viewCenter = track.scrollLeft + track.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    this.activeIndex = closestIndex;
  }

  // ── Drag / pointer ──────────────────────────────────────────────────────────

  private onPointerDown = (e: PointerEvent): void => {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    this.isDragging = true;
    this.dragStartX = e.clientX - track.getBoundingClientRect().left;
    this.dragScrollLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
    track.style.cursor = 'grabbing';
    track.style.userSelect = 'none';
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.isDragging) return;
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const x = e.clientX - track.getBoundingClientRect().left;
    const delta = x - this.dragStartX;
    track.scrollLeft = this.dragScrollLeft - delta;
  };

  private onPointerUp = (_e: PointerEvent): void => {
    this.isDragging = false;
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    track.style.cursor = '';
    track.style.userSelect = '';
    this.updateActiveIndex();
    this.updateButtonState();
  };

  // ── Keyboard ────────────────────────────────────────────────────────────────

  @HostListener('keydown.arrowleft')
  onArrowLeft(): void {
    if (this.preferences.locale() === 'ar') {
      this.next();
    } else {
      this.prev();
    }
  }

  @HostListener('keydown.arrowright')
  onArrowRight(): void {
    if (this.preferences.locale() === 'ar') {
      this.prev();
    } else {
      this.next();
    }
  }

  // ── i18n helper ─────────────────────────────────────────────────────────────

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }

  get isRtl(): boolean {
    return this.preferences.locale() === 'ar';
  }
}
