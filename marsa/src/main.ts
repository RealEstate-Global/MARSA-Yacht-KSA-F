import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withInMemoryScrolling,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Zoneless change detection: no zone.js polyfill (~36 kB) and message-based
    // CD driven by signals/template events only. Everything that changes state
    // outside a template listener (slider timer, HTTP submission) uses signals.
    provideZonelessChangeDetection(),
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