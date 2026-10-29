import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SitePreferencesService } from './site-preferences.service';
import { stubMatchMedia, clearMatchMediaStub } from '../testing/match-media';

describe('SitePreferencesService', () => {
  let service: SitePreferencesService;

  beforeEach(() => {
    localStorage.removeItem('marsa-locale');
    localStorage.removeItem('marsa-theme');
    stubMatchMedia(false);
    service = new SitePreferencesService();
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('resolves English copy for the en locale', () => {
    service.locale.set('en');
    expect(service.text({ en: 'Services', ar: 'الخدمات' })).toBe('Services');
  });

  it('resolves Arabic copy for the ar locale', () => {
    service.locale.set('ar');
    expect(service.text({ en: 'Services', ar: 'الخدمات' })).toBe('الخدمات');
  });

  it('toggles the locale and persists the choice', () => {
    expect(service.locale()).toBe('en');
    service.toggleLocale();
    expect(service.locale()).toBe('ar');
    expect(localStorage.getItem('marsa-locale')).toBe('ar');
    service.toggleLocale();
    expect(service.locale()).toBe('en');
    expect(localStorage.getItem('marsa-locale')).toBe('en');
  });

  it('restores a persisted locale on construction', () => {
    localStorage.setItem('marsa-locale', 'ar');
    const restored = new SitePreferencesService();
    expect(restored.locale()).toBe('ar');
  });
});
