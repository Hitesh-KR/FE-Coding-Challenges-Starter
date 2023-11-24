import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MovieComplete, MovieData, MovieDetails, SearchResults } from '../models/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';

  constructor(private http: HttpClient) {}

  public getFilteredMovies(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }

  public getMovie(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.serviceUrl}i=${id}`);
  }

  public getMovies(): Observable<SearchResults> {
    return this.http.get<SearchResults>(`${this.serviceUrl}s=Batman&type=movie`);
  }
}
