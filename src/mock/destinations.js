import {generatePhotos, generateDescription} from '../utils/description';
import {getRandomInteger, getRandomArrayElement} from '../utils/common';
import {DESTINATIONS,DESCRIPTIONS} from '../data';

const DESTINATIONS_COUNT = 11;

const generateInfo = () => {
  const isInfo = getRandomInteger(0, 1);

  return (!isInfo) ? null :
    {
      description: generateDescription(DESCRIPTIONS),
      photo: generatePhotos(),
    };
};

const generateDestination = () => {
  return {
    name: getRandomArrayElement(DESTINATIONS),
    info: generateInfo(),
  };
};

const destinations = new Array(DESTINATIONS_COUNT).fill(null).map(generateDestination);

export {generateDestination, destinations};

