import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Observable, forkJoin, map, mergeMap, tap } from 'rxjs';
import { MovieComplete, MovieData } from '../models/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieStore {
  private posterUrl = 'https://m.media-amazon.com/images/M/';
  private replacePosterUrl = '/assets/images/';
  private _storedMovies: BehaviorSubject<MovieData> = new BehaviorSubject<MovieData>({
    Decades: [],
    Search: []
  });
  storedMovies = this._storedMovies.asObservable();

  constructor(private movieService: DataService) {
    this.getMovies();
  }

  private getMovies() {
    const { Decades, Search } = this._storedMovies.getValue();

    if (Search.length > 0) return;

    const getMovies$ = this.movieService.getMovies().pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID, Year }) => {
            // add decade to decades
            const decade = Math.ceil(parseInt(Year as string) / 10) * 10 - 10;
            if (Decades.indexOf(decade) < 0) {
              Decades.push(decade);
            }

            return this.getMovie(imdbID);
          })
        )
      ),
      tap((Search) => {
        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);
        Decades.sort((a, b) => a - b);
        this._storedMovies.next({ Decades, Search });
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
}
