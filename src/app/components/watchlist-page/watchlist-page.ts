import { Component, inject, input, OnInit, signal } from '@angular/core';
// import { NgFor } from '@angular/common';
import { WatchList } from '../../services/watch-list.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-watchlist-page',
  imports: [NgbRatingModule],
  templateUrl: './watchlist-page.html',
  styleUrl: './watchlist-page.scss',
})
export class WatchlistPage implements OnInit {
  watchList = inject(WatchList);
  favoriteMovies = signal<any[]>([]);
  rating = input<number>(); // Input signal

  ariaValueText(current: number, max: number): string {
    return `${current} out of ${max} stars`;
  }

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

  ngOnInit(): void {
    this.favoriteMovies.set(this.watchList.watchItems());
  }
}
