import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { copy, LocalizedText, SiteCopy } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { RequestSubmissionService } from '../../../services/request-submission.service';
import { LucideCheck } from '@lucide/angular';
import { environment } from '../../../../environments/environment';

/** Lifecycle of a single provisions-directory submission. */
type SubmissionState = 'idle' | 'sending' | 'received' | 'error';

/** One selectable provisions-directory category. */
interface CategoryOption {
  key: string;
  label: LocalizedText;
}

const GALLEY_KEYS = ['meat', 'fish', 'dairy', 'fruit', 'bread', 'beverages', 'herbs', 'bespoke', 'general'] as const;
const INTERIOR_KEYS = ['toiletries', 'flowers', 'janitorial', 'crew'] as const;

const option = (key: (typeof GALLEY_KEYS)[number] | (typeof INTERIOR_KEYS)[number]): CategoryOption => ({
  key,
  label: copy.form[key as keyof SiteCopy['form']] as LocalizedText,
});

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideCheck],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  copy = copy;

  /** Selectable provisions-directory categories, split by galley/interior. */
  readonly galleyItems: CategoryOption[] = GALLEY_KEYS.map(option);
  readonly interiorItems: CategoryOption[] = INTERIOR_KEYS.map(option);
  readonly checked: Partial<Record<string, boolean>> = {};

  // Contact fields (template-driven)
  requestName = '';
  requestPhone = '';
  requestYacht = '';
  requestChef = '';
  requestError = signal('');

  // Signal: written by the HTTP subscription, not a template listener, so
  // zoneless change detection needs a signal notification.
  submissionState = signal<SubmissionState>('idle');

  private readonly submission = inject(RequestSubmissionService);
  private readonly preferences: SitePreferencesService;
  private sendSubscription?: Subscription;

  constructor(preferences: SitePreferencesService) {
    this.preferences = preferences;
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }

  /** English category labels, as the canonical payload for the backend. */
  private selectedLabels(): string[] {
    return [...this.galleyItems, ...this.interiorItems]
      .filter((item) => this.checked[item.key])
      .map((item) => item.label.en);
  }

  /** Localized error message for a touched-and-invalid control; '' when valid. */
  fieldError(form: NgForm, controlName: string): string {
    const control = form.form.get(controlName);
    if (!control || control.valid || !(control.touched || control.dirty)) {
      return '';
    }
    return this.text(copy.form.fieldRequired);
  }

  errorMessage(): string {
    return environment.requestEndpoint
      ? this.text(copy.form.submissionFailed)
      : this.text(copy.form.submissionUnavailable);
  }

  submitForm(form: NgForm, event: Event): void {
    event.preventDefault();
    if (this.submissionState() === 'sending') {
      return; // ignore double submissions
    }
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.requestError.set('');
    this.submissionState.set('sending');
    this.sendSubscription?.unsubscribe();
    this.sendSubscription = this.submission
      .submit({
        name: this.requestName,
        phone: this.requestPhone,
        yacht: this.requestYacht,
        chef: this.requestChef || undefined,
        items: this.selectedLabels(),
        locale: this.preferences.locale(),
      })
      .subscribe({
        next: () => {
          this.submissionState.set('received');
          this.resetForm();
        },
        error: (error: unknown) => {
          this.submissionState.set('error');
          this.requestError.set(this.errorMessage());
          console.error('Directory submission failed:', error);
        },
      });
  }

  private resetForm(): void {
    this.requestName = '';
    this.requestPhone = '';
    this.requestYacht = '';
    this.requestChef = '';
    for (const key of Object.keys(this.checked)) {
      this.checked[key] = false;
    }
    this.requestError.set('');
  }
}
