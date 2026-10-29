import { Routes } from '@angular/router';

/**
 * Single-page lookbook: why → how → about → download.
 *
 * Legacy provisioning-era paths keep working by scrolling to the closest
 * equivalent section on the new page (services/provisioning → "How it
 * works", contact → "Get the app"). The canonical homepage is '' and the
 * wildcard catches anything else.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { anchor: 'how' },
  },
  {
    path: 'provisioning',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { anchor: 'how' },
  },
  {
    path: 'destinations',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { anchor: 'about' },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { anchor: 'download' },
  },
  { path: '**', redirectTo: '' },
];
