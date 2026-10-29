import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { copy, services } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucidePhone, LucideMail } from '@lucide/angular';

@Component({
  selector: 'marsa-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucidePhone, LucideMail],
  templateUrl: './footer.html',
})
export class Footer {
  readonly copy = copy;
  readonly services = services;
  readonly preferences: SitePreferencesService;

  constructor(preferences: SitePreferencesService) {
    this.preferences = preferences;
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
