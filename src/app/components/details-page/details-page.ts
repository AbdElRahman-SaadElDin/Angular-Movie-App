import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpMovies } from '../../services/http-movies';
import { WatchList } from '../../services/watch-list.service';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-details-page',
  imports: [
    CommonModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    MovieCard,
  ],
  templateUrl: './details-page.html',
  styleUrl: './details-page.scss',
})
export class DetailsPage implements OnInit, OnDestroy {
  private langSub?: Subscription;
  id = input<string>();
  private MovieHttp = inject(HttpMovies);
  watchList = inject(WatchList);
  movie = signal<any>({});
  reviews = signal<any[]>([]);
  recommend = signal<any[]>([]);

  getStarCount(): number[] {
    return [0, 1, 2, 3, 4];
  }
  getFilledStars(): number {
    return Math.floor(this.movie().vote_average / 2);
  }
  isFavorite = computed(() => {
    return this.watchList
      .watchItems()
      .some((item) => item.id === this.movie().id);
  });

  onClickFavorite() {
    if (this.isFavorite()) {
      this.watchList.removeWatchList(this.movie().id);
      console.log(this.movie().title, 'Removed');
    } else {
      this.watchList.addWatchList(this.movie());
      console.log(this.movie().title, 'Added');
    }
  }

  ngOnInit(): void {
    this.fetchMovieDetails();
    this.langSub = this.MovieHttp.language$.subscribe(() => {
      this.fetchMovieDetails();
    });
  }

  fetchMovieDetails() {
    this.MovieHttp.getMovieDetails(this.id()!).subscribe({
      next: (data: any) => {
        this.movie.set(data);
        this.MovieHttp.getMoviesReviews(data.id).subscribe({
          next: (reviewData: any) => {
            this.reviews.set(reviewData.results);
          },
          error: (err) => console.log('failed to load Reviews:', err),
        });
        this.MovieHttp.getRecommendedMovies(data.id).subscribe({
          next: (recData: any) => {
            this.recommend.set(recData.results);
          },
          error: (err) =>
            console.log('failed to load Recommended Movies:', err),
        });
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
}
