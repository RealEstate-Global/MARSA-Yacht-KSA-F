/**
 * Al Marsa site copy — compatibility re-export.
 *
 * This file assembles the full `copy` object from individual domain data
 * files. Components should prefer importing directly from their domain file
 * (e.g. `import { whyData } from '../data/why.data'`) or from the barrel
 * (`import { whyData } from '../data'`).
 *
 * English and Arabic strings sourced verbatim from https://almarsa.app/ (EN
 * and AR pages, captured 2026-10-29). Every string must stay consistent with
 * the official site — do not invent prices, vessel inventory, contact details,
 * or store URLs. See docs/MIGRATION.md.
 *
 * @deprecated Prefer domain-specific data imports. This shim will be removed
 * once all components have migrated to fine-grained imports.
 */

// ── Re-export all types ────────────────────────────────────────────────────
export type { Locale, Theme, LocalizedText } from '../models/locale.model';
export type {
  ValueItem,
  StepItem,
  VesselCategoryItem,
  HeroSlideItem,
  NavCopy,
  HeroCopy,
  NotFoundCopy,
  WhyCopy,
  HowCopy,
  AboutCopy,
  DownloadCopy,
  LinksCopy,
  FooterCopy,
  SiteCopy,
} from '../models/content.model';

// ── Re-export domain data ──────────────────────────────────────────────────
export { navData } from './navigation.data';
export { heroData, heroSlidesData } from './hero.data';
export { whyData } from './why.data';
export { howData } from './how.data';
export { aboutData } from './about.data';
export { downloadData } from './download.data';
export { footerData } from './footer.data';
export { linksData } from './links.data';
export { vesselCategoriesData } from './vessels.data';
export { notFoundData } from './not-found.data';
export { sliderData } from './slider.data';

// ── Assembled `copy` shim ──────────────────────────────────────────────────
import type { SiteCopy } from '../models/content.model';
import { navData } from './navigation.data';
import { heroData } from './hero.data';
import { whyData } from './why.data';
import { howData } from './how.data';
import { aboutData } from './about.data';
import { downloadData } from './download.data';
import { footerData } from './footer.data';
import { linksData } from './links.data';
import { vesselCategoriesData } from './vessels.data';
import { notFoundData } from './not-found.data';
import { sliderData } from './slider.data';

/** @deprecated Import domain-specific data instead of the full `copy` object. */
export const copy: SiteCopy = {
  nav: navData,
  hero: heroData,
  notFound: notFoundData,
  why: whyData,
  how: howData,
  about: aboutData,
  download: downloadData,
  links: linksData,
  vesselCategories: vesselCategoriesData,
  slider: sliderData,
  footer: footerData,
};
