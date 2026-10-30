import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { whyData } from '../../../data/why.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import {
  PolaroidLineCarouselComponent,
  Slide,
  BadgeComponent,
  ButtonComponent,
} from '../../ui';

/**
 * Why Al Marsa — Interactive Polaroid Line Carousel Section.
 * Instant photos pegged to a sagging string with spring and swing physics.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PolaroidLineCarouselComponent,
    BadgeComponent,
    ButtonComponent,
  ],
  templateUrl: './why.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyComponent implements OnInit {
  readonly whyData = whyData;
  activeCardIndex = 0;
  slides: Slide[] = [];

  constructor(public preferences: SitePreferencesService) {}

  get isRtl(): boolean {
    return this.preferences.locale() === 'ar';
  }

  text(val?: { en: string; ar: string }): string {
    return val ? this.preferences.text(val) : '';
  }

  ngOnInit(): void {
    this.buildSlides();
  }

  private buildSlides(): void {
    const isArabic = this.isRtl;
    this.slides = [
      {
        image: '/assets/why-card-01.jpg',
        title: isArabic ? 'تجارب يخوت فاخرة' : 'Premium Yacht Experiences',
        caption: isArabic
          ? 'يخوت مختارة بعناية وتجارب لا تُنسى على مياه البحر الأحمر.'
          : 'Beautifully curated luxury yachts with verified charters and five-star crew.',
        alt: isArabic ? 'يخوت فاخرة' : 'Luxury Yacht Fleet',
      },
      {
        image: '/assets/why-card-02.jpg',
        title: isArabic ? 'ثقة وموثوقية تامة' : 'Trusted Charter Experience',
        caption: isArabic
          ? 'أسعار واضحة، تصاريح رسمية، ومتابعة فورية لكل خطوة.'
          : 'Clear upfront pricing, verified captain credentials, and coastguard compliance.',
        alt: isArabic ? 'تجربة موثوقة' : 'Trusted Experience',
      },
      {
        image: '/assets/why-card-03.jpg',
        title: isArabic ? 'حجز سلس عبر التطبيق' : 'Seamless App Booking',
        caption: isArabic
          ? 'استكشف أسطولنا واحجز رحلتك البحرية في دقائق عبر التطبيق.'
          : 'Discover, customize and confirm your voyage in minutes on iOS and Android.',
        alt: isArabic ? 'تطبيق المرسى' : 'Al Marsa App',
      },
      {
        image: '/assets/why-card-04.jpg',
        title: isArabic ? 'خدمة مخصصة وضيافة' : 'Personalised Service',
        caption: isArabic
          ? 'قباطنة مرخصون وضيافة بحرية استثنائية طوال فترة إبحارك.'
          : 'Tailored itineraries, private chefs, watersports, and attentive concierge.',
        alt: isArabic ? 'خدمة مخصصة' : 'Personalized Concierge',
      },
      {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1800&auto=format&fit=crop',
        title: isArabic ? 'أفق البحر الأحمر' : 'Red Sea Coastal Horizons',
        caption: isArabic
          ? 'أروع الجزر والمراسي الطبيعية الممتدة على طول الساحل.'
          : 'Discover secluded reefs, vibrant coral islands, and calm anchorages.',
        alt: isArabic ? 'سواحل البحر الأحمر' : 'Red Sea Coastline',
      },
      {
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1800&auto=format&fit=crop',
        title: isArabic ? 'لحظات الغروب الهادئة' : 'Private Sunset Anchor',
        caption: isArabic
          ? 'استمتع بأمسيات لا تُنسى في الخلجان الخاصة والهادئة.'
          : 'Unwind as the golden hour settles over pristine waters and tranquil coves.',
        alt: isArabic ? 'غروب البحر' : 'Sunset on the water',
      },
    ];
  }

  onCarouselChange(index: number): void {
    this.activeCardIndex = index;
  }
}
