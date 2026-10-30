import { LocalizedText } from './locale.model';
export { LocalizedText } from './locale.model';

export interface ValueItem {
  title: LocalizedText;
  description: LocalizedText;
}

export interface StepItem {
  title: LocalizedText;
  description: LocalizedText;
}

export interface VesselCategoryItem {
  /** Stable key matching the official site's fleet filter (kebab-case). */
  key: string;
  label: LocalizedText;
}

export interface HeroSlideItem {
  image: string;
  badge: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  highlight: LocalizedText;
}

export interface NavCopy {
  why: LocalizedText;
  how: LocalizedText;
  about: LocalizedText;
  download: LocalizedText;
  menu: LocalizedText;
  close: LocalizedText;
  switchTheme: LocalizedText;
  home: LocalizedText;
  language: LocalizedText;
}

export interface HeroCopy {
  title: LocalizedText;
  body: LocalizedText;
  primary: LocalizedText;
  scroll: LocalizedText;
  slides: HeroSlideItem[];
}

export interface NotFoundCopy {
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  homeCta: LocalizedText;
  exploreCta: LocalizedText;
}

export interface WhyCopy {
  heading: LocalizedText;
  lead: LocalizedText;
  cards: ValueItem[];
}

export interface HowCopy {
  heading: LocalizedText;
  lead: LocalizedText;
  steps: StepItem[];
  categoriesHeading: LocalizedText;
}

export interface AboutCopy {
  heading: LocalizedText;
  body1: LocalizedText;
  body2: LocalizedText;
  imageAlt: LocalizedText;
}

export interface DownloadCopy {
  heading: LocalizedText;
  body: LocalizedText;
  visit: LocalizedText;
}

export interface LinksCopy {
  /** Official site — the only verified external destination for app CTAs. */
  official: string;
  social: {
    instagram: string;
    x: string;
    linkedin: string;
    share: string;
  };
}

export interface FooterContactItem {
  title: LocalizedText;
  branchesLabel: LocalizedText;
  branches: LocalizedText;
  phonesLabel: LocalizedText;
  phones: string[];
  emailLabel: LocalizedText;
  email: string;
  hoursLabel: LocalizedText;
  hours: LocalizedText;
}

export interface FooterCopy {
  brand: LocalizedText;
  tagline: LocalizedText;
  navigation: LocalizedText;
  download: LocalizedText;
  rights: LocalizedText;
  contact?: FooterContactItem;
  social: {
    instagram: LocalizedText;
    x: LocalizedText;
    linkedin: LocalizedText;
    share: LocalizedText;
  };
}

export interface SiteCopy {
  nav: NavCopy;
  hero: HeroCopy;
  notFound: NotFoundCopy;
  why: WhyCopy;
  how: HowCopy;
  about: AboutCopy;
  download: DownloadCopy;
  links: LinksCopy;
  vesselCategories: VesselCategoryItem[];
  slider: {
    goToSlide: LocalizedText;
  };
  footer: FooterCopy;
}
