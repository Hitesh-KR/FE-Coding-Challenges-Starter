import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { BehaviorSubject, EMPTY, Observable, catchError, forkJoin, map, mergeMap, tap } from 'rxjs';
import { MovieComplete } from '../models/movie.interfaces';
import { MovieState } from '../models/state.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SortByYear, getYearsDecade, isMovieReleasedinDecade } from '../util/movies.util';

@Injectable({
  providedIn: 'root'
})
export class MovieStore {
  private posterUrl = 'https://m.media-amazon.com/images/M/';
  private replacePosterUrl = '/assets/images/';

  private _state: BehaviorSubject<MovieState> = new BehaviorSubject<MovieState>({
    decades: [],
    movies: [],
    filteredMovies: []
  });
  state$ = this._state.asObservable();

  constructor(private movieService: DataService) {
    this.getMovies();
  }

  private getMovies() {
    const { decades, movies } = this._state.getValue();

    if (movies.length > 0) return;

    const getMovies$ = this.movieService.getMovies().pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID, Year }) => {
            // add decade to decades
            const decade = getYearsDecade(Year);
            if (decades.indexOf(decade) < 0) {
              decades.push(decade);
            }

            return this.getMovie(imdbID);
          })
        )
      ),
      tap((movies) => {
        movies.sort(SortByYear);
        decades.sort((a, b) => a - b);
        this._state.next({ decades, movies, filteredMovies: movies });
      }),
      catchError((err: HttpErrorResponse) => {
        console.error(err.message);
        return EMPTY;
      })
    );

    getMovies$.subscribe();
  }

  getMovie(imdbID: string): Observable<MovieComplete> {
    return this.movieService.getMovie(imdbID).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(this.posterUrl, this.replacePosterUrl),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        Year: parseInt(Year as string)
      }))
    );
  }

  filterMovies(decade?: number) {
    const state = this._state.getValue();

    const filteredMovies = decade
      ? state.movies.filter((movie) => isMovieReleasedinDecade(decade, movie.Year))
      : state.movies;

    this._state.next({
      ...state,
      filteredMovies,
      currentDecade: decade
    });
  }
}
