import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GlobalErrorHandler } from './error-handler.service';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;

  beforeEach(() => {
    handler = new GlobalErrorHandler();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('captures uncaught runtime errors without throwing', () => {
    const error = new Error('Test charter runtime error');
    expect(() => handler.handleError(error)).not.toThrow();
    expect(handler.getLastError()).toBe(error);
    expect(handler.getErrorCount()).toBe(1);
  });

  it('increments error count on repeated errors', () => {
    handler.handleError(new Error('First failure'));
    handler.handleError(new Error('Second failure'));
    expect(handler.getErrorCount()).toBe(2);
  });

  it('clears error state when requested', () => {
    handler.handleError(new Error('Failure'));
    handler.clearError();
    expect(handler.getLastError()).toBeNull();
    expect(handler.getErrorCount()).toBe(0);
  });
});
