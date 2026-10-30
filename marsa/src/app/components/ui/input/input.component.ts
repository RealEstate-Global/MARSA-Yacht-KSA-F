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
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <input
        [id]="id"
        [name]="name"
        [type]="type"
        [value]="value"
        [placeholder]="placeholder || ''"
        [disabled]="disabled"
        [readOnly]="readonly"
        [required]="required"
        [attr.aria-label]="ariaLabel"
        [class]="computedClasses"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() id?: string;
  @Input() name?: string;
  @Input() type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'url' | 'date' = 'text';
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() ariaLabel?: string;
  @Input() customClass = '';

  @Input() value: string | number = '';
  @Output() valueChange = new EventEmitter<string | number>();

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  get computedClasses(): string {
    const base = 'marsa-input';
    const state = this.invalid ? '!border-red-500 focus:!ring-red-400/20' : '';
    return [base, state, this.customClass].filter(Boolean).join(' ');
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: any): void {
    this.value = val !== undefined && val !== null ? val : '';
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
