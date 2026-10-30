import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'surface' | 'glass' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content select="[card-header]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() padding: CardPadding = 'md';
  @Input() customClass = '';

  get computedClasses(): string {
    const base = 'rounded-marsa-md border flex flex-col gap-3 transition-all duration-300';

    const paddings: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const variants: Record<CardVariant, string> = {
      default: 'border-marsa-warm/80 dark:border-white/[0.08] bg-white dark:bg-marsa-dark-card shadow-[0_4px_24px_rgba(20,42,43,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.36)]',
      surface: 'border-marsa-line/30 dark:border-white/10 bg-marsa-surface dark:bg-marsa-dark-surface shadow-sm',
      glass: 'border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md shadow-lg',
      interactive: 'border-marsa-warm/80 dark:border-white/[0.08] bg-white dark:bg-marsa-dark-card shadow-[0_4px_24px_rgba(20,42,43,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(20,42,43,0.08)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] cursor-pointer',
    };

    return [
      base,
      paddings[this.padding] || paddings.md,
      variants[this.variant] || variants.default,
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
