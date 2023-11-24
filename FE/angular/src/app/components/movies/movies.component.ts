import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { MovieComplete } from 'src/app/data-access/models/movie.interfaces';
import { MoviesFacade } from 'src/app/data-access/facades/movies.facade';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
  filteredMovies$: Observable<MovieComplete[]>;
  decades$: Observable<number[]>;
  currentDecade$: Observable<number | undefined>;
  data$: Observable<{ decades: number[]; currDecade?: number }>;

  constructor(private moviesFacade: MoviesFacade) {}

  public ngOnInit(): void {
    this.decades$ = this.moviesFacade.decades$;
    this.filteredMovies$ = this.moviesFacade.filteredMovies$;
    this.currentDecade$ = this.moviesFacade.currentDecade$;

    this.data$ = combineLatest([this.decades$, this.currentDecade$]).pipe(
      map(([decades, currDecade]) => {
        return {
          decades,
          currDecade
        };
      })
    );
  }

  public displayMovies(decade?: number): void {
    this.moviesFacade.getFilteredMovies(decade);
  }
}
