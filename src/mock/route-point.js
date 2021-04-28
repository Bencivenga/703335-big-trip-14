import {getRandomInteger, getRandomArrayElement} from '../utils/common';
import {generateDate, generateEndDate} from '../utils/route-point';
import {generateDescription, generatePhotos} from '../utils/description';

import {
  TYPES,
  DESTINATIONS,
  DESCRIPTIONS,
  offers
} from '../data';


const generateInfo = () => {
  const isInfo = getRandomInteger(0, 1);

  return (!isInfo) ? null :
    {
      description: generateDescription(DESCRIPTIONS),
      photo: generatePhotos(),
    };
};

export const generateRoutePoint = () => {
  const type = getRandomArrayElement(TYPES);
  const startDate = generateDate();
  return {
    basicPrice: getRandomInteger(100, 2000),
    destination: getRandomArrayElement(DESTINATIONS),
    type,
    offers: offers.get(type) || [],
    info: generateInfo(),
    date: {
      startDate,
      endDate: generateEndDate(startDate),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};


