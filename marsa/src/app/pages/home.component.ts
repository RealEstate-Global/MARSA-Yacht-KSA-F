import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { copy } from '../data/content';
import { SitePreferencesService } from '../services/site-preferences.service';
import { RequestSubmissionService } from '../services/request-submission.service';
import { Header } from '../components/layout/header/header';
import { Footer } from '../components/layout/footer/footer';
import { HeroComponent } from '../components/sections/hero/hero.component';
import { IntroComponent } from '../components/sections/intro/intro.component';
import { ServicesComponent } from '../components/sections/services/services.component';
import { ProductsComponent } from '../components/sections/products/products.component';
import { DestinationsComponent } from '../components/sections/destinations/destinations.component';
import { AboutComponent } from '../components/sections/about/about.component';
import { TestimonialsComponent } from '../components/sections/testimonials/testimonials.component';
import { CtaComponent } from '../components/sections/cta/cta.component';
import {
  LucideArrowUpRight,
  LucideX,
  LucideCheck,
} from '@lucide/angular';

/** Lifecycle of a single request-service submission. */
type SubmissionState = 'idle' | 'sending' | 'error';

@Component({
  selector: 'marsa-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Footer,
    HeroComponent,
    IntroComponent,
    ServicesComponent,
    ProductsComponent,
    DestinationsComponent,
    AboutComponent,
    TestimonialsComponent,
    CtaComponent,
    // Lucide icon directives (attribute-selector standalone components)
    LucideArrowUpRight,
    LucideX,
    LucideCheck,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly copy = copy;
  readonly preferences: SitePreferencesService;
  isMenuOpen = false;
  isRequestOpen = false;

  /** Modal form state */
  requestName = '';
  requestEmail = '';
  requestNotes = '';
  requestError = '';
  requestReceived = false;
  submissionState: SubmissionState = 'idle';

  private readonly submission = inject(RequestSubmissionService);
  private readonly route: ActivatedRoute;
  private observer?: IntersectionObserver;
  private sendSubscription?: Subscription;
  /** Element that opened the dialog, refocused when it closes. */
  private lastTrigger: HTMLElement | null = null;

  @ViewChild('page') private page?: ElementRef<HTMLElement>;
  @ViewChild('requestClose') private requestClose?: ElementRef<HTMLButtonElement>;
  @ViewChild('requestFirstField') private requestFirstField?: ElementRef<HTMLInputElement>;

  constructor(preferences: SitePreferencesService, route: ActivatedRoute) {
    this.preferences = preferences;
    this.route = route;
  }

  ngAfterViewInit(): void {
    const anchor = this.route.snapshot.data['anchor'] as string | undefined;
    if (anchor) {
      window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 150);
    }

    this.observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    this.page?.nativeElement.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sendSubscription?.unsubscribe();
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }

  setMenuOpen(isOpen: boolean): void {
    this.isMenuOpen = isOpen;
  }

  openRequest(): void {
    // Remember the invoking element so focus can return to it on close.
    if (document.activeElement instanceof HTMLElement) {
      this.lastTrigger = document.activeElement;
    }
    // Reopening always starts from a clean, error-free state (no retained data).
    this.resetRequestForm();
    this.isRequestOpen = true;
    window.setTimeout(() => this.requestFirstField?.nativeElement.focus(), 0);
  }

  closeRequest(): void {
    if (!this.isRequestOpen) {
      return;
    }
    this.sendSubscription?.unsubscribe();
    this.isRequestOpen = false;
    this.lastTrigger?.focus();
    this.lastTrigger = null;
  }

  /** Localized message for a touched-and-invalid control; '' when valid. */
  fieldError(form: NgForm, controlName: string): string {
    const control = form.form.get(controlName);
    if (!control || control.valid || !(control.touched || control.dirty)) {
      return '';
    }
    if (control.errors?.['required']) {
      return this.text(copy.form.fieldRequired);
    }
    if (control.errors?.['email'] || control.errors?.['pattern']) {
      return this.text(copy.form.invalidEmail);
    }
    return this.text(copy.form.fieldRequired);
  }

  submitRequest(form: NgForm): void {
    if (this.submissionState === 'sending') {
      return; // ignore double submissions
    }
    if (form.invalid) {
      form.form.markAllAsTouched();
      this.requestError = '';
      return;
    }
    this.requestError = '';
    this.submissionState = 'sending';
    this.sendSubscription?.unsubscribe();
    this.sendSubscription = this.submission
      .submit({
        name: this.requestName,
        email: this.requestEmail,
        notes: this.requestNotes,
        locale: this.preferences.locale(),
      })
      .subscribe({
        next: () => {
          this.submissionState = 'idle';
          // A confirmed delivery ends the interaction; clear collected data.
          this.resetRequestForm();
          this.requestReceived = true;
        },
        error: (error: unknown) => {
          this.submissionState = 'error';
          this.requestError = RequestSubmissionService.isConfigurationError(error)
            ? this.text(copy.form.submissionUnavailable)
            : this.text(copy.form.submissionFailed);
          console.error('Request submission failed:', error);
        },
      });
  }

  private resetRequestForm(): void {
    this.requestName = '';
    this.requestEmail = '';
    this.requestNotes = '';
    this.requestError = '';
    this.submissionState = 'idle';
    this.requestReceived = false;
  }
}
