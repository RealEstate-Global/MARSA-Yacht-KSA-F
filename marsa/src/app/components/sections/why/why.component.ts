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
} from '../../ui/polaroid-line-carousel/polaroid-line-carousel.component';

/**
 * Why Al Marsa — Interactive Polaroid Line Carousel Section.
 * Instant photos pegged to a sagging string with spring and swing physics.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, RouterLink, PolaroidLineCarouselComponent],
  templateUrl: './why.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyComponent implements OnInit {
  readonly whyData = whyData;
  activeCardIndex = 0;

  constructor(public preferences: SitePreferencesService) {}

  get isRtl(): boolean {
    return this.preferences.locale() === 'ar';
  }

  text(val?: { en: string; ar: string }): string {
    return val ? this.preferences.text(val) : '';
  }

  get slides(): Slide[] {
    const defaultYachtSlides: Slide[] = [
      {
        image: '/assets/why-card-01.jpg',
        title: this.isRtl ? 'تجارب يخوت فاخرة' : 'Premium Yacht Experiences',
        caption: this.isRtl
          ? 'يخوت مختارة بعناية وتجارب لا تُنسى على مياه البحر الأحمر.'
          : 'Beautifully curated luxury yachts with verified charters and five-star crew.',
        alt: this.isRtl ? 'يخوت فاخرة' : 'Luxury Yacht Fleet',
      },
      {
        image: '/assets/why-card-02.jpg',
        title: this.isRtl ? 'ثقة وموثوقية تامة' : 'Trusted Charter Experience',
        caption: this.isRtl
          ? 'أسعار واضحة، تصاريح رسمية، ومتابعة فورية لكل خطوة.'
          : 'Clear upfront pricing, verified captain credentials, and coastguard compliance.',
        alt: this.isRtl ? 'تجربة موثوقة' : 'Trusted Experience',
      },
      {
        image: '/assets/why-card-03.jpg',
        title: this.isRtl ? 'حجز سلس عبر التطبيق' : 'Seamless App Booking',
        caption: this.isRtl
          ? 'استكشف أسطولنا واحجز رحلتك البحرية في دقائق عبر التطبيق.'
          : 'Discover, customize and confirm your voyage in minutes on iOS and Android.',
        alt: this.isRtl ? 'تطبيق المرسى' : 'Al Marsa App',
      },
      {
        image: '/assets/why-card-04.jpg',
        title: this.isRtl ? 'خدمة مخصصة وضيافة' : 'Personalised Service',
        caption: this.isRtl
          ? 'قباطنة مرخصون وضيافة بحرية استثنائية طوال فترة إبحارك.'
          : 'Tailored itineraries, private chefs, watersports, and attentive concierge.',
        alt: this.isRtl ? 'خدمة مخصصة' : 'Personalized Concierge',
      },
      {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1800&auto=format&fit=crop',
        title: this.isRtl ? 'أفق البحر الأحمر' : 'Red Sea Coastal Horizons',
        caption: this.isRtl
          ? 'أروع الجزر والمراسي الطبيعية الممتدة على طول الساحل.'
          : 'Discover secluded reefs, vibrant coral islands, and calm anchorages.',
        alt: this.isRtl ? 'سواحل البحر الأحمر' : 'Red Sea Coastline',
      },
      {
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1800&auto=format&fit=crop',
        title: this.isRtl ? 'لحظات الغروب الهادئة' : 'Private Sunset Anchor',
        caption: this.isRtl
          ? 'استمتع بأمسيات لا تُنسى في الخلجان الخاصة والهادئة.'
          : 'Unwind as the golden hour settles over pristine waters and tranquil coves.',
        alt: this.isRtl ? 'غروب البحر' : 'Sunset on the water',
      },
    ];

    return defaultYachtSlides;
  }

  ngOnInit(): void {}

  onCarouselChange(index: number): void {
    this.activeCardIndex = index;
  }
}
