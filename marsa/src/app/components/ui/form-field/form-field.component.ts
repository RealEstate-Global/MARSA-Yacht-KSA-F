import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex flex-col mb-4">
      <!-- Label -->
      <label
        *ngIf="label"
        [attr.for]="forId"
        class="marsa-form-label flex items-center justify-between"
      >
        <span>
          {{ label }}
          <span *ngIf="required" class="text-marsa-accent ml-0.5" aria-hidden="true">*</span>
        </span>
        <span *ngIf="optionalBadge" class="text-[10px] lowercase tracking-normal text-marsa-muted font-normal">
          ({{ optionalBadge }})
        </span>
      </label>

      <!-- Input Slot -->
      <div class="relative">
        <ng-content></ng-content>
      </div>

      <!-- Hint -->
      <p *ngIf="hint && !error" class="marsa-form-hint">
        {{ hint }}
      </p>

      <!-- Error Message -->
      <p *ngIf="error" class="marsa-form-error flex items-center gap-1" role="alert">
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() label?: string;
  @Input() forId?: string;
  @Input() required = false;
  @Input() optionalBadge?: string;
  @Input() hint?: string;
  @Input() error?: string;
}
