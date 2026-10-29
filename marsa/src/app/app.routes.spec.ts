import { describe, it, expect } from 'vitest';
import { routes } from './app.routes';

describe('app routes', () => {
  it('redirects unknown paths to the home route', () => {
    const wildcard = routes.find((route) => route.path === '**');
    expect(wildcard).toBeDefined();
    expect(wildcard?.redirectTo).toBe('');
  });

  it('maps every section route onto a section anchor', () => {
    for (const route of routes) {
      if (route.path === '' || route.path === '**') {
        continue;
      }
      expect(route.data?.['anchor']).toBe(route.path!);
      expect(typeof route.loadComponent).toBe('function');
    }
  });

  it('covers all navigation sections the header links to', () => {
    const paths = routes.map((route) => route.path);
    for (const section of ['provisioning', 'destinations', 'about', 'contact']) {
      expect(paths).toContain(section);
    }
  });
});
