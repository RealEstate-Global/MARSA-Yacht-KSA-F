import { WhyCopy } from '../models/content.model';

/**
 * "Why Al Marsa" section copy.
 * Redesigned for the image-led horizontal slider — each card has a full-bleed
 * portrait image (3:4 aspect), eyebrow label, title, and short description.
 * Source: https://almarsa.app/ — captured & refined 2026-10-30.
 */
export const whyData: WhyCopy = {
  heading: { en: 'Why Al Marsa', ar: 'لماذا المرسى' },
  lead: {
    en: 'Premium charter without the fluff. Trust built in. Booking in the app.',
    ar: 'تأجير فاخر بأعلى معايير الموثوقية. تجربة شفافة وموثوقة، والحجز مباشرة عبر التطبيق.',
  },
  cards: [
    {
      image: '/assets/why-card-01.jpg',
      eyebrow: { en: '01 — Fleet', ar: '٠١ — الأسطول' },
      title: { en: 'Premium Yacht Experiences', ar: 'تجارب يخوت فاخرة' },
      description: {
        en: 'Beautifully selected yachts and unforgettable experiences on the water. Every vessel is verified — what you see is exactly what you charter.',
        ar: 'يخوت مختارة بعناية وتجارب لا تُنسى على الماء. كل سفينة موثّقة — ما تراه هو ما تستأجره بالضبط.',
      },
    },
    {
      image: '/assets/why-card-02.jpg',
      eyebrow: { en: '02 — Trust', ar: '٠٢ — الثقة' },
      title: { en: 'Trusted Charter Experience', ar: 'تجربة حجز موثوقة' },
      description: {
        en: 'Clear information, transparent expectations, and confidence throughout the booking journey. Rates up front. No mystery math.',
        ar: 'معلومات واضحة، وتوقعات شفافة، وثقة في كل مرحلة من مراحل الحجز. أسعار من البداية. دون أي رسوم خفية.',
      },
    },
    {
      image: '/assets/why-card-03.jpg',
      eyebrow: { en: '03 — App', ar: '٠٣ — التطبيق' },
      title: { en: 'Seamless App Booking', ar: 'حجز سلس عبر التطبيق' },
      description: {
        en: 'Discover your next yacht and manage every detail of your booking through the Al Marsa app. Coastguard clearance handled automatically.',
        ar: 'اكتشف يختك التالي وأدر كل تفاصيل حجزك عبر تطبيق المرسى. تصاريح حرس السواحل تتم آلياً.',
      },
    },
    {
      image: '/assets/why-card-04.jpg',
      eyebrow: { en: '04 — Service', ar: '٠٤ — الخدمة' },
      title: { en: 'Personalised Service', ar: 'خدمة مخصصة' },
      description: {
        en: 'A more thoughtful charter experience, with licensed captains and attentive support when you need it. Your voyage, fully protected and cleared.',
        ar: 'تجربة تأجير أكثر اهتماماً، مع قباطنة مرخصين ودعم متواصل حين تحتاجه. رحلتك بحماية تامة ومعتمدة.',
      },
    },
  ],
};
