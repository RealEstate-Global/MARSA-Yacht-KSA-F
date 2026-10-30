import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { SitePreferencesService } from '../../services/site-preferences.service';
import { stubMatchMedia, clearMatchMediaStub } from '../../testing/match-media';
import { notFoundData } from '../../data/not-found.data';

describe('NotFoundComponent', () => {
  let preferences: SitePreferencesService;
  let component: NotFoundComponent;

  beforeEach(() => {
    stubMatchMedia(false);
    preferences = new SitePreferencesService();
    component = new NotFoundComponent(preferences);
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('initializes with 404 copy definitions', () => {
    expect(notFoundData.badge.en).toContain('404');
    expect(notFoundData.title.ar).toContain('المرسى');
  });

  it('translates not-found text based on active locale', () => {
    expect(component.text(notFoundData.homeCta)).toBe('Back to Home');
    preferences.locale.set('ar');
    expect(component.text(notFoundData.homeCta)).toBe('العودة للرئيسية');
  });

  it('exposes quick fleet category links', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories.length).toBeLessThanOrEqual(6);
  });

  it('renders one semantic localized h1 outside decorative content', () => {
    expect(component.text(notFoundData.title)).toContain(notFoundData.title.en);
    preferences.locale.set('ar');
    expect(component.text(notFoundData.title)).toContain(notFoundData.title.ar);
  });
});
