import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for Al Marsa unit tests.
 *
 * Uses jsdom so browser globals (localStorage, document, window,
 * matchMedia, etc.) are available in the test environment.
 *
 * setupFiles imports @angular/compiler before every spec so partially-compiled
 * Angular injectables (PlatformLocation etc.) work under JIT in jsdom.
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['src/test-setup.ts'],
  },
});
