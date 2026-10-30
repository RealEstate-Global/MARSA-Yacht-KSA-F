import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { copy } from '../data/content';
import { SitePreferencesService } from '../services/site-preferences.service';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { stubMatchMedia, clearMatchMediaStub } from '../testing/match-media';

/**
 * The lookbook is form-free: booking happens in the Al Marsa app, so HomeComponent
 * exposes no request-modal state. These tests guard that contract plus the
 * localization helper.
 */
describe('HomeComponent', () => {
  function createComponent(): HomeComponent {
    const preferences = new SitePreferencesService();
    return TestBed.runInInjectionContext(
      () => new HomeComponent(preferences, {} as ActivatedRoute),
    );
  }

  beforeEach(() => {
    stubMatchMedia(false);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('keeps the homepage focused on the app-based lookbook experience', () => {
    createComponent();
    expect(copy.hero.primary.en.toLowerCase()).toContain('app');
    expect(copy.download.visit.en.toLowerCase()).toContain('visit');
  });

  it('points internal sections at real anchors used by nav and routes', () => {
    expect(copy.hero.primary.en.toLowerCase()).toContain('app');
    expect(copy.footer.rights.ar).toContain('المرسى');
    expect(copy.links.official).toBe('https://almarsa.app/');
  });
});
