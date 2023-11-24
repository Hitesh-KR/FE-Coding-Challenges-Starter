import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { MovieStore } from 'src/app/data-access/store/movies.store';
import { MovieComplete } from 'src/app/data-access/models/movie.interfaces';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId = '';
  private movieSubscription: any;

  constructor(private activatedRoute: ActivatedRoute, private movieStore: MovieStore) {}

  public ngOnInit() {
    this.activatedRoute.params.pipe(tap(({ id }) => (this.movieId = id))).subscribe();
    this.movieSubscription = this.movieStore
      .getMovie(this.movieId)
      .pipe(tap((data) => (this.movie = data)))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
