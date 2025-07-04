import { Component, inject, input, OnInit, signal } from '@angular/core';
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
export class SearchPage implements OnInit {
  // readonly query = input<string>('');
  private MovieHttp = inject(HttpMovies);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  searchValue = signal<string>('');
  movies = signal<any[]>([]);
  value = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query') || '';
      this.searchValue.set(query);
      this.value.set(query);
      this.searchMovies();
    });
  }

  searchMovies(): void {
    const value = this.searchValue().trim();
    this.value.set(value);
    const query = this.route.snapshot.paramMap.get('query') || '';
    if (value !== query) {
      this.router.navigate(['/search', value]);
      return;
    }
    if (!value) {
      this.movies.set([]);
      return;
    }
    this.MovieHttp.getSearchedMovies(value).subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }
}
