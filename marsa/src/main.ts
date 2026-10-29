import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withInMemoryScrolling,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Coalesce multiple events into single change detection — reduces CD cycles
    provideZoneChangeDetection({ eventCoalescing: true }),
    // HttpClient backs the request-service submission flow
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      // Bind route data/params directly to component inputs
      withComponentInputBinding(),
    ),
  ],
}).catch((error: unknown) => console.error(error));