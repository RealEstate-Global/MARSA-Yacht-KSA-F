import { describe, it, expect } from 'vitest';
import { routes } from './app.routes';

/** Section anchors that exist on the aligned lookbook page. */
const VALID_ANCHORS = new Set(['why', 'how', 'about', 'download']);

describe('app routes', () => {
  it('resolves unknown paths and /404 to the NotFoundComponent', async () => {
    const wildcard = routes.find((route) => route.path === '**');
    const notFound = routes.find((route) => route.path === '404');
    expect(wildcard?.loadComponent).toBeTypeOf('function');
    expect(notFound?.loadComponent).toBeTypeOf('function');

    const [wildcardComponent, notFoundComponent] = await Promise.all([
      wildcard!.loadComponent!(),
      notFound!.loadComponent!(),
    ]);
    expect(wildcardComponent).toBe(notFoundComponent);
    expect(wildcardComponent).toHaveProperty('name', 'NotFoundComponent');
  });

  it('maps legacy section routes onto real lookbook section anchors', () => {
    const expectedAnchors: Record<string, string | undefined> = {
      services: 'how',
      provisioning: 'how',
      about: 'about',
      contact: 'download',
      destinations: 'how',
    };
    for (const [path, anchor] of Object.entries(expectedAnchors)) {
      const route = routes.find((r) => r.path === path);
      expect(route, path).toBeDefined();
      expect(route?.data?.['anchor'], path).toBe(anchor);
      expect(typeof route?.loadComponent, path).toBe('function');
    }
  });

  it('never points an anchor at a section that no longer exists', () => {
    for (const route of routes) {
      const anchor = route.data?.['anchor'] as string | undefined;
      if (anchor) {
        expect(VALID_ANCHORS.has(anchor), `anchor "${anchor}"`).toBe(true);
      }
    }
  });

  it('keeps the canonical single-page home route', () => {
    const home = routes.find((route) => route.path === '');
    expect(home?.pathMatch).toBe('full');
    expect(typeof home?.loadComponent).toBe('function');
  });
});
