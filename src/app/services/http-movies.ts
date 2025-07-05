import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpMovies {
  private http = inject(HttpClient);
  private _apiKey = '1af2b33e5732ea7358b675f75050f4f7';

  private _defaultLang = 'en-US';
  private _lang$ = new BehaviorSubject<string>(this._defaultLang);

  setDefaultLanguage(lang: string) {
    this._defaultLang = lang;
    this._lang$.next(lang);
  }
  getDefaultLanguage() {
    return this._defaultLang;
  }
  get language$() {
    return this._lang$.asObservable();
  }

  getMovies(lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this._apiKey}&language=${lang}`
    );
  }

  getMoviesPage(page: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?page=${page}&language=${lang}&api_key=${this._apiKey}`
    );
  }
  getTvPage(page: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/popular?page=${page}&language=${lang}&api_key=${this._apiKey}`
    );
  }

  getMovieDetails(id: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this._apiKey}&language=${lang}`
    );
  }

  getRecommendedMovies(movie_id: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${this._apiKey}&language=${lang}`
    );
  }

  getSearchedMovies(MovieName: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${MovieName}&language=${lang}`
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
  getTvDetails(series_id: number, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${series_id}?api_key=${this._apiKey}&language=${lang}`
    );
  }
  getTvReviews(series_id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${series_id}/reviews?api_key=${this._apiKey}`
    );
  }
  getMoviesReviews(movie_id: string, lang: string = this._defaultLang) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${this._apiKey}&language=${lang}`
    );
  }
}
