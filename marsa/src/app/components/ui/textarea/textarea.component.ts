import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <textarea
        [id]="id"
        [name]="name"
        [rows]="rows"
        [value]="value"
        [placeholder]="placeholder || ''"
        [disabled]="disabled"
        [readOnly]="readonly"
        [required]="required"
        [attr.maxlength]="maxlength"
        [attr.aria-label]="ariaLabel"
        [class]="computedClasses"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>

      <!-- Optional Character Counter -->
      <div
        *ngIf="showCount && maxlength"
        class="text-right text-[11px] text-marsa-muted dark:text-marsa-dark-muted mt-1"
      >
        {{ (value || '').length }} / {{ maxlength }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() id?: string;
  @Input() name?: string;
  @Input() rows = 4;
  @Input() placeholder?: string;
  @Input() maxlength?: number;
  @Input() showCount = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() ariaLabel?: string;
  @Input() customClass = '';

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  get computedClasses(): string {
    const base = 'marsa-textarea';
    const state = this.invalid ? '!border-red-500 focus:!ring-red-400/20' : '';
    return [base, state, this.customClass].filter(Boolean).join(' ');
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: any): void {
    this.value = val !== undefined && val !== null ? String(val) : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
