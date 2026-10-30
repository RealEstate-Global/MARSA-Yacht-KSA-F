/**
 * Data barrel — single import point for all Al Marsa site copy.
 *
 * Each domain dataset lives in its own file so changes to one section
 * never touch another. Import directly from the domain file when a
 * component only needs one slice; import from here when you need several.
 *
 * Domain files:
 *   navigation.data  → nav labels (header/footer nav)
 *   hero.data        → hero slider slides & static CTA copy
 *   why.data         → "Why Al Marsa" value cards
 *   how.data         → "How it works" steps & category heading
 *   about.data       → "About Al Marsa" body copy
 *   download.data    → CTA / download section
 *   footer.data      → footer brand, tagline, social labels
 *   links.data       → external URLs (official site, social)
 *   vessels.data     → vessel category taxonomy (fleet filter)
 *   not-found.data   → 404 page copy
 *   slider.data      → accessible slider UI labels
 */
export * from './navigation.data';
export * from './hero.data';
export * from './why.data';
export * from './how.data';
export * from './about.data';
export * from './download.data';
export * from './footer.data';
export * from './links.data';
export * from './vessels.data';
export * from './not-found.data';
export * from './slider.data';
