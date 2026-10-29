/**
 * Al Marsa site copy.
 *
 * English and Arabic strings sourced verbatim from https://almarsa.app/ (EN and
 * AR pages, captured 2026-10-29). The site is the "lookbook"; booking, payment,
 * KYC, coastguard clearance, and check-in happen in the Al Marsa app. Every
 * string here must stay consistent with the official site — do not invent
 * prices, vessel inventory, contact details, or store URLs.
 *
 * Official-site links: the source's own App Store / Google Play badges point
 * at placeholder URLs, so CTAs are a neutral "Visit Al Marsa" to the official
 * site while real store listings are pending. See docs/MIGRATION.md.
 */

export type Locale = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface LocalizedText {
  en: string;
  ar: string;
}

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

export interface SiteCopy {
  nav: {
    why: LocalizedText;
    how: LocalizedText;
    about: LocalizedText;
    download: LocalizedText;
    menu: LocalizedText;
    close: LocalizedText;
    switchTheme: LocalizedText;
    home: LocalizedText;
    language: LocalizedText;
  };
  hero: {
    title: LocalizedText;
    body: LocalizedText;
    primary: LocalizedText;
    scroll: LocalizedText;
  };
  why: {
    heading: LocalizedText;
    lead: LocalizedText;
    cards: ValueItem[];
  };
  how: {
    heading: LocalizedText;
    lead: LocalizedText;
    steps: StepItem[];
    categoriesHeading: LocalizedText;
  };
  about: {
    heading: LocalizedText;
    body1: LocalizedText;
    body2: LocalizedText;
    imageAlt: LocalizedText;
  };
  download: {
    heading: LocalizedText;
    body: LocalizedText;
    visit: LocalizedText;
  };
  links: {
    /** Official site — the only verified external destination for app CTAs. */
    official: string;
  };
  vesselCategories: VesselCategoryItem[];
  slider: {
    goToSlide: LocalizedText;
  };
  footer: {
    brand: LocalizedText;
    tagline: LocalizedText;
    navigation: LocalizedText;
    download: LocalizedText;
    rights: LocalizedText;
  };
}

export const copy: SiteCopy = {
  nav: {
    why: { en: 'Why Al Marsa', ar: 'ليش المرسى' },
    how: { en: 'How it works', ar: 'كيف يشتغل' },
    about: { en: 'About', ar: 'عنّا' },
    download: { en: 'Get the app', ar: 'حمّل التطبيق' },
    menu: { en: 'Menu', ar: 'القائمة' },
    close: { en: 'Close', ar: 'إغلاق' },
    switchTheme: { en: 'Switch theme', ar: 'تغيير المظهر' },
    home: { en: 'Al Marsa home', ar: 'الرئيسية' },
    language: { en: 'Change language', ar: 'تغيير اللغة' },
  },
  hero: {
    title: { en: 'The Gulf, on your schedule.', ar: 'الخليج، على موعدك.' },
    body: {
      en: 'Verified yachts. Licensed captains. Coastguard-cleared. Clear pricing — pick the boat, book in the app.',
      ar: 'يخوت موثّقة. كباتن مرخّصون. تخليص خفر السواحل. أسعار واضحة — اختَر القارب، واحجز من التطبيق.',
    },
    primary: { en: 'Get the app', ar: 'حمّل التطبيق' },
    scroll: { en: 'Why Al Marsa', ar: 'ليش المرسى' },
  },
  why: {
    heading: { en: 'Why Al Marsa', ar: 'ليش المرسى' },
    lead: {
      en: 'Premium charter without the fluff. Trust built in. Booking in the app.',
      ar: 'تأجير فاخر بلا حشو. ثقة مدمجة. الحجز في التطبيق.',
    },
    cards: [
      {
        title: { en: 'Verified vessels', ar: 'قوارب ويخوت موثّقة' },
        description: {
          en: 'Yachts and boats that clear our listing bar — what you see is what you charter.',
          ar: 'عروض تجاوزت شروط الإدراج — اللي تشوفه هو اللي تستأجره.',
        },
      },
      {
        title: { en: 'Licensed captains', ar: 'كباتن مرخّصون' },
        description: {
          en: 'When the vessel needs a captain, you get a licensed pro on the trip.',
          ar: 'إذا القارب يحتاج كابتن، توصلك مع محترف مرخّص على الرحلة.',
        },
      },
      {
        title: { en: 'Clear pricing', ar: 'أسعار واضحة' },
        description: {
          en: 'Rates up front. No mystery math on the web — totals land in the app.',
          ar: 'الأسعار ظاهرة من البداية. بدون حسابات غامضة على الموقع — الإجمالي في التطبيق.',
        },
      },
      {
        title: { en: 'Coastguard-cleared', ar: 'تخليص خفر السواحل' },
        description: {
          en: 'Regulatory clearance is part of the flow so you’re ready to cast off.',
          ar: 'التخليص جزء من المسار عشان تكون جاهز للإبحار.',
        },
      },
    ],
  },
  how: {
    heading: { en: 'How it works', ar: 'كيف يشتغل' },
    lead: {
      en: 'Browse here. Book there. On the water in four moves.',
      ar: 'عرض هنا. حجز هناك. على الماء بأربع خطوات.',
    },
    steps: [
      {
        title: { en: 'Browse', ar: 'تصفّح' },
        description: {
          // Aligned with what this lookbook actually shows (fleet category
          // taxonomy, no inventory) per PR #49 review — the source's
          // "photos, marina, capacity, hourly rate" wording describes
          // listing data the page never displays, so it was not kept verbatim.
          en: 'Look through the fleet categories on the web, then book in the app.',
          ar: 'تتصفح فئات القوارب واليخوت على الموقع، وتحجز من التطبيق.',
        },
      },
      {
        title: { en: 'Open the app', ar: 'افتح التطبيق' },
        description: {
          en: 'Lock your date, duration, and guests where booking actually lives.',
          ar: 'ثبّت التاريخ والمدة والضيوف مكان الحجز الحقيقي.',
        },
      },
      {
        title: { en: 'Pay & clear', ar: 'ادفع وخلّص' },
        description: {
          en: 'Secure payment, KYC, and coastguard — handled in Al Marsa.',
          ar: 'دفع آمن، تحقق الهوية، وخفر السواحل — كلها في المرسى.',
        },
      },
      {
        title: { en: 'Sail', ar: 'أبحر' },
        description: {
          en: 'Check in, board, and own the day on Gulf water.',
          ar: 'سجّل وصولك، اركب، واملِك يومك على مياه الخليج.',
        },
      },
    ],
    categoriesHeading: {
      // Our copy: introduces the real fleet filter taxonomy mirrored from the
      // official fleet page — no vessel inventory is implied or promised.
      en: 'On the web you can browse',
      ar: 'على الموقع تقدر تتصفح',
    },
  },
  about: {
    heading: { en: 'About Al Marsa', ar: 'عن المرسى' },
    body1: {
      en: 'Al Marsa (المرسى) is a premium vessel-charter marketplace built for the Gulf — Saudi-first. We connect customers with verified yachts and boats, licensed captains, and a booking flow that respects transparent pricing and coastguard clearance.',
      ar: 'المرسى (Al Marsa) سوق فاخر لتأجير القوارب واليخوت في الخليج — السعودية أولاً. نربط العملاء بقوارب ويخوت موثّقة، كباتن مرخّصين، ومسار حجز يحترم الأسعار الواضحة وتخليص خفر السواحل.',
    },
    body2: {
      en: 'This site is your lookbook. The Al Marsa app is where you book, pay, and manage the trip.',
      ar: 'هالموقع للعرض. تطبيق المرسى مكان الحجز والدفع وإدارة الرحلة.',
    },
    imageAlt: {
      en: 'Yacht deck on Gulf water',
      ar: 'سطح يخت على مياه الخليج',
    },
  },
  download: {
    heading: { en: 'Take Al Marsa with you', ar: 'خلّ المرسى معك' },
    body: {
      en: 'Book the boat. Own the day. iOS and Android.',
      ar: 'احجز القارب. ملك يومك. على iOS وAndroid.',
    },
    // Honest CTA (PR #49 review): the official site's own store badges are
    // placeholders, so until verified listings exist the button is a neutral
    // "Visit Al Marsa" that goes to the official site — no store branding.
    visit: { en: 'Visit Al Marsa', ar: 'زيارة المرسى' },
  },
  links: {
    official: 'https://almarsa.app/',
  },
  vesselCategories: [
    { key: 'motorboat', label: { en: 'Motorboat', ar: 'قارب بمحرك' } },
    { key: 'yacht', label: { en: 'Yacht', ar: 'يخت' } },
    { key: 'sailboat', label: { en: 'Sailboat', ar: 'مركب شراعي' } },
    { key: 'jet_ski', label: { en: 'Jet Ski', ar: 'جت سكي' } },
    { key: 'luxury_charter', label: { en: 'Luxury Charter', ar: 'يخت فاخر' } },
    { key: 'fishing_boat', label: { en: 'Fishing Boat', ar: 'قارب صيد' } },
    { key: 'event_boat', label: { en: 'Event Boat', ar: 'قارب مناسبات' } },
    { key: 'party_yacht', label: { en: 'Party Yacht', ar: 'يخت حفلات' } },
    { key: 'kayak', label: { en: 'Kayak', ar: 'كاياك' } },
    { key: 'windsurf', label: { en: 'Windsurf', ar: 'لوح تزلج شراعي' } },
    { key: 'paddleboard', label: { en: 'Paddleboard', ar: 'لوح تجديف' } },
    { key: 'waterski', label: { en: 'Waterski', ar: 'تزحلق على الماء' } },
    { key: 'jetboat', label: { en: 'Jetboat', ar: 'زورق نفاث' } },
    { key: 'speedboat', label: { en: 'Speedboat', ar: 'زورق سريع' } },
    { key: 'catamaran', label: { en: 'Catamaran', ar: 'كاتاماران' } },
    { key: 'bananaboat', label: { en: 'Bananaboat', ar: 'قارب الموز' } },
    { key: 'dhow', label: { en: 'Dhow', ar: 'داو' } },
    { key: 'diveboat', label: { en: 'Diveboat', ar: 'قارب غوص' } },
  ],
  slider: {
    goToSlide: { en: 'Go to slide', ar: 'الانتقال إلى الشريحة' },
  },
  footer: {
    brand: { en: 'Al Marsa', ar: 'المرسى' },
    tagline: {
      en: 'Gulf water. Your clock. Premium charter, zero fluff.',
      ar: 'مياه الخليج. وقتك أنت. تأجير فاخر بلا حشو.',
    },
    navigation: { en: 'Navigate', ar: 'تصفح' },
    download: { en: 'Get the app', ar: 'حمّل التطبيق' },
    rights: {
      en: '© 2026 Al Marsa. All rights reserved.',
      ar: '© ٢٠٢٦ المرسى. جميع الحقوق محفوظة.',
    },
  },
};
