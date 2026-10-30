import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Footer } from './footer';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { stubMatchMedia, clearMatchMediaStub } from '../../../testing/match-media';
import { linksData } from '../../../data/links.data';

describe('Footer', () => {
  let preferences: SitePreferencesService;
  let component: Footer;

  beforeEach(() => {
    stubMatchMedia(false);
    preferences = new SitePreferencesService();
    component = new Footer(preferences);
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('translates text according to active preferences', () => {
    const textObj = { en: 'Rights', ar: 'حقوق' };
    expect(component.text(textObj)).toBe('Rights');
  });

  it('exposes official and social copy links', () => {
    expect(linksData.official).toBe('https://almarsa.app/');
    expect(linksData.social.instagram).toBe('https://almarsa.app/');
  });
});

