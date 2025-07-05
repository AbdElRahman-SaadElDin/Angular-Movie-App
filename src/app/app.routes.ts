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
  {
    path: 'Details/:id',
    loadComponent: () =>
      import('./components/details-page/details-page').then(
        (m) => m.DetailsPage
      ),
  },
  {
    path: 'TV',
    loadComponent: () =>
      import('./components/tvshows/tvshows').then((m) => m.TVshows),
  },
  {
    path: 'TvDetails/:tvId',
    loadComponent: () =>
      import('./components/details-tv/details-tv').then((m) => m.DetailsTV),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound-page/notfound-page').then(
        (m) => m.NotfoundPage
      ),
  },
];
