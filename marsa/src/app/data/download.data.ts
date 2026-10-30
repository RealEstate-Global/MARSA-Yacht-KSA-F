import { DownloadCopy } from '../models/content.model';

/**
 * "Get the app / Download" section copy.
 * Source: https://almarsa.app/ — captured 2026-10-29.
 *
 * Honest CTA (PR #49 review): the official site's own store badges are
 * placeholders, so until verified listings exist the button is a neutral
 * "Visit Al Marsa" that goes to the official site — no store branding.
 */
export const downloadData: DownloadCopy = {
  heading: { en: 'Take Al Marsa with you', ar: 'المرسى معك أينما كنت' },
  body: {
    en: 'Book the boat. Own the day. iOS and Android.',
    ar: 'احجز قاربك بكل سهولة، واستمتع بتجربة بحرية لا تُنسى. متوفر على iOS وAndroid.',
  },
  visit: { en: 'Visit Al Marsa', ar: 'زيارة موقع المرسى' },
};
