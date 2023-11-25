import { TestBed } from '@angular/core/testing';
import { MoviesFacade } from './movies.facade';
import { mockProvider } from '@ngneat/spectator';
import { MovieStore } from '../store/movies.store';
import { of } from 'rxjs';

let mockMovies = [
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
  }
];

let facade: MoviesFacade;
const mockStore = mockProvider(MovieStore, {
  state$: of({
    decades: [2000, 2010],
    filteredMovies: mockMovies
  }),
  filterMovies: jest.fn()
});

describe('Movies Facade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesFacade, mockStore]
    });
    facade = TestBed.inject(MoviesFacade);
  });

  it('should create the service', () => {
    expect(facade).toBeTruthy();
  });

  describe('WHEN getFilteredMovies is called', () => {
    it('should call filter movies of store', () => {
      const store = TestBed.inject(MovieStore);
      const spy = jest.spyOn(store, 'filterMovies');
      facade.getFilteredMovies();
      expect(spy).toBeCalled();
    });
    it('should call filter movies of store with decade', () => {
      const store = TestBed.inject(MovieStore);
      const spy = jest.spyOn(store, 'filterMovies');
      facade.getFilteredMovies(2000);
      expect(spy).toBeCalledWith(2000);
    });
  });

  describe('WHEN getMovieDetails is called', () => {
    it('should get movie by imdbID', () => {
      const movie$ = facade.getMovieDetails('tt123');
      movie$.subscribe((data) => {
        expect(data).toBe(mockMovies[0]);
      });
    });

    it('should return undefined', () => {
      const movie$ = facade.getMovieDetails('missing');
      movie$.subscribe((data) => {
        expect(data).toBeUndefined();
      });
    });
  });
});
