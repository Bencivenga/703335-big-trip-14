import {getDateDuration} from './route-point';

export const getUniqueTypes = (points) => {
  const pointTypes = points.map((point) => point.type.toUpperCase());
  return [...new Set(pointTypes)];
};

export const getCostsByType = (points, type) => {
  return points
    .filter((point) => point.type.toUpperCase() === type)
    .reduce((sum, item) => sum +=  +item.basicPrice, 0);
};

export const countPointsByType = (points, type) => {
  return points.filter((point) => point.type.toUpperCase() === type).length;
};

export const getDurationByType = (points, type) => {
  return points
    .filter((point) => point.type.toUpperCase() === type)
    .reduce((total, point) => total + getDateDuration(point.startDate, point.endDate), 0);
};
