import { HeroCopy, HeroSlideItem } from '../models/content.model';

export const heroSlidesData: HeroSlideItem[] = [
  {
    image: '/assets/marsa-hero.avif',
    badge: { en: 'Verified Fleet · Licensed Captains', ar: 'أسطول موثّق · كباتن مرخصون' },
    title: { en: 'The Gulf, on your schedule.', ar: 'الخليج، على موعدك.' },
    body: {
      en: 'Verified yachts. Licensed captains. Coastguard-cleared. Clear pricing — pick the boat, book in the app.',
      ar: 'يخوت موثّقة. قباطنة مرخّصون. تصاريح بحرية معتمدة. أسعار واضحة — اختَر قاربك، واحجز عبر التطبيق.',
    },
    highlight: { en: 'Arabian Gulf & Red Sea', ar: 'الخليج العربي والبحر الأحمر' },
  },
  {
    image: '/assets/marsa-deck.avif',
    badge: { en: 'Private Charters · Tailored Moments', ar: 'رحلات خاصة · تجارب استثنائية' },
    title: { en: 'Crafted for luxury, built for ease.', ar: 'مُصمم للفخامة، ومبني للراحة.' },
    body: {
      en: 'From sun-drenched day cruises to sunset coastal escapes, explore with complete privacy and premium comfort.',
      ar: 'من الجولات البحرية النهارية إلى غروب الشمس الساحر، استمتع بخصوصية تامة وراحة لا تضاهى.',
    },
    highlight: { en: 'Jeddah & Coastline', ar: 'جدة والساحل الغربي' },
  },
  {
    image: '/assets/marsa-marina.avif',
    badge: { en: 'Direct Marina Access · Instant Departure', ar: 'انطلاق مباشر من المراسي · وصول فوري' },
    title: { en: 'Board seamlessly at premier marinas.', ar: 'انطلق بسلاسة من أرقى المراسي.' },
    body: {
      en: 'Ready at the dock when you arrive. Verified digital clearance ensures zero delays and smooth departures.',
      ar: 'قاربك في انتظارك عند وصولك. تصاريح رقمية معتمدة تضمن انطلاقاً سلساً بدون أي تأخير.',
    },
    highlight: { en: 'Marinas & Harbors', ar: 'مراسي وموانئ المملكة' },
  },
  {
    image: '/assets/marsa-coastline.avif',
    badge: { en: 'Coastguard Cleared · Total Peace of Mind', ar: 'تصاريح معتمدة · أمان وراحة بال' },
    title: { en: 'Your voyage, fully protected & cleared.', ar: 'رحلتك البحرية، بأعلى معايير الأمان.' },
    body: {
      en: 'Automatic safety protocol and coastguard documentation handled before you step aboard. Pure ocean freedom.',
      ar: 'كافة إجراءات السلامة وتصاريح حرس الحدود مكتملة مسبقاً قبل صعودك. حرية بحرية مطلقة.',
    },
    highlight: { en: 'Gulf Waters & Beyond', ar: 'مياه الخليج وما بعدها' },
  },
];

export const heroData: HeroCopy = {
  title: { en: 'The Gulf, on your schedule.', ar: 'الخليج، على موعدك.' },
  body: {
    en: 'Verified yachts. Licensed captains. Coastguard-cleared. Clear pricing — pick the boat, book in the app.',
    ar: 'يخوت موثّقة. قباطنة مرخّصون. تصاريح بحرية معتمدة. أسعار واضحة — اختَر قاربك، واحجز عبر التطبيق.',
  },
  primary: { en: 'Get the app', ar: 'حمّل التطبيق' },
  scroll: { en: 'Why Al Marsa', ar: 'لماذا المرسى' },
  slides: heroSlidesData,
};
