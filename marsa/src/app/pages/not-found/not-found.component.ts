import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { notFoundData } from '../../data/not-found.data';
import { howData } from '../../data/how.data';
import { vesselCategoriesData } from '../../data/vessels.data';
import { SitePreferencesService } from '../../services/site-preferences.service';
import { Header } from '../../components/layout/header/header';
import { Footer } from '../../components/layout/footer/footer';
import { LucideCompass, LucideHome, LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'marsa-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Header,
    Footer,
    LucideCompass,
    LucideHome,
    LucideArrowUpRight,
  ],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  readonly notFoundData = notFoundData;
  readonly howData = howData;
  readonly categories = vesselCategoriesData.slice(0, 6);

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
