import { Component, inject, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { WatchList } from '../../services/watch-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, BadgeModule, OverlayBadgeModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly watchList = inject(WatchList);
  items = signal<MenuItem[]>([
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Categories',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Movies',
          icon: 'pi pi-video',
        },
        {
          label: 'TV Shows',
          icon: 'pi pi-desktop',
        },
      ],
    },
    {
      label: 'Language',
      icon: 'pi pi-language',
      items: [
        {
          label: 'English',
        },
        {
          label: 'Arabic',
        },
        {
          label: 'French',
        },
        {
          label: 'Chinese',
        },
      ],
    },
    {
      label: 'WatchList',
      icon: 'pi pi-heart-fill',
    },
  ]);
}
