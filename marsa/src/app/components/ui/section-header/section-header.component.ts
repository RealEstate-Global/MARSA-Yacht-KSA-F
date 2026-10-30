import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="containerClass"
      [class.text-center]="align === 'center'"
      [class.text-start]="align === 'start'"
    >
      <!-- Optional Eyebrow -->
      <div
        *ngIf="eyebrow"
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marsa-sea/10 dark:bg-marsa-dark-sand/10 border border-marsa-sea/20 dark:border-marsa-dark-sand/20 text-marsa-sea dark:text-marsa-dark-sand text-xs font-mono tracking-widest uppercase mb-4"
        [class.mx-auto]="align === 'center'"
      >
        <span *ngIf="hasPulse" class="w-2 h-2 rounded-full bg-marsa-sea dark:bg-marsa-dark-sand animate-pulse"></span>
        <span *ngIf="!hasPulse" class="inline-block w-4 h-px bg-current opacity-60"></span>
        <span>{{ eyebrow }}</span>
      </div>

      <!-- Main Heading -->
      <h2
        [id]="headingId"
        class="font-bold text-marsa-ink dark:text-marsa-dark-ink tracking-tight mb-4"
        [class.max-w-3xl]="align === 'center'"
        [class.mx-auto]="align === 'center'"
      >
        {{ heading }}
      </h2>

      <!-- Lead / Subtitle -->
      <p
        *ngIf="lead"
        class="text-base sm:text-lg text-marsa-ink/75 dark:text-marsa-dark-ink/70 leading-relaxed max-w-2xl"
        [class.mx-auto]="align === 'center'"
      >
        {{ lead }}
      </p>

      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  @Input() eyebrow?: string;
  @Input() heading!: string;
  @Input() lead?: string;
  @Input() align: 'center' | 'start' = 'center';
  @Input() hasPulse = false;
  @Input() headingId?: string;
  @Input() containerClass = 'mb-12 md:mb-16';
}
