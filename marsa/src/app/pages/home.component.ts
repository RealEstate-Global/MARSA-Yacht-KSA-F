import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SitePreferencesService } from '../services/site-preferences.service';
import { Header } from '../components/layout/header/header';
import { Footer } from '../components/layout/footer/footer';
import { HeroComponent } from '../components/sections/hero/hero.component';
import { IntroComponent } from '../components/sections/intro/intro.component';
import { ProductsComponent } from '../components/sections/products/products.component';
import { AboutComponent } from '../components/sections/about/about.component';
import { CtaComponent } from '../components/sections/cta/cta.component';

/**
 * Single-page lookbook for Al Marsa: why → how → about → download.
 * Booking, payment, KYC, coastguard clearance, and check-in happen in the
 * Al Marsa app — this page never collects user data, so there is no form
 * and no submission service here.
 *
 * All site copy is consumed by each child component via their own domain data
 * imports — HomeComponent acts as a layout shell only.
 */
@Component({
  selector: 'marsa-home',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    HeroComponent,
    IntroComponent,
    ProductsComponent,
    AboutComponent,
    CtaComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly preferences: SitePreferencesService;

  private readonly route: ActivatedRoute;
  private observer?: IntersectionObserver;

  @ViewChild('page') private page?: ElementRef<HTMLElement>;

  constructor(preferences: SitePreferencesService, route: ActivatedRoute) {
    this.preferences = preferences;
    this.route = route;
  }

  ngAfterViewInit(): void {
    const anchor = this.route.snapshot.data['anchor'] as string | undefined;
    if (anchor) {
      window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 150);
    }

    this.observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    this.page?.nativeElement.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  text(value: { en: string; ar: string }): string {
    return this.preferences.text(value);
  }
}
