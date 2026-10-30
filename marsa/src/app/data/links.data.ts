import { LinksCopy } from '../models/content.model';

/**
 * External links — official site and social profiles.
 * Source: https://almarsa.app/ — captured 2026-10-29.
 *
 * No verified social profiles exist for Al Marsa (almarsa.app).
 * Confirmed by multiple searches (MIGRATION.md §10, PR #49).
 * Social icons link to the official site until real profiles are published.
 */
export const linksData: LinksCopy = {
  /** Official site — the only verified external destination for app CTAs. */
  official: 'https://almarsa.app/',
  social: {
    instagram: 'https://almarsa.app/',
    x: 'https://almarsa.app/',
    linkedin: 'https://almarsa.app/',
    share: 'https://almarsa.app/',
  },
};
