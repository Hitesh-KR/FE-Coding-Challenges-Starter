import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails, SearchResults } from '../models/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';

  constructor(private http: HttpClient) {}

  public getMovie(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.serviceUrl}i=${id}`);
  }

  public getMovies(): Observable<SearchResults> {
    return this.http.get<SearchResults>(`${this.serviceUrl}s=Batman&type=movie`);
  }
}
