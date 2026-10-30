import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Global Error Handler providing an application-wide error boundary.
 * Captures uncaught frontend exceptions cleanly, prevents unexpected UI crashes,
 * and records runtime diagnostic telemetry safely.
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
      console.error('[Al Marsa Frontend Error Boundary]:', error);
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
