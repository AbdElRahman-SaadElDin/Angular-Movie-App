import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpMovies } from '../../services/http-movies';
import { MovieCard } from '../movie-card/movie-card';
import { RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, MovieCard, FormsModule, RouterLink, PaginatorModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private langSub?: Subscription;
  first = signal<number>(0);
  rows = signal<number>(1);
  numPages = signal<number>(0);

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 1);
    this.MovieHttp.getMoviesPage(page.toString()).subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }
  private MovieHttp = inject(HttpMovies);
  searchValue = signal<string>('');
  movies = signal<any[]>([]);

  ngOnInit() {
    this.fetchMovies();
    this.langSub = this.MovieHttp.language$.subscribe(() => {
      this.fetchMovies();
    });
  }

  fetchMovies() {
    this.MovieHttp.getMoviesPage('1').subscribe({
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
