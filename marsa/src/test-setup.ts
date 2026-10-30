/**
 * Global Vitest setup — imported before every test file.
 *
 * Importing '@angular/compiler' here makes JIT compilation available so
 * partially-compiled Angular injectables (like PlatformLocation from
 * @angular/common) can be used inside Vitest's jsdom environment without
 * triggering the "JIT compiler not available" error.
 */
import '@angular/compiler';
