import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type LandPalette = 'dawn' | 'alpine' | 'dusk' | 'mist';

export type Slide = {
  image?: string;
  title?: string;
  caption?: string;
  alt?: string;
  palette?: LandPalette;
  seed?: number;
};

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
export function stringY(x: number, w: number, y0: number, sag: number): number {
  if (w <= 0) return y0;
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

/** One step of a critically damped spring toward target. */
export function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

/** One step of a print's swing. */
export function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}

export function pad2(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

const PALETTES = {
  dawn: { top: '#e7b7a5', bottom: '#f8e8d6', sun: '#fff4df', far: '#d2b2bb', near: '#3a2a3b', mist: '255,240,232' },
  alpine: { top: '#7ea5c8', bottom: '#e3ecf2', sun: '#ffffff', far: '#a9bfd0', near: '#1c3044', mist: '236,244,250' },
  dusk: { top: '#2a2450', bottom: '#ef8d60', sun: '#ffd9a6', far: '#93607c', near: '#18121f', mist: '255,196,160' },
  mist: { top: '#c4d0cb', bottom: '#eef1ec', sun: '#ffffff', far: '#aebcb5', near: '#2c3a33', mist: '246,248,245' },
};

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(h: string): [number, number, number] {
  const v = parseInt(h.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function mixRgb(a: string, b: string, t: number): string {
  const A = hexRgb(a);
  const B = hexRgb(b);
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')';
}

function paintLandscape(seed: number, palette: LandPalette, w = 1600, h = 1000): string {
  if (typeof document === 'undefined') return '';
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) return '';
  const P = PALETTES[palette] ?? PALETTES.dawn;
  const r = mulberry32(seed * 104729 + 7);

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, P.top);
  sky.addColorStop(1, P.bottom);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);

  const sx = w * (0.22 + r() * 0.56);
  const sy = h * (0.26 + r() * 0.16);
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45);
  halo.addColorStop(0, 'rgba(' + hexRgb(P.sun).join(',') + ',.85)');
  halo.addColorStop(0.08, 'rgba(' + hexRgb(P.sun).join(',') + ',.55)');
  halo.addColorStop(1, 'rgba(' + hexRgb(P.sun).join(',') + ',0)');
  g.fillStyle = halo;
  g.fillRect(0, 0, w, h);

  g.fillStyle = P.sun;
  g.beginPath();
  g.arc(sx, sy, h * 0.045, 0, Math.PI * 2);
  g.fill();

  const layers = 5;
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1);
    const base = h * (0.42 + k * 0.4);
    const amp = h * (0.07 + k * 0.1);
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2);
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8];
    const ridge = (x: number) => {
      const u = x / w;
      return (
        base -
        amp *
          (0.55 * Math.sin(u * fr[0] + ph[0]) +
            0.28 * Math.sin(u * fr[1] + ph[1]) +
            0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
            0.05 * Math.sin(u * fr[3] + ph[3]))
      );
    };
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4);
    mist.addColorStop(0, 'rgba(' + P.mist + ',0)');
    mist.addColorStop(1, 'rgba(' + P.mist + ',' + (0.55 - k * 0.35).toFixed(2) + ')');
    g.fillStyle = mist;
    g.fillRect(0, base - amp * 1.4, w, amp * 1.8);

    const body = g.createLinearGradient(0, base - amp, 0, h);
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)));
    g.fillStyle = body;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x));
    g.lineTo(w, h);
    g.closePath();
    g.fill();

    if (L >= layers - 2) {
      g.fillStyle = mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.08));
      for (let x = 0; x < w; x += 7 + r() * 9) {
        if (r() < 0.35) continue;
        const y = ridge(x) + 2;
        const th = h * (0.025 + r() * 0.035) * (0.6 + k);
        const tw = th * 0.32;
        g.beginPath();
        g.moveTo(x, y - th);
        g.lineTo(x + tw, y);
        g.lineTo(x - tw, y);
        g.closePath();
        g.fill();
      }
    }
  }

  const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,.32)');
  g.fillStyle = vig;
  g.fillRect(0, 0, w, h);

  const grain = g.getImageData(0, 0, w, h);
  const d = grain.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (r() - 0.5) * 14;
    d[i] += v;
    d[i + 1] += v;
    d[i + 2] += v;
  }
  g.putImageData(grain, 0, 0);
  return c.toDataURL('image/jpeg', 0.88);
}

const DEFAULT_SLIDES: Slide[] = [
  { title: 'First Light', caption: 'Haze lifting off the eastern ridges.', palette: 'dawn', seed: 3 },
  { title: 'High Pass', caption: 'Cold air, clear to the far range.', palette: 'alpine', seed: 8 },
  { title: 'Ember Hour', caption: 'The last of the sun on the valley floor.', palette: 'dusk', seed: 14 },
  { title: 'Still Valley', caption: 'Morning mist that never quite lifts.', palette: 'mist', seed: 21 },
  { title: 'Rose Ridge', caption: 'Five ridges, one long exhale.', palette: 'dawn', seed: 34 },
  { title: 'Blue Hour', caption: 'Pines going dark against the snow.', palette: 'alpine', seed: 55 },
];

@Component({
  selector: 'app-polaroid-line-carousel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pl-container" [class]="className">
      <!-- ── String Canvas Stage ── -->
      <div
        #rootRef
        class="pl-root"
        dir="ltr"
        [attr.data-drag]="dragging ? '1' : '0'"
        role="region"
        aria-roledescription="carousel"
        [attr.aria-label]="ariaLabel"
        tabindex="0"
        (mouseenter)="isHovered = true"
        (mouseleave)="isHovered = false"
        (keydown)="onKey($event)"
        (pointerdown)="onDown($event)"
        (pointermove)="onMove($event)"
        (pointerup)="onUp($event)"
        (pointercancel)="onUp($event)"
        [style.height]="computedHeight"
        [style.--pl-bg]="background"
        [style.--pl-ink]="ink"
        [style.--pl-cw]="size.cw + 'px'"
      >
        <!-- The Sagging Wire/String -->
        <svg class="pl-string" aria-hidden="true">
          <path #pathRef fill="none" [attr.stroke]="string" stroke-width="1.8" stroke-linecap="round" />
        </svg>

        <!-- Repeated Cards for Seamless Infinite Track -->
        <div
          *ngFor="let item of displayCards; let j = index"
          #cardRef
          class="pl-card"
          [attr.data-j]="j"
          [attr.data-slide]="item.slideIndex"
          [attr.data-on]="item.slideIndex === active ? '1' : '0'"
          [attr.aria-hidden]="item.slideIndex === active ? null : 'true'"
          (click)="goToItem(j)"
        >
          <div class="pl-print">
            <div class="pl-shot">
              <img
                *ngIf="slideImages[item.slideIndex]"
                [src]="slideImages[item.slideIndex]"
                [alt]="slides[item.slideIndex]?.alt || slides[item.slideIndex]?.title || ''"
                draggable="false"
                loading="lazy"
              />
            </div>
            <div class="pl-note">{{ slides[item.slideIndex]?.title || '' }}</div>
          </div>
          <div class="pl-peg"></div>
        </div>
      </div>

      <!-- ── Integrated Responsive Text Under Cards (Clean Typography Only) ── -->
      <div class="pl-details-wrap">
        <div class="pl-caption-box" [attr.dir]="isRtl ? 'rtl' : 'ltr'">
          <h3 *ngIf="currentSlide.title" class="pl-cap-title">
            {{ currentSlide.title }}
          </h3>
          <p *ngIf="currentSlide.caption" class="pl-cap-desc">
            {{ currentSlide.caption }}
          </p>
        </div>
      </div>

      <div class="pl-sr" aria-live="polite">
        {{ 'Print ' + (active + 1) + ' of ' + slides.length + (currentSlide.title ? ': ' + currentSlide.title : '') }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .pl-container {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ── The String Canvas Stage ── */
    .pl-root {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--pl-bg, transparent);
      color: var(--pl-ink, currentColor);
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      outline: none;
      cursor: grab;
      --pl-muted: rgba(255, 255, 255, 0.6);
      --pl-line: rgba(255, 255, 255, 0.15);
    }

    .pl-root[data-drag='1'] {
      cursor: grabbing;
    }

    .pl-root:focus-visible {
      box-shadow: inset 0 0 0 2px var(--pl-ink, #2f7772);
    }

    .pl-string {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
      opacity: 0.85;
    }

    /* ── Cards & Hanging Physics ── */
    .pl-card {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--pl-cw, 320px);
      transform-origin: 50% 0;
      will-change: transform;
      cursor: pointer;
    }

    .pl-print {
      margin-top: 12px;
      background: #fbfaf7;
      padding: 12px 12px 8px;
      border-radius: 6px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15), 0 18px 30px -16px rgba(0, 0, 0, 0.4);
      transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.45s ease, opacity 0.45s ease, box-shadow 0.45s ease;
    }

    :host-context(.dark) .pl-print {
      background: #0d2127;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 20px 40px -15px rgba(0, 0, 0, 0.7);
    }

    /* ── Active Card: Large, Elevated, Glowing Contrast ── */
    .pl-card[data-on='1'] .pl-print {
      transform: scale(1.18);
      opacity: 1;
      filter: saturate(1.08) brightness(1.02);
      box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.5), 0 0 35px rgba(47, 119, 114, 0.35);
      z-index: 50;
      border: 1px solid rgba(47, 119, 114, 0.35);
    }

    :host-context(.dark) .pl-card[data-on='1'] .pl-print {
      box-shadow: 0 28px 70px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 212, 199, 0.25);
      border-color: rgba(168, 212, 199, 0.4);
    }

    /* Inactive Cards: Smaller, Softly Dimmed */
    .pl-card[data-on='0'] .pl-print {
      transform: scale(0.85);
      opacity: 0.68;
      filter: saturate(0.65) brightness(0.88);
    }

    .pl-shot {
      position: relative;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      border-radius: 4px;
      background: #112830;
    }

    .pl-shot img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
      display: block;
      pointer-events: none;
      transition: transform 0.6s ease;
    }

    .pl-card[data-on='1'] .pl-shot img {
      transform: scale(1.03);
    }

    .pl-note {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      font: italic 500 15px/1.2 ui-serif, Georgia, 'Times New Roman', serif;
      color: #2a3439;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    :host-context(.dark) .pl-note {
      color: #e5eceb;
    }

    /* Wooden Peg */
    .pl-peg {
      position: absolute;
      left: 50%;
      top: 0;
      width: 11px;
      height: 28px;
      margin-left: -5.5px;
      border-radius: 2px;
      background: linear-gradient(90deg, #c9a67a, #e5cfad 45%, #b58d59);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
      z-index: 10;
    }

    .pl-peg::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 9px;
      width: 3px;
      height: 8px;
      background: rgba(70, 50, 25, 0.5);
      border-radius: 1px;
    }

    /* ── Integrated Responsive Text Under Cards (Clean Typography Only) ── */
    .pl-details-wrap {
      position: relative;
      width: 100%;
      max-width: 720px;
      margin: 1.5rem auto 0;
      padding: 0 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 20;
    }

    /* Title & Caption */
    .pl-caption-box {
      width: 100%;
      min-height: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pl-cap-title {
      font-size: clamp(1.4rem, 3.2vw, 2.2rem);
      font-weight: 700;
      font-family: var(--font-serif, ui-serif, Georgia, serif);
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: #17242d;
      margin: 0 0 0.45rem;
      animation: pl-fade-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    :host-context(.dark) .pl-cap-title {
      color: #f5f2eb;
    }

    .pl-cap-desc {
      font-size: clamp(0.875rem, 1.6vw, 1.05rem);
      line-height: 1.65;
      color: rgba(23, 36, 45, 0.72);
      max-width: 48ch;
      margin: 0 auto;
      animation: pl-fade-up 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    :host-context(.dark) .pl-cap-desc {
      color: rgba(245, 242, 235, 0.75);
    }

    .pl-sr {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }

    @keyframes pl-fade-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pl-cap-title,
      .pl-cap-desc {
        animation: none;
      }
      .pl-print {
        transition: none;
      }
    }
  `],
})
export class PolaroidLineCarouselComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() slides: Slide[] = DEFAULT_SLIDES;
  @Input() height: number | string = '580px';
  @Input() cardWidth = 320;
  @Input() sag = 44;
  @Input() swing = 1;
  @Input() autoplay = 5000;
  @Input() string = '#8a7f72';
  @Input() background = 'transparent';
  @Input() ink = 'currentColor';
  @Input() className = '';
  @Input() ariaLabel = 'Image carousel';
  @Input() isRtl = false;

  @Output() onChange = new EventEmitter<number>();

  @ViewChild('rootRef') rootRef?: ElementRef<HTMLDivElement>;
  @ViewChild('pathRef') pathRef?: ElementRef<SVGPathElement>;
  @ViewChildren('cardRef') cardRefs!: QueryList<ElementRef<HTMLDivElement>>;

  active = 0;
  dragging = false;
  size = { w: 1200, h: 580, cw: 320 };
  slideImages: string[] = [];

  /** Repeated virtual items to guarantee a continuous, infinite track */
  displayCards: { virtualIndex: number; slideIndex: number }[] = [];
  readonly REPEATS = 3;
  isHovered = false;

  private sim = { off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] };
  private drag: null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean } = null;
  private lastTouch = 0;
  private activeRef = 0;
  private rafId = 0;
  private autoplayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isDestroyed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  get computedHeight(): string {
    return typeof this.height === 'number' ? `${this.height}px` : this.height;
  }

  get currentSlide(): Slide {
    return this.slides[this.active] || {};
  }

  get spacing(): number {
    return this.size.cw * 1.12;
  }

  pad(n: number): string {
    return pad2(n);
  }

  ngOnInit(): void {
    this.buildDisplayCards();
    this.prepareImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slides'] && !changes['slides'].firstChange) {
      this.buildDisplayCards();
      this.prepareImages();
      this.cdr.markForCheck();
    }
    if (changes['cardWidth'] && !changes['cardWidth'].firstChange) {
      this.updateCardWidth();
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    if (this.rootRef?.nativeElement) {
      const r = this.rootRef.nativeElement.getBoundingClientRect();
      if (r.width > 0) {
        const cw = Math.round(Math.max(160, Math.min(this.cardWidth, r.width * 0.44, (r.height || 580) * 0.46)));
        this.size = { w: r.width, h: r.height || 580, cw };
        this.sim.target = this.activeRef * this.spacing;
        this.sim.off = this.activeRef * this.spacing;
      }
    }

    this.initResizeObserver();
    this.initIntersectionObserver();
    this.initAutoplay();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }

  private buildDisplayCards(): void {
    const n = this.slides.length;
    if (n === 0) {
      this.displayCards = [];
      return;
    }
    const total = n * this.REPEATS;
    const cards: { virtualIndex: number; slideIndex: number }[] = [];
    for (let j = 0; j < total; j++) {
      cards.push({ virtualIndex: j, slideIndex: j % n });
    }
    this.displayCards = cards;
  }

  private prepareImages(): void {
    this.slideImages = this.slides.map((s, i) => {
      if (s.image) return s.image;
      return paintLandscape(s.seed ?? i + 1, s.palette || 'dawn');
    });
  }

  private updateCardWidth(): void {
    if (!this.rootRef?.nativeElement) return;
    const r = this.rootRef.nativeElement.getBoundingClientRect();
    const cw = Math.round(Math.max(160, Math.min(this.cardWidth, r.width * 0.44, (r.height || 580) * 0.46)));
    this.size = { w: r.width, h: r.height || 580, cw };
    this.cdr.markForCheck();
  }

  private initResizeObserver(): void {
    const root = this.rootRef?.nativeElement;
    if (!root || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      const cw = Math.round(Math.max(160, Math.min(this.cardWidth, r.width * 0.44, (r.height || 580) * 0.46)));
      this.size = { w: r.width, h: r.height || 580, cw };
      this.cdr.markForCheck();
    });
    this.resizeObserver.observe(root);
  }

  private initIntersectionObserver(): void {
    const root = this.rootRef?.nativeElement;
    if (!root) return;

    let visible = true;
    let prev = performance.now();

    const frame = (now: number) => {
      this.rafId = 0;
      if (!visible || this.isDestroyed) return;

      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;

      const { w, h, cw } = this.size;
      const y0 = Math.max(34, h * 0.18);
      const d = this.drag;
      const S = this.sim;
      const n = this.slides.length;
      if (n === 0) return;

      const spacing = this.spacing;
      const M = this.displayCards.length;
      const L = M * spacing; // Full wrap cycle length

      let lineVel: number;
      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        [S.off, S.vel] = springStep(S.off, S.vel, S.target, dt);
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const g = reduce ? 0 : this.swing;

      // Active slide calculation in infinite space
      const currentStep = Math.round(S.off / spacing);
      const near = wrap(currentStep, n);

      const cardEls = this.cardRefs ? this.cardRefs.toArray() : [];

      for (let j = 0; j < M; j++) {
        const elRef = cardEls[j];
        if (!elRef) continue;
        const el = elRef.nativeElement;

        // Toroidal wrapping calculation: cards wrap seamlessly across bounds
        const baseOffset = j * spacing - S.off;
        let diff = ((baseOffset + L / 2) % L);
        if (diff < 0) diff += L;
        diff -= L / 2;

        const x = w / 2 + diff;

        // Offscreen culling for performance
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = 'hidden';
          continue;
        }

        el.style.visibility = 'visible';

        // Swing inertia
        let a = S.a[j] || 0;
        let av = S.w[j] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1300 + j * 1.7) * 0.0009 * g;
        S.a[j] = a;
        S.w[j] = av;

        const distFromCenter = Math.abs(x - w / 2);
        const isCenterActive = distFromCenter < spacing * 0.52;

        const y = stringY(x, w, y0, this.sag) - 6;
        el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px, ${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
        el.style.zIndex = String(Math.max(1, Math.round(100 - distFromCenter / 8)));
        el.setAttribute('data-on', isCenterActive ? '1' : '0');
      }

      // Draw sagging curve
      if (this.pathRef?.nativeElement) {
        this.pathRef.nativeElement.setAttribute(
          'd',
          `M0 ${y0} Q${w / 2} ${y0 + 2 * this.sag} ${w} ${y0}`
        );
      }

      // Notify parent & trigger template updates
      if (near !== this.activeRef) {
        this.activeRef = near;
        this.active = near;
        this.onChange.emit(near);
        this.cdr.markForCheck();
      }

      this.rafId = requestAnimationFrame(frame);
    };

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !this.rafId) {
          prev = performance.now();
          this.rafId = requestAnimationFrame(frame);
        }
      });
      this.intersectionObserver.observe(root);
    }

    this.rafId = requestAnimationFrame(frame);
  }

  private initAutoplay(): void {
    if (!this.autoplay || this.slides.length < 2) return;

    this.autoplayTimer = window.setInterval(() => {
      if (
        document.hidden ||
        this.drag ||
        this.isHovered ||
        performance.now() - this.lastTouch < this.autoplay
      )
        return;

      // Infinite forward step without snapping
      const currentStep = Math.round(this.sim.target / this.spacing);
      this.goToStep(currentStep + 1);
    }, this.autoplay);
  }

  /** Step to a discrete integer step in infinite track */
  goToStep(step: number): void {
    this.sim.target = step * this.spacing;
    this.cdr.markForCheck();
  }

  /** Direct slide jump via shortest path around loop */
  goToSlide(targetSlideIndex: number): void {
    this.lastTouch = performance.now();
    const n = this.slides.length;
    if (n === 0) return;

    const currentStep = Math.round(this.sim.target / this.spacing);
    const currentSlide = wrap(currentStep, n);
    let diff = targetSlideIndex - currentSlide;

    // Shortest path around circle
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;

    this.goToStep(currentStep + diff);
  }

  /** Jump directly to clicked virtual item */
  goToItem(j: number): void {
    this.lastTouch = performance.now();
    const M = this.displayCards.length;
    const L = M * this.spacing;
    const baseOffset = j * this.spacing - this.sim.off;
    let diff = ((baseOffset + L / 2) % L);
    if (diff < 0) diff += L;
    diff -= L / 2;

    this.sim.target = this.sim.off + diff;
    this.cdr.markForCheck();
  }

  onKey(e: KeyboardEvent): void {
    const currentStep = Math.round(this.sim.target / this.spacing);
    if (e.key === 'ArrowRight') this.goToStep(currentStep + 1);
    else if (e.key === 'ArrowLeft') this.goToStep(currentStep - 1);
    else return;
    e.preventDefault();
  }

  onDown(e: PointerEvent): void {
    this.lastTouch = performance.now();
    this.drag = {
      x: e.clientX,
      off: this.sim.off,
      lx: e.clientX,
      lt: e.timeStamp,
      v: 0,
      moved: false,
    };
  }

  onMove(e: PointerEvent): void {
    const d = this.drag;
    if (!d) return;

    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      this.dragging = true;
      this.rootRef?.nativeElement.setPointerCapture(e.pointerId);
    }

    if (!d.moved) return;

    const dt = Math.max(1, e.timeStamp - d.lt);
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
    d.lx = e.clientX;
    d.lt = e.timeStamp;

    // Free continuous infinite dragging in both directions (no boundary stop)
    this.sim.off = d.off - dx;
  }

  onUp(e: PointerEvent): void {
    const d = this.drag;
    this.drag = null;
    this.lastTouch = performance.now();

    if (!d) return;

    if (d.moved) {
      this.dragging = false;
      this.sim.vel = -d.v * 1000;
      // Snap to nearest integer card position with flick inertia
      const targetStep = Math.round((this.sim.off - d.v * 200) / this.spacing);
      this.goToStep(targetStep);
      return;
    }

    const card = (e.target as HTMLElement).closest('[data-j]');
    if (card) {
      const j = Number(card.getAttribute('data-j'));
      this.goToItem(j);
    }
  }
}
