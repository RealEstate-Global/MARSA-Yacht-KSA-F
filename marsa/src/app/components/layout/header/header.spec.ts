import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Header } from './header';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { stubMatchMedia, clearMatchMediaStub } from '../../../testing/match-media';

describe('Header', () => {
  let preferences: SitePreferencesService;
  let component: Header;

  beforeEach(() => {
    stubMatchMedia(false);
    preferences = new SitePreferencesService();
    component = new Header(preferences);
  });

  afterEach(() => {
    clearMatchMediaStub();
  });

  it('initializes with closed menu', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  it('toggles mobile menu open and closed', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);

    component.closeMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('handles escape key press by closing open menu', () => {
    component.isMenuOpen = true;
    component.onEscape();
    expect(component.isMenuOpen).toBe(false);
  });

  it('translates text according to active preferences', () => {
    const textObj = { en: 'Hello', ar: 'مرحبا' };
    expect(component.text(textObj)).toBe('Hello');
  });
});
