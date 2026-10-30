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

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <select
        [id]="id"
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-label]="ariaLabel"
        [class]="computedClasses"
        (change)="onChangeSelect($event)"
        (blur)="onBlur()"
      >
        <option *ngIf="placeholder" value="" disabled [selected]="!value">
          {{ placeholder }}
        </option>
        <option
          *ngFor="let opt of options"
          [value]="opt.value"
          [disabled]="opt.disabled"
          [selected]="opt.value === value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  @Input() id?: string;
  @Input() name?: string;
  @Input() options: SelectOption[] = [];
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() ariaLabel?: string;
  @Input() customClass = '';

  @Input() value: any = '';
  @Output() valueChange = new EventEmitter<any>();

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  get computedClasses(): string {
    const base = 'marsa-select';
    const state = this.invalid ? '!border-red-500 focus:!ring-red-400/20' : '';
    return [base, state, this.customClass].filter(Boolean).join(' ');
  }

  onChangeSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
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
