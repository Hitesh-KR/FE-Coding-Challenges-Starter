import { MovieComplete } from './movie.interfaces';

export interface MovieState {
  decades: number[];
  movies: MovieComplete[];
  filteredMovies: MovieComplete[];
  currentDecade?: number;
}
