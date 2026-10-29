import { describe, it, expect, afterEach, vi } from 'vitest';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { HeroComponent } from './hero.component';
import { stubMatchMedia, clearMatchMediaStub } from '../../../testing/match-media';

afterEach(() => {
  vi.restoreAllMocks();
  clearMatchMediaStub();
});

describe('HeroComponent motion preferences', () => {
  it('does not autoplay when the user prefers reduced motion', () => {
    stubMatchMedia(true);
    const component = new HeroComponent(new SitePreferencesService());
    vi.useFakeTimers();
    component.ngOnInit();
    vi.advanceTimersByTime(18000);
    expect(component.activeSlideIndex).toBe(0); // never advanced
    component.ngOnDestroy();
    vi.useRealTimers();
  });

  it('cycles slides automatically when motion is allowed', () => {
    stubMatchMedia(false);
    const component = new HeroComponent(new SitePreferencesService());
    vi.useFakeTimers();
    component.ngOnInit();
    vi.advanceTimersByTime(12000);
    expect(component.activeSlideIndex).toBe(2);
    component.ngOnDestroy();
    vi.useRealTimers();
  });

  it('stops the timer on destroy (no leaked intervals)', () => {
    stubMatchMedia(false);
    const component = new HeroComponent(new SitePreferencesService());
    vi.useFakeTimers();
    component.ngOnInit();
    component.ngOnDestroy();
    const before = component.activeSlideIndex;
    vi.advanceTimersByTime(24000);
    expect(component.activeSlideIndex).toBe(before);
    vi.useRealTimers();
  });

  it('has no duplicate slide images (issue #38 regression guard)', () => {
    stubMatchMedia(true);
    const component = new HeroComponent(new SitePreferencesService());
    expect(new Set(component.slides).size).toBe(component.slides.length);
    component.ngOnDestroy();
  });
});
