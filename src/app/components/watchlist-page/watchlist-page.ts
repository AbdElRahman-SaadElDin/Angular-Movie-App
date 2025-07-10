import { Component, inject, OnInit, signal } from '@angular/core';
import { WatchList } from '../../services/watch-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watchlist-page',
  imports: [RouterLink],
  templateUrl: './watchlist-page.html',
  styleUrl: './watchlist-page.scss',
})
export class WatchlistPage implements OnInit {
  watchList = inject(WatchList);
  favoriteMovies = signal<any[]>([]);
  favoriteTv = signal<any[]>([]);

  getStarFill(starIndex: number, rating: number): string {
    const normalizedRating = rating / 2; // Assuming the rating is out of 10
    if (starIndex <= normalizedRating) {
      return '100%';
    } else if (
      starIndex > normalizedRating &&
      starIndex - 1 < normalizedRating
    ) {
      const fillPercentage = (normalizedRating % 1) * 100;
      return `${fillPercentage}%`;
    } else {
      return '0%';
    }
  }

  get starIndexes(): number[] {
    return [0, 1, 2, 3, 4];
  }

  onClickRemove(id: number) {
    if (this.favoriteMovies()) {
      this.watchList.removeWatchList(id);
      this.favoriteMovies.set(this.watchList.watchItems());
    }
    if (this.favoriteTv()) {
      this.watchList.removeTvWatchList(id);
      this.favoriteTv.set(this.watchList.watchTvItems());
    }
  }

  ngOnInit(): void {
    this.favoriteMovies.set(this.watchList.watchItems());
    this.favoriteTv.set(this.watchList.watchTvItems());
  }
}
