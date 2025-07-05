import {
  Component,
  inject,
  input,
  OnInit,
  Query,
  signal,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { HttpMovies } from '../../services/http-movies';
import { MovieCard } from '../movie-card/movie-card';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [ButtonModule, MovieCard, FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage implements OnInit, OnDestroy {
  private langSub?: Subscription;
  readonly query = input<string>('');
  localQuery = signal(this.query());
  private MovieHttp = inject(HttpMovies);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  searchValue = signal<string>('');
  movies = signal<any[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query') || '';
      this.searchValue.set(query);
      this.localQuery.set(query);
      this.searchMovies();
    });
    this.langSub = this.MovieHttp.language$.subscribe(() => {
      this.searchMovies();
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  searchMovies(): void {
    if (this.searchValue() !== this.localQuery()) {
      this.localQuery.set(this.searchValue());
      this.router.navigate(['/search', this.localQuery()]);
      return;
    }
    if (!this.localQuery()) {
      this.movies.set([]);
      return;
    }
    this.MovieHttp.getSearchedMovies(this.localQuery()).subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }
}
