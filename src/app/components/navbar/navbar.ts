import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { WatchList } from '../../services/watch-list.service';
import { HttpMovies } from '../../services/http-movies';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    OverlayBadgeModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly watchList = inject(WatchList);
  readonly httpMovies = inject(HttpMovies);

  languages = [
    { code: 'en-US', label: 'English' },
    { code: 'ar', label: 'Arabic' },
    { code: 'fr', label: 'French' },
    { code: 'zh', label: 'Chinese' },
  ];
  selectedLang = 'en-US';

  get selectedLangLabel() {
    const found = this.languages.find((l) => l.code === this.selectedLang);
    return found ? found.label : 'Language';
  }

  changeLanguage(lang: string, event?: Event) {
    this.selectedLang = lang;
    this.httpMovies.setDefaultLanguage(lang);
    if (event) event.preventDefault();
  }
}
