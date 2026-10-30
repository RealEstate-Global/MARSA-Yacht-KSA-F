/**
 * Localization and theme model primitives for Al Marsa.
 */
export type Locale = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface LocalizedText {
  en: string;
  ar: string;
}
