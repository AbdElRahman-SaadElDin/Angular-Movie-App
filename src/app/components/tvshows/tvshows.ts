import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpMovies } from '../../services/http-movies';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TvCard } from '../tv-card/tv-card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-tvshows',
  imports: [
    FormsModule,
    TvCard,
    ButtonModule,
    RouterLink,
    TvCard,
    PaginatorModule,
  ],
  templateUrl: './tvshows.html',
  styleUrl: './tvshows.scss',
})
export class TVshows implements OnInit, OnDestroy {
  private langSub?: Subscription;
  private MovieHttp = inject(HttpMovies);
  searchValue = signal<string>('');
  movies = signal<any[]>([]);
  first = signal<number>(0);
  rows = signal<number>(1);
  numPages = signal<number>(0);

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 1);
    this.MovieHttp.getTvPage(page.toString()).subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }

  ngOnInit() {
    this.fetchTvShows();
    this.langSub = this.MovieHttp.language$.subscribe(() => {
      this.fetchTvShows();
    });
  }

  fetchTvShows() {
    this.MovieHttp.getTvPage('1').subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
        this.numPages.set(data.total_pages);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
}
