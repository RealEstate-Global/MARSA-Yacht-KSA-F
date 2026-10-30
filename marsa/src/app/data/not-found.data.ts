import { NotFoundCopy } from '../models/content.model';

/**
 * 404 / Not Found page copy.
 * Marine-themed localized strings for the error page.
 */
export const notFoundData: NotFoundCopy = {
  badge: { en: '404 · Navigation Off Course', ar: '٤٠٤ · المسار غير موجود' },
  title: { en: "Lost at sea? Let's head back to harbor.", ar: 'خرجت عن المسار؟ لنعد إلى المرسى.' },
  description: {
    en: 'The vessel or page you are searching for is not charted on this route. Pick a verified destination below or return to the main lookbook.',
    ar: 'الصفحة أو القارب المطلوب غير مدرج في هذا المسار. اختر وجهة موثقة أدناه أو عد إلى صفحة المرسى الرئيسية.',
  },
  homeCta: { en: 'Back to Home', ar: 'العودة للرئيسية' },
  exploreCta: { en: 'Explore Fleet Categories', ar: 'استكشف فئات القوارب' },
};
