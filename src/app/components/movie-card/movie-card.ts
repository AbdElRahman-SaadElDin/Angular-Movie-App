import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgStyle } from '@angular/common';
import { HttpMovies } from '../../services/http-movies';
import { WatchList } from '../../services/watch-list.service';

@Component({
  selector: 'app-movie-card',
  imports: [CardModule, NgStyle],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard implements OnInit {
  movie = input<any>();
  votePercent = signal<number>(0);
  private watchList = inject(WatchList);
  readonly radius = 20;
  readonly progress = 2 * Math.PI * this.radius;

  getRatingColor(percent: number): string {
    const r = percent < 50 ? 255 : Math.round(255 - (percent - 50) * 5.1);
    const g = percent > 50 ? 255 : Math.round(percent * 5.1);
    return `rgb(${r}, ${g}, 0)`;
  }

  get progressPercentage(): number {
    const percent = this.votePercent();
    return this.progress - (percent / 100) * this.progress;
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

  ngOnInit() {
    this.votePercent.set(Number((this.movie().vote_average * 10).toFixed(0)));
  }
}
