export const getCostsByType = (points) => {
  const costsByType = new Map();

  points.forEach((point) => {
    if (costsByType.has(point.type.toUpperCase())) {
      let moneyByType = costsByType.get(point.type.toUpperCase());
      moneyByType += point.basicPrice;
      costsByType.set(point.type.toUpperCase(), moneyByType);
    } else {
      costsByType.set(point.type.toUpperCase(), point.basicPrice);
    }
  });

  return costsByType;
};

export const countPointsByType = (points) => {
  const pointsByType = new Map();

  points.forEach((point) => {
    if (pointsByType.has(point.type.toUpperCase())) {
      let countByType = pointsByType.get(point.type.toUpperCase());
      countByType += 1;
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
    if (durationsByType.has(point.type.toUpperCase())) {
      let duration = durationsByType.get(point.type.toUpperCase());
      duration += (point.endDate - point.startDate);
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
