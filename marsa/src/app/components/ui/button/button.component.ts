import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'sea' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Anchor Link when href or routerLink is present -->
    <a
      *ngIf="href || routerLink"
      [routerLink]="routerLink"
      [fragment]="fragment"
      [href]="href"
      [target]="target"
      [rel]="target === '_blank' ? 'noopener noreferrer' : null"
      [attr.aria-label]="ariaLabel"
      [class]="computedClasses"
      [class.pointer-events-none]="disabled || loading"
      [class.opacity-60]="disabled"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </a>

    <!-- Standard Button -->
    <button
      *ngIf="!href && !routerLink"
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-label]="ariaLabel"
      [class]="computedClasses"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </button>

    <ng-template #buttonContent>
      <!-- Loading Spinner -->
      <svg
        *ngIf="loading"
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string;
  @Input() routerLink?: string | any[];
  @Input() fragment?: string;
  @Input() target?: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() ariaLabel?: string;
  @Input() customClass = '';

  get computedClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marsa-sand focus-visible:ring-offset-2 shrink-0 select-none';

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-[11px]',
      md: 'px-6 py-3 text-xs',
      lg: 'px-8 py-4 text-sm',
    };

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-marsa-sand hover:bg-marsa-sand-deep text-marsa-deep shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'border border-marsa-warm dark:border-white/15 bg-white/80 dark:bg-white/[0.04] text-marsa-ink dark:text-marsa-pearl hover:border-marsa-sea hover:text-marsa-sea dark:hover:border-marsa-dark-sand dark:hover:text-marsa-dark-sand font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
      sea: 'bg-marsa-sea hover:bg-marsa-deep text-white shadow-md hover:shadow-marsa-sea/30 hover:scale-[1.02] active:scale-[0.98]',
      outline: 'border border-marsa-sea/30 dark:border-white/20 hover:border-marsa-sea text-marsa-ink dark:text-white hover:bg-marsa-sea/5 dark:hover:bg-white/5 font-semibold',
      ghost: 'text-marsa-ink/80 dark:text-marsa-dark-ink/80 hover:text-marsa-sea dark:hover:text-marsa-dark-sand hover:bg-black/5 dark:hover:bg-white/5 font-medium',
    };

    return [
      base,
      sizes[this.size] || sizes.md,
      variants[this.variant] || variants.primary,
      this.fullWidth ? 'w-full' : '',
      this.disabled || this.loading ? 'cursor-not-allowed opacity-60' : '',
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
