import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Application-wide Angular error handler.
 * Retains a small in-memory diagnostic summary and logs framework-handled
 * errors to the console. This is not a UI error boundary and does not send
 * telemetry to an external service.
 */
@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private lastError: unknown = null;
  private errorCount = 0;

  handleError(error: unknown): void {
    this.lastError = error;
    this.errorCount++;

    // Safe error reporting in browser/node environments
    if (typeof console !== 'undefined' && console.error) {
      console.error('[Al Marsa Angular Error]:', error);
    }
  }

  getLastError(): unknown {
    return this.lastError;
  }

  getErrorCount(): number {
    return this.errorCount;
  }

  clearError(): void {
    this.lastError = null;
    this.errorCount = 0;
  }
}
