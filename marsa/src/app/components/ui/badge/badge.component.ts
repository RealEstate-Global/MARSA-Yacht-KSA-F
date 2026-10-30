import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'sea' | 'sand' | 'pearl' | 'outline';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="computedClasses">
      <span
        *ngIf="pulse"
        class="w-2 h-2 rounded-full animate-pulse"
        [ngClass]="pulseDotClass"
        aria-hidden="true"
      ></span>
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'sm';
  @Input() pulse = false;
  @Input() customClass = '';

  get computedClasses(): string {
    const base = 'inline-flex items-center gap-2 rounded-full font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300';

    const sizes: Record<BadgeSize, string> = {
      sm: 'px-3 py-1 text-[11px]',
      md: 'px-3.5 py-1.5 text-xs',
    };

    const variants: Record<BadgeVariant, string> = {
      default: 'bg-marsa-sea/10 dark:bg-marsa-dark-sand/10 border border-marsa-sea/20 dark:border-marsa-dark-sand/20 text-marsa-sea dark:text-marsa-dark-sand',
      sea: 'bg-marsa-sea text-white border border-marsa-sea-bright/30 shadow-sm',
      sand: 'bg-marsa-sand/20 text-marsa-sand-deep dark:text-marsa-dark-sand border border-marsa-sand/30',
      pearl: 'bg-marsa-pearl dark:bg-marsa-dark-surface text-marsa-ink dark:text-marsa-dark-ink border border-marsa-line/40 dark:border-white/10',
      outline: 'border border-marsa-warm/80 dark:border-white/15 text-marsa-ink/80 dark:text-white/80',
    };

    return [
      base,
      sizes[this.size] || sizes.sm,
      variants[this.variant] || variants.default,
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get pulseDotClass(): string {
    switch (this.variant) {
      case 'sea':
        return 'bg-white';
      case 'sand':
        return 'bg-marsa-sand-deep dark:bg-marsa-dark-sand';
      default:
        return 'bg-marsa-sea dark:bg-marsa-dark-sand';
    }
  }
}
