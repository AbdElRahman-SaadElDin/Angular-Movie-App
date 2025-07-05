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

@Component({
  selector: 'app-details-tv',
  imports: [CommonModule],
  templateUrl: './details-tv.html',
  styleUrl: './details-tv.scss',
})
export class DetailsTV implements OnInit, OnDestroy {
  private langSub?: Subscription;
  tvId = input<number>();
  private MovieHttp = inject(HttpMovies);
  watchList = inject(WatchList);
  movie = signal<any>({});

  getStarCount(): number[] {
    return [0, 1, 2, 3, 4];
  }
  getFilledStars(): number {
    return Math.round(this.movie().vote_average / 2);
  }
  isFavorite = computed(() => {
    return this.watchList
      .watchTvItems()
      .some((item) => item.id === this.movie().id);
  });

  onClickFavorite() {
    if (this.isFavorite()) {
      this.watchList.removeTvWatchList(this.movie().id);
      console.log(this.movie().title, 'Removed');
    } else {
      this.watchList.addTvWatchList(this.movie());
      console.log(this.movie().title, 'Added');
    }
  }

  ngOnInit(): void {
    this.fetchTvDetails();
    this.langSub = this.MovieHttp.language$.subscribe(() => {
      this.fetchTvDetails();
    });
  }

  fetchTvDetails() {
    this.MovieHttp.getTvDetails(this.tvId()!).subscribe({
      next: (data: any) => {
        this.movie.set(data);
      },
      error: (err) => console.log('failed to load Movies:', err),
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
}
