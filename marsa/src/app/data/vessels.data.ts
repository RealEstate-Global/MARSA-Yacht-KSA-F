import { VesselCategoryItem } from '../models/content.model';

/**
 * Vessel category taxonomy — mirrors the official Al Marsa fleet filter
 * (kebab-case keys). No vessel inventory is shown or implied here;
 * this is the lookbook's browsing taxonomy only.
 * Source: https://almarsa.app/ fleet page — captured 2026-10-29.
 */
export const vesselCategoriesData: VesselCategoryItem[] = [
  { key: 'motorboat',     label: { en: 'Motorboat',      ar: 'قارب بمحرك' } },
  { key: 'yacht',         label: { en: 'Yacht',           ar: 'يخت' } },
  { key: 'sailboat',      label: { en: 'Sailboat',        ar: 'مركب شراعي' } },
  { key: 'jet_ski',       label: { en: 'Jet Ski',         ar: 'جت سكي' } },
  { key: 'luxury_charter',label: { en: 'Luxury Charter',  ar: 'يخت فاخر' } },
  { key: 'fishing_boat',  label: { en: 'Fishing Boat',    ar: 'قارب صيد' } },
  { key: 'event_boat',    label: { en: 'Event Boat',      ar: 'قارب مناسبات' } },
  { key: 'party_yacht',   label: { en: 'Party Yacht',     ar: 'يخت حفلات' } },
  { key: 'kayak',         label: { en: 'Kayak',           ar: 'كاياك' } },
  { key: 'windsurf',      label: { en: 'Windsurf',        ar: 'لوح تزلج شراعي' } },
  { key: 'paddleboard',   label: { en: 'Paddleboard',     ar: 'لوح تجديف' } },
  { key: 'waterski',      label: { en: 'Waterski',        ar: 'تزحلق على الماء' } },
  { key: 'jetboat',       label: { en: 'Jetboat',         ar: 'زورق نفاث' } },
  { key: 'speedboat',     label: { en: 'Speedboat',       ar: 'زورق سريع' } },
  { key: 'catamaran',     label: { en: 'Catamaran',       ar: 'كاتاماران' } },
  { key: 'bananaboat',    label: { en: 'Bananaboat',      ar: 'قارب الموز' } },
  { key: 'dhow',          label: { en: 'Dhow',            ar: 'داو' } },
  { key: 'diveboat',      label: { en: 'Diveboat',        ar: 'قارب غوص' } },
];
