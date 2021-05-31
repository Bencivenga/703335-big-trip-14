export const getCostsByType = (points) => {
  const CostsByType = new Map();

  points.forEach((point) => {
    if (CostsByType.has(point.type)) {
      let moneyByType = CostsByType.get(point.type.toUpperCase());
      moneyByType = moneyByType + point.basicPrice;
      CostsByType.set(point.type.toUpperCase(), moneyByType);
    } else {
      CostsByType.set(point.type.toUpperCase(), point.basicPrice);
    }
  });

  return CostsByType;
};

export const countPointsByType = (points) => {
  const pointsByType = new Map();

  points.forEach((point) => {
    if (pointsByType.has(point.type.toUpperCase())) {
      let countByType = pointsByType.get(point.type.toUpperCase());
      countByType  = countByType + 1;
      pointsByType.set(point.type.toUpperCase(), countByType);
    } else {
      pointsByType.set(point.type.toUpperCase(), 1);
    }
  });

  return pointsByType;
};

export const getDurationsByType = (points) => {
  const durationsByType = new Map();

  points.forEach((point) => {
    if (durationsByType.has(point.type)) {
      let duration = durationsByType.get(point.type.toUpperCase());
      duration = duration + (point.endDate - point.startDate);
      durationsByType.set(point.type.toUpperCase(), duration);
    } else {
      durationsByType.set(point.type.toUpperCase(), (point.endDate - point.startDate));
    }
  });

  return durationsByType;
};

export const getMapSorted = (mapToSort) => {
  const mapSorted = new Map([...mapToSort.entries()]
    .sort((first, second) => {
      return second[1] - first[1];
    }));

  return mapSorted;
};
