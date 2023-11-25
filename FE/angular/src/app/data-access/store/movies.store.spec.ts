import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieStore } from './movies.store';
import { mockProvider } from '@ngneat/spectator';
import { DataService } from '../services/data.service';
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

let store: MovieStore;
let mockDataService = mockProvider(DataService, {
  getMovie: jest.fn().mockReturnValue(of(mockMovies[0])),
  getMovies: jest.fn().mockReturnValue(of({ Search: mockMovies }))
});

describe('Movies Store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieStore, mockDataService]
    });
    store = TestBed.inject(MovieStore);
  });

  it('should create the service', fakeAsync(() => {
    expect(store).toBeTruthy();
  }));

  describe('WHEN filterMovies is called', () => {
    beforeEach(() => {
      store.state$ = of({
        movies: mockMovies,
        decades: [2000],
        filteredMovies: []
      });
    });

    it('should return same state', () => {
      store.filterMovies();

      store.state$.subscribe((data) => {
        expect(data.filteredMovies).toBe(mockMovies);
      });
    });

    it('should return filtered movie state', () => {
      store.filterMovies(2000);

      store.state$.subscribe((data) => {
        expect(data.filteredMovies).toBe(mockMovies);
        expect(data.currentDecade).toBe(2000);
      });
    });
  });
});
