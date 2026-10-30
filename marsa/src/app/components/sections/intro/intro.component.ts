import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { whyData } from '../../../data/why.data';
import { SitePreferencesService } from '../../../services/site-preferences.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
})
export class IntroComponent {
  readonly whyData = whyData;

  constructor(public preferences: SitePreferencesService) {}

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
