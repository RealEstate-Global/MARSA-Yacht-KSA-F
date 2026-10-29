import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { copy } from '../../../data/content';
import { SitePreferencesService } from '../../../services/site-preferences.service';
import { LucideArrowRight, LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, LucideArrowRight, LucideArrowUpRight],
  templateUrl: './cta.component.html',
})
export class CtaComponent {
  copy = copy;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
