import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpMovies } from '../../services/http-movies';
import { MovieCard } from '../movie-card/movie-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, MovieCard, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private MovieHttp = inject(HttpMovies);
  searchValue = signal<string>('');
  movies = signal<any[]>([]);

  ngOnInit() {
    this.MovieHttp.getMovies().subscribe({
      next: (data: any) => {
        console.log(data);

        this.movies.set(data.results);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }
}
