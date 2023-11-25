import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { MoviesFacade } from '../../data-access/facades/movies.facade';
import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

const mockDecades = [2000];
const mockMovies = [
  {
    Title: 'Mock Movie',
    Year: 2000,
    Rated: 'G',
    Released: '01 Jan 2000',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  },
  {
    Title: 'Mock Movie 2',
    Year: 2011,
    Rated: 'G',
    Released: '01 Jan 2011',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  }
];

const mockMovieFacade = mockProvider(MoviesFacade, {
  filteredMovies$: of(mockMovies),
  decades$: of(mockDecades),
  currentDecade$: of(undefined),
  getFilteredMovies: jest.fn()
});

describe('MoviesComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [mockMovieFacade],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('displayMovies', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    describe('WHEN displayMovies is called', () => {
      test('should call getFilteredMovies of facade', () => {
        const facade = TestBed.inject(MoviesFacade);
        const spy = jest.spyOn(facade, 'getFilteredMovies');
        component.displayMovies();
        expect(spy).toHaveBeenCalled();
      });
      test('should call getFilteredMovies of facade with decade', () => {
        const facade = TestBed.inject(MoviesFacade);
        const spy = jest.spyOn(facade, 'getFilteredMovies');
        component.displayMovies(2000);
        expect(spy).toBeCalledWith(2000);
      });
    });
  });
});
