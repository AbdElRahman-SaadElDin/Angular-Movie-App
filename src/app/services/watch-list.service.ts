import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WatchList {
  watchItems = signal<any[]>([]);
  watchTvItems = signal<any[]>([]);

  watchCount = computed(
    () =>
      this.watchItems().reduce((acc, item) => acc + item.quantity, 0) +
      this.watchTvItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  // For Movies
  addWatchList(Movie: any) {
    const items = this.watchItems();
    const idx = items.findIndex((item) => item.id === Movie.id);
    if (idx > -1) {
      this.watchItems.set(items.filter((item) => item.id !== Movie.id));
    } else {
      this.watchItems.set([...items, { ...Movie, quantity: 1 }]);
    }
  }

  removeWatchList(movieId: number) {
    this.watchItems.set(
      this.watchItems().filter((item) => item.id !== movieId)
    );
  }
  // For TV Shows
  addTvWatchList(Movie: any) {
    const items = this.watchTvItems();
    const idx = items.findIndex((item) => item.id === Movie.id);
    if (idx > -1) {
      this.watchTvItems.set(items.filter((item) => item.id !== Movie.id));
    } else {
      this.watchTvItems.set([...items, { ...Movie, quantity: 1 }]);
    }
  }

  removeTvWatchList(movieId: number) {
    this.watchTvItems.set(
      this.watchTvItems().filter((item) => item.id !== movieId)
    );
  }
}
