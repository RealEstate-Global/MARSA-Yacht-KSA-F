import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { downloadData } from '../../../data/download.data';
import { linksData } from '../../../data/links.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, LucideArrowUpRight],
  templateUrl: './cta.component.html',
})
export class CtaComponent {
  readonly downloadData = downloadData;
  readonly linksData = linksData;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
