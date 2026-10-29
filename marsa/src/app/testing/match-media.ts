/**
 * jsdom does not implement `window.matchMedia`; services and the hero slider
 * call it on construction. Tests that construct such classes must install a
 * stub first.
 */
export function stubMatchMedia(matches: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }),
  });
}

export function clearMatchMediaStub(): void {
  try {
    delete (window as { matchMedia?: unknown }).matchMedia;
  } catch {
    // ignore when not configurable (nothing was stubbed)
  }
}
