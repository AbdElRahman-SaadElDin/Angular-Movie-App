import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpMovies {
  private http = inject(HttpClient);
  private _apiKey = '1af2b33e5732ea7358b675f75050f4f7';

  getMovies() {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this._apiKey}`
    );
  }

  getMoviesPage(page: string = '1') {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${this._apiKey}`
    );
  }

  getMovieDetails(id: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this._apiKey}`
    );
  }

  getRecommendedMovies(movie_id: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${this._apiKey}`
    );
  }

  getSearchedMovies(MovieName: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${MovieName}`
    );
  }
  getLanguage(language: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this._apiKey}&language=${language}`
    );
  }
  getTv() {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${this._apiKey}`
    );
  }
  getTvDetails(series_id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${series_id}?api_key=${this._apiKey}`
    );
  }
  getTvReviews(series_id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${series_id}/reviews?api_key=${this._apiKey}`
    );
  }
}
