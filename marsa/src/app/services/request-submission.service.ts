import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, defer, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

/** A service/provisioning request as collected by either request form. */
export interface MarsaRequest {
  name: string;
  /** Full phone number when provided by the directory form. */
  phone?: string;
  email?: string;
  /** Yacht name when provided by the directory form. */
  yacht?: string;
  /** Onboard chef contact when provided by the directory form. */
  chef?: string;
  /** Free-form notes from the request modal. */
  notes?: string;
  /** Selected provisions-directory categories, if the form offers them. */
  items?: string[];
  /** The locale the user submitted the request in (`en` | `ar`). */
  locale: string;
}

/**
 * Sends collected request data to the configured backend endpoint.
 *
 * The service never reports success without a confirmed `POST` response; when
 * no endpoint is configured the returned observable errors immediately so the
 * UI can surface an honest failure state (issue #33).
 */
@Injectable({ providedIn: 'root' })
export class RequestSubmissionService {
  private readonly http = inject(HttpClient);

  submit(request: MarsaRequest): Observable<void> {
    const endpoint = environment.requestEndpoint;
    if (!endpoint) {
      return defer(() =>
        throwError(() => new Error('MARSA_REQUEST_ENDPOINT_NOT_CONFIGURED')),
      );
    }
    return this.http.post<void>(endpoint, request);
  }

  /** True when the error came from an unconfigured endpoint. */
  static isConfigurationError(error: unknown): boolean {
    return error instanceof Error && error.message === 'MARSA_REQUEST_ENDPOINT_NOT_CONFIGURED';
  }

  /** True for network-level failures (offline, DNS, CORS, 5xx). */
  static isConnectivityError(error: unknown): boolean {
    return error instanceof HttpErrorResponse;
  }
}
