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
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <label class="inline-flex items-start gap-3 cursor-pointer select-none">
      <input
        [id]="id"
        [name]="name"
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        class="marsa-checkbox mt-0.5"
        (change)="onToggle($event)"
        (blur)="onBlur()"
      />
      <div class="flex flex-col text-sm">
        <span *ngIf="label" class="text-marsa-ink dark:text-marsa-dark-ink font-medium leading-tight">
          {{ label }}
          <span *ngIf="required" class="text-marsa-accent ml-0.5" aria-hidden="true">*</span>
        </span>
        <span *ngIf="description" class="text-xs text-marsa-muted dark:text-marsa-dark-muted mt-0.5">
          {{ description }}
        </span>
        <ng-content></ng-content>
      </div>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id?: string;
  @Input() name?: string;
  @Input() label?: string;
  @Input() description?: string;
  @Input() disabled = false;
  @Input() required = false;

  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  onToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    this.onChange(isChecked);
    this.checkedChange.emit(isChecked);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: any): void {
    this.checked = !!val;
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
