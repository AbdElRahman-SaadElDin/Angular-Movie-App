import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'search/:query',
    loadComponent: () =>
      import('./components/search-page/search-page').then((m) => m.SearchPage),
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./components/watchlist-page/watchlist-page').then(
        (m) => m.WatchlistPage
      ),
  },
];
