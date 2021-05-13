import {getRandomInteger, shuffleArray} from '../utils/common';

export const generatePhotos = () => {
  const array = [];
  for (let i = 0; i < getRandomInteger(1, 10); i++) {
    array.push({
      src: `http://picsum.photos/248/152?r=${i}`,
    });
  }
  return array;
};

const createPhotos = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('');
};

export const generateDescription = (array) => {
  const description = array.slice();
  shuffleArray(description);
  return description.slice(0, getRandomInteger(1, 5)).join(' ');
};

export const createDescriptionWithPhoto = (destination) => {
  return (destination.info === null) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.info.description}</p>

    <div class="event__photos-container">
    <div class="event__photos-tape">
    ${createPhotos(destination.info.photo)}
  </div>
  </div>
  </section>`;
};

export const createDescription = (info) => {
  return (info === null) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info.description}</p>
  </section>`;
};
