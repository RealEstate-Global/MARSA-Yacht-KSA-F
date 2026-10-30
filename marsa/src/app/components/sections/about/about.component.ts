import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { aboutData } from '../../../data/about.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly aboutData = aboutData;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
