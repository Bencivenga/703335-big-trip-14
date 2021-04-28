import {isFuturePoint, isPastPoint} from '../utils/route-point';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isFuturePoint(point)).length,
  past: (points) => points.filter((point) => isPastPoint(point)).length,
};

export const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};
