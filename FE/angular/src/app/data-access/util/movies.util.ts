import { MovieComplete } from '../models/movie.interfaces';

export function getYearsDecade(year: string | number) {
  return Math.ceil(parseInt(year as string) / 10) * 10 - 10;
}

export function SortByYear({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) {
  return year1 - year2;
}

export function isMovieReleasedinDecade(decade: number, year: number) {
  return year >= decade && year < decade + 10;
}
