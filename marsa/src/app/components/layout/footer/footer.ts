import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { footerData } from '../../../data/footer.data';
import { navData } from '../../../data/navigation.data';
import { aboutData } from '../../../data/about.data';
import { linksData } from '../../../data/links.data';
import { downloadData } from '../../../data/download.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

@Component({
  selector: 'marsa-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  readonly footerData = footerData;
  readonly navData = navData;
  readonly aboutData = aboutData;
  readonly linksData = linksData;
  readonly downloadData = downloadData;
  readonly preferences: SitePreferencesService;

  /** Always reflects the real calendar year — never goes stale. */
  readonly currentYear = new Date().getFullYear();

  constructor(preferences: SitePreferencesService) {
    this.preferences = preferences;
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
