import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { copy } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';

/**
 * "How it works" section (source: almarsa.app/en#how). The former provisions
 * directory form is gone — booking, payment, KYC, and coastguard clearance
 * happen in the Al Marsa app, not on this site. The category chips mirror the
 * real fleet filter taxonomy from the official fleet page; no vessel
 * inventory is shown or implied.
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  readonly copy = copy;
  readonly categories = copy.vesselCategories;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
