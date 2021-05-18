import {FilterType} from '../data';
import {isFuturePoint, isPastPoint} from './route-point';

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

