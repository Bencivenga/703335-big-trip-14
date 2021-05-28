import {getDateDuration} from './route-point';

export const getUniqueTypes = (points) => {
  const pointTypes = points.map((point) => point.type.toUpperCase());
  return [...new Set(pointTypes)];
};

export const getCostsByType = (points, type) => {
  return points
    .reduce((sum, point) => {

      if (point.type.toUpperCase() === type) {
        return sum += Number(point.basicPrice);
      }

      return sum;
    }, 0);
};

export const countPointsByType = (points, type) => {
  return points.filter((point) => point.type.toUpperCase() === type).length;
};

export const getDurationByType = (points, type) => {
  return points
    .reduce((total, point) => {

      if (point.type.toUpperCase() === type) {
        return total + getDateDuration(point.startDate, point.endDate);
      }

      return total;
    }, 0);
};

export const getDataMap = (labels, data) => {
  const dataMap = new Map();

  for (let i = 0; i < labels.length; i++) {
    dataMap.set(labels[i], data[i]);
  }

  return dataMap;
};

export const getMapSorted = (mapToSort) => {
  const mapSorted = new Map([...mapToSort.entries()]
    .sort((first, second) => {
      return second[1] - first[1];
    }));

  return mapSorted;
};
