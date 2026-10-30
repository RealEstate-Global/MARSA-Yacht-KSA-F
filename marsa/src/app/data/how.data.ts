import { HowCopy } from '../models/content.model';

/**
 * "How it works" section copy.
 * Source: https://almarsa.app/ — captured 2026-10-29.
 *
 * Step descriptions are aligned with what the lookbook actually shows (fleet
 * category taxonomy, no inventory). The source's "photos, marina, capacity,
 * hourly rate" wording describes listing data the page never displays, so it
 * was not kept verbatim (PR #49 review).
 */
export const howData: HowCopy = {
  heading: { en: 'How it works', ar: 'كيف يعمل' },
  lead: {
    en: 'Browse here. Book there. On the water in four moves.',
    ar: 'استكشف عبر الموقع، واحجز عبر التطبيق. في عرض البحر بـ 4 خطوات سهلة.',
  },
  steps: [
    {
      title: { en: 'Browse', ar: 'استكشف' },
      description: {
        en: 'Look through the fleet categories on the web, then book in the app.',
        ar: 'تصفح مختلف فئات اليخوت والقوارب عبر الموقع، ثم أكمل حجزك عبر التطبيق.',
      },
    },
    {
      title: { en: 'Open the app', ar: 'افتح التطبيق' },
      description: {
        en: 'Lock your date, duration, and guests where booking actually lives.',
        ar: 'حدد موعد رحلتك، مدة الإبحار، وعدد الضيوف مباشرة في التطبيق.',
      },
    },
    {
      title: { en: 'Pay & clear', ar: 'الدفع والتصاريح' },
      description: {
        en: 'Secure payment, KYC, and coastguard — handled in Al Marsa.',
        ar: 'دفع إلكتروني آمن، توثيق الهوية، واستخراج التصاريح الرسمية — بضغطة زر في تطبيق المرسى.',
      },
    },
    {
      title: { en: 'Sail', ar: 'انطلق وأبحر' },
      description: {
        en: 'Check in, board, and own the day on Gulf water.',
        ar: 'سجّل وصولك عند المرسى، اصعد على متن القارب، واستمتع بتجربة بحرية استثنائية.',
      },
    },
  ],
  // Introduces the real fleet filter taxonomy mirrored from the official fleet
  // page — no vessel inventory is implied or promised.
  categoriesHeading: {
    en: 'On the web you can browse',
    ar: 'فئات الأسطول المتاحة للاستكشاف',
  },
};
