import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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

export function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1));
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
    <div
      #rootRef
      class="pl-root"
      [class]="className"
      [attr.data-drag]="dragging ? '1' : '0'"
      role="region"
      aria-roledescription="carousel"
      [attr.aria-label]="ariaLabel"
      tabindex="0"
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
      <svg class="pl-string" aria-hidden="true">
        <path #pathRef fill="none" [attr.stroke]="string" stroke-width="1.5" stroke-linecap="round" />
      </svg>

      <div
        *ngFor="let sl of slides; let i = index"
        #cardRef
        class="pl-card"
        [attr.data-i]="i"
        [attr.data-on]="i === active ? '1' : '0'"
        [attr.aria-hidden]="i === active ? null : 'true'"
      >
        <div class="pl-print">
          <div class="pl-shot">
            <img
              *ngIf="slideImages[i]"
              [src]="slideImages[i]"
              [alt]="sl.alt || sl.title || ''"
              draggable="false"
              loading="lazy"
            />
          </div>
          <div class="pl-note">{{ sl.title || '' }}</div>
        </div>
        <div class="pl-peg"></div>
      </div>

      <div class="pl-bar">
        <div class="pl-cap" aria-hidden="true">
          <span *ngIf="currentSlide.title" class="pl-title">{{ currentSlide.title }}</span>
          <span *ngIf="currentSlide.caption" class="pl-sub">{{ currentSlide.caption }}</span>
        </div>
        <span class="pl-count" aria-hidden="true">
          <b>{{ pad(active + 1) }}</b> / {{ pad(slides.length) }}
        </span>
        <button type="button" class="pl-btn" aria-label="Previous" (click)="step(-1)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.4" />
          </svg>
        </button>
        <button type="button" class="pl-btn" aria-label="Next" (click)="step(1)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.4" />
          </svg>
        </button>
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

    .pl-root {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--pl-bg, var(--color-background, #efece6));
      color: var(--pl-ink, var(--color-foreground, #161513));
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      outline: none;
      cursor: grab;
      --pl-muted: color-mix(in srgb, var(--pl-ink, #161513) 55%, transparent);
      --pl-line: color-mix(in srgb, var(--pl-ink, #161513) 18%, transparent);
    }

    .pl-root[data-drag='1'] {
      cursor: grabbing;
    }

    .pl-root:focus-visible {
      box-shadow: inset 0 0 0 2px var(--pl-ink, #161513);
    }

    .pl-string {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    }

    .pl-card {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--pl-cw, 300px);
      transform-origin: 50% 0;
      will-change: transform;
      cursor: inherit;
    }

    .pl-print {
      margin-top: 10px;
      background: #fbfaf7;
      padding: 10px 10px 0;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 18px 30px -16px rgba(0, 0, 0, 0.4);
      transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.5s ease;
    }

    .pl-card[data-on='0'] .pl-print {
      transform: scale(0.9);
      filter: saturate(0.7) brightness(0.96);
    }

    .pl-shot {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 2px;
      background: #d9d5cc;
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
    }

    .pl-note {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      font: italic 400 15px/1.1 ui-serif, Georgia, 'Times New Roman', serif;
      color: #3b3833;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pl-peg {
      position: absolute;
      left: 50%;
      top: 0;
      width: 10px;
      height: 26px;
      margin-left: -5px;
      border-radius: 2px;
      background: linear-gradient(90deg, #c9a67a, #e3c9a1 45%, #b8915f);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
    }

    .pl-peg::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 8px;
      width: 2px;
      height: 7px;
      background: rgba(80, 60, 30, 0.45);
      border-radius: 1px;
    }

    .pl-bar {
      position: absolute;
      left: clamp(16px, 4vw, 56px);
      right: clamp(16px, 4vw, 56px);
      bottom: clamp(20px, 4vh, 40px);
      display: flex;
      align-items: center;
      gap: clamp(12px, 2vw, 24px);
      cursor: default;
      z-index: 50;
    }

    .pl-cap {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      padding-bottom: 0.15em;
    }

    .pl-title {
      display: block;
      font: 500 clamp(18px, 2.2vw, 26px)/1.15 ui-serif, Georgia, 'Times New Roman', serif;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      animation: pl-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .pl-sub {
      display: block;
      margin-top: 4px;
      font: 400 13px/1.4 ui-sans-serif, system-ui, sans-serif;
      color: var(--pl-muted);
      animation: pl-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .pl-count {
      font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
      letter-spacing: 0.14em;
      color: var(--pl-muted);
    }

    .pl-count b {
      color: var(--pl-ink);
      font-weight: 500;
    }

    .pl-btn {
      appearance: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--pl-line);
      background: transparent;
      color: inherit;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .pl-btn:hover {
      background: var(--pl-ink);
      color: var(--pl-bg, #efece6);
    }

    .pl-btn:focus-visible {
      outline: 2px solid var(--pl-ink);
      outline-offset: 2px;
    }

    .pl-sr {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }

    @keyframes pl-in {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: none;
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pl-title,
      .pl-sub {
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
  @Input() height: number | string = '100svh';
  @Input() cardWidth = 300;
  @Input() sag = 46;
  @Input() swing = 1;
  @Input() autoplay = 4500;
  @Input() string = '#8a7f72';
  @Input() background = 'var(--color-background, #efece6)';
  @Input() ink = 'var(--color-foreground, #161513)';
  @Input() className = '';
  @Input() ariaLabel = 'Image carousel';

  @Output() onChange = new EventEmitter<number>();

  @ViewChild('rootRef') rootRef?: ElementRef<HTMLDivElement>;
  @ViewChild('pathRef') pathRef?: ElementRef<SVGPathElement>;
  @ViewChildren('cardRef') cardRefs!: QueryList<ElementRef<HTMLDivElement>>;

  active = 0;
  dragging = false;
  size = { w: 1200, h: 800, cw: 300 };
  slideImages: string[] = [];

  private sim = { off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] };
  private drag: null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean } = null;
  private lastTouch = 0;
  private activeRef = 0;
  private rafId = 0;
  private autoplayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isDestroyed = false;

  get computedHeight(): string {
    return typeof this.height === 'number' ? `${this.height}px` : this.height;
  }

  get currentSlide(): Slide {
    return this.slides[this.active] || {};
  }

  get spacing(): number {
    return this.size.cw * 1.08;
  }

  pad(n: number): string {
    return pad2(n);
  }

  ngOnInit(): void {
    this.prepareImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slides']) {
      this.prepareImages();
      this.resetSimulation();
    }
    if (changes['cardWidth'] && !changes['cardWidth'].firstChange) {
      this.updateCardWidth();
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

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

  private prepareImages(): void {
    this.slideImages = this.slides.map((s, i) => {
      if (s.image) return s.image;
      return paintLandscape(s.seed ?? i + 1, s.palette || 'dawn');
    });
  }

  private resetSimulation(): void {
    this.sim.off = this.activeRef * this.spacing;
    this.sim.target = this.activeRef * this.spacing;
    this.sim.vel = 0;
    this.sim.a = [];
    this.sim.w = [];
  }

  private updateCardWidth(): void {
    if (!this.rootRef?.nativeElement) return;
    const r = this.rootRef.nativeElement.getBoundingClientRect();
    const cw = Math.round(Math.max(150, Math.min(this.cardWidth, r.width * 0.42, r.height * 0.42)));
    this.size = { w: r.width, h: r.height, cw };
    this.sim.target = this.activeRef * this.spacing;
    this.sim.off = this.activeRef * this.spacing;
  }

  private initResizeObserver(): void {
    const root = this.rootRef?.nativeElement;
    if (!root || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      const cw = Math.round(Math.max(150, Math.min(this.cardWidth, r.width * 0.42, r.height * 0.42)));
      this.size = { w: r.width, h: r.height, cw };
      this.sim.target = this.activeRef * this.spacing;
      this.sim.off = this.activeRef * this.spacing;
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
      const y0 = Math.max(40, h * 0.2);
      const d = this.drag;
      const S = this.sim;
      const n = this.slides.length;
      const spacing = this.spacing;

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
      const near = nearestAt(S.off, spacing, n);

      const cardEls = this.cardRefs ? this.cardRefs.toArray() : [];
      for (let i = 0; i < n; i++) {
        const elRef = cardEls[i];
        if (!elRef) continue;
        const el = elRef.nativeElement;

        const x = w / 2 + i * spacing - S.off;
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = 'hidden';
          continue;
        }

        el.style.visibility = 'visible';
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g;
        S.a[i] = a;
        S.w[i] = av;

        const y = stringY(x, w, y0, this.sag) - 6;
        el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px, ${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
        el.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near));
      }

      if (this.pathRef?.nativeElement) {
        this.pathRef.nativeElement.setAttribute(
          'd',
          `M0 ${y0} Q${w / 2} ${y0 + 2 * this.sag} ${w} ${y0}`
        );
      }

      if (near !== this.activeRef) {
        this.activeRef = near;
        this.active = near;
        this.onChange.emit(near);
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
        performance.now() - this.lastTouch < this.autoplay
      )
        return;
      const nextIndex = this.activeRef >= this.slides.length - 1 ? 0 : this.activeRef + 1;
      this.goTo(nextIndex);
    }, this.autoplay);
  }

  goTo(i: number): void {
    const n = this.slides.length;
    this.sim.target = clamp(i, 0, n - 1) * this.spacing;
  }

  step(dir: number): void {
    this.lastTouch = performance.now();
    const n = this.slides.length;
    this.goTo(clamp(this.activeRef + dir, 0, n - 1));
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
    else return;
    e.preventDefault();
  }

  onDown(e: PointerEvent): void {
    if ((e.target as HTMLElement).closest('.pl-bar')) return;
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

    const max = (this.slides.length - 1) * this.spacing;
    let off = d.off - dx;
    if (off < 0) off *= 0.35;
    if (off > max) off = max + (off - max) * 0.35;
    this.sim.off = off;
  }

  onUp(e: PointerEvent): void {
    const d = this.drag;
    this.drag = null;
    this.lastTouch = performance.now();

    if (!d) return;

    if (d.moved) {
      this.dragging = false;
      this.sim.vel = -d.v * 1000;
      this.goTo(nearestAt(this.sim.off - d.v * 180, this.spacing, this.slides.length));
      return;
    }

    const card = (e.target as HTMLElement).closest('[data-i]');
    if (card) {
      this.goTo(Number(card.getAttribute('data-i')));
    }
  }
}
