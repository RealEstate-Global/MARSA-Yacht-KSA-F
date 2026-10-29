import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { copy } from '../data/content';
import { SitePreferencesService } from '../services/site-preferences.service';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { stubMatchMedia, clearMatchMediaStub } from '../testing/match-media';

/**
 * Builds a HomeComponent in an injection context so its `inject()` calls
 * resolve, with a fresh NgForm mirroring the request modal's controls.
 */
let activeForm: NgForm;

function createComponent(): HomeComponent {
  const preferences = new SitePreferencesService();
  const component = TestBed.runInInjectionContext(
    () => new HomeComponent(preferences, {} as ActivatedRoute),
  );

  activeForm = new NgForm([], []);
  activeForm.form.addControl('name', new FormControl('', Validators.required));
  activeForm.form.addControl('email', new FormControl('', [Validators.required, Validators.email]));
  activeForm.form.addControl('notes', new FormControl(''));
  return component;
}

describe('HomeComponent request modal', () => {
  beforeEach(() => {
    stubMatchMedia(false);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('reports no error for untouched fields', () => {
    const component = createComponent();
    expect(component.fieldError(activeForm, 'name')).toBe('');
  });

  it('announces a required-field error only after interaction', () => {
    const component = createComponent();
    const name = activeForm.form.get('name')!;
    name.markAsTouched();
    expect(component.fieldError(activeForm, 'name')).toBe(copy.form.fieldRequired.en);

    name.setValue('Mostafa');
    expect(component.fieldError(activeForm, 'name')).toBe('');
  });

  it('distinguishes missing email from malformed email', () => {
    const component = createComponent();
    const email = activeForm.form.get('email')!;
    email.markAsTouched();
    expect(component.fieldError(activeForm, 'email')).toBe(copy.form.fieldRequired.en);

    email.setValue('not-an-email');
    expect(component.fieldError(activeForm, 'email')).toBe(copy.form.invalidEmail.en);
  });

  it('blocks submission and marks touched when the form is invalid', () => {
    const component = createComponent();
    component.submitRequest(activeForm);
    expect(component.submissionState).not.toBe('sending');
    expect(component.requestReceived).toBe(false);
    expect(activeForm.form.get('name')!.touched).toBe(true);
  });

  it('fails honestly instead of faking success when no endpoint is configured', () => {
    const component = createComponent();
    activeForm.form.get('name')!.setValue('Guest');
    activeForm.form.get('email')!.setValue('guest@example.com');
    component.submitRequest(activeForm);
    expect(component.submissionState).toBe('error');
    expect(component.requestReceived).toBe(false);
    expect(component.requestError).toBe(copy.form.submissionUnavailable.en);
  });

  it('starts every open from a clean state without retained data', () => {
    const component = createComponent();
    component.requestName = 'stale';
    component.requestEmail = 'stale@example.com';
    component.openRequest();
    expect(component.requestName).toBe('');
    expect(component.requestEmail).toBe('');
    expect(component.isRequestOpen).toBe(true);
  });
});
