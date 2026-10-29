import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import {
  RequestSubmissionService,
} from './request-submission.service';

describe('RequestSubmissionService', () => {
  let service: RequestSubmissionService;
  const originalEndpoint = environment.requestEndpoint;

  beforeEach(() => {
    environment.requestEndpoint = '';
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(RequestSubmissionService);
  });

  afterEach(() => {
    environment.requestEndpoint = originalEndpoint;
  });

  it('errors honestly when no endpoint is configured', () => {
    let caught: unknown;
    service.submit({ name: 'Guest', locale: 'en' }).subscribe({
      error: (error: unknown) => (caught = error),
    });
    expect(caught).toBeInstanceOf(Error);
    expect((caught as Error).message).toBe('MARSA_REQUEST_ENDPOINT_NOT_CONFIGURED');
  });

  it('classifies the missing-endpoint failure as a configuration error', () => {
    const error = new Error('MARSA_REQUEST_ENDPOINT_NOT_CONFIGURED');
    expect(RequestSubmissionService.isConfigurationError(error)).toBe(true);
    expect(RequestSubmissionService.isConnectivityError(error)).toBe(false);
  });

  it('classifies HTTP failures as connectivity errors', () => {
    const error = new HttpErrorResponse({ status: 502, statusText: 'Bad Gateway' });
    expect(RequestSubmissionService.isConnectivityError(error)).toBe(true);
    expect(RequestSubmissionService.isConfigurationError(error)).toBe(false);
  });
});
