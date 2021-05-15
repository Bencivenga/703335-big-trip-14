import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomArrayElement} from '../utils/common';
import {generateDate, generateEndDate} from '../utils/route-point';
import {generateDestination} from './destinations';

import {
  TYPES,
  offersMap
} from '../data';


export const generateRoutePoint = () => {
  const type = getRandomArrayElement(TYPES);
  const startDate = generateDate();
  return {
    id: nanoid(),
    basicPrice: getRandomInteger(100, 2000),
    destination: generateDestination(),
    type,
    offers: offersMap.get(type) || [],
    date: {
      startDate,
      endDate: generateEndDate(startDate),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};


