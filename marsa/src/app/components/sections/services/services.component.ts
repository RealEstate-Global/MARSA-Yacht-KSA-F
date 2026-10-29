import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { copy, services } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideArrowUpRight],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  copy = copy;
  services = services;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
