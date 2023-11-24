import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MovieComplete } from 'src/app/data-access/models/movie.interfaces';
import { MoviesFacade } from 'src/app/data-access/facades/movies.facade';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movieId = '';
  movie$: Observable<MovieComplete | undefined>;

  constructor(private activatedRoute: ActivatedRoute, private movieFacade: MoviesFacade) {}

  public ngOnInit() {
    this.activatedRoute.params.pipe(tap(({ id }) => (this.movieId = id))).subscribe();
    this.movie$ = this.movieFacade.getMovieDetails(this.movieId);
  }
}
