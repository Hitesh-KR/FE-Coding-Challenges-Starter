import { Injectable } from '@angular/core';
import { MovieStore } from '../store/movies.store';
import { Observable, map } from 'rxjs';
import { MovieComplete } from '../models/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesFacade {
  filteredMovies$: Observable<MovieComplete[]>;
  decades$: Observable<number[]>;
  currentDecade$: Observable<number | undefined>;

  constructor(private movieStore: MovieStore) {
    this.decades$ = this.movieStore.state$.pipe(map(({ decades }) => decades));
    this.filteredMovies$ = this.movieStore.state$.pipe(map(({ filteredMovies }) => filteredMovies));
    this.currentDecade$ = this.movieStore.state$.pipe(map(({ currentDecade }) => currentDecade));
  }

  getFilteredMovies(decade?: number) {
    this.movieStore.filterMovies(decade);
  }
}
