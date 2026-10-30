import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
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
export class NotFoundComponent implements AfterViewInit, OnDestroy {
  readonly notFoundData = notFoundData;
  readonly howData = howData;
  readonly categories = vesselCategoriesData.slice(0, 6);
  private observer?: IntersectionObserver;

  constructor(
    public preferences: SitePreferencesService,
    private el?: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit(): void {
    if (this.el && typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
        { threshold: 0.1 },
      );
      this.el.nativeElement.querySelectorAll('.reveal, .reveal-up, .reveal-scale').forEach((element) => this.observer?.observe(element));
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
