import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { WatchList } from '../../services/watch-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-card',
  imports: [CardModule, RouterLink],
  templateUrl: './tv-card.html',
  styleUrl: './tv-card.scss',
})
export class TvCard implements OnInit {
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

  ngOnInit() {
    this.votePercent.set(Number((this.movie().vote_average * 10).toFixed(0)));
  }
}
