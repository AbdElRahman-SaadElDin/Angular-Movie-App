import { Component, inject, OnInit, signal } from '@angular/core';
// import { NgFor } from '@angular/common';
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

  getStarFill(index: number, movie: any): number {
    const rating = movie.vote_average / 2;
    const full = Math.floor(rating);
    const partial = rating - full;

    if (index < full) {
      return 100;
    } else if (index === full) {
      return partial * 100;
    } else {
      return 0;
    }
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
