import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { copy, destinations } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideArrowUpRight],
  templateUrl: './destinations.component.html',
})
export class DestinationsComponent {
  copy = copy;
  destinations = destinations;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
