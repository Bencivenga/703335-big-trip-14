import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.duration(100);

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomArray = (array) => array.filter(() => Math.random() > 0.5);


export const generatePhotos = () => {
  const array = [];
  for (let i = 0; i < getRandomInteger(1, 10); i++) {
    array.push({
      src: `http://picsum.photos/248/152?r=${i}`,
    });
  }
  return array;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const generateDescription = (array) => {
  const description = array.slice();
  shuffleArray(description);
  return description.slice(0, getRandomInteger(1, 5)).join(' ');
};


export const generateDate = (start) => {
  const startTimestamp = Number(dayjs(start));
  const endTimestamp = Number(dayjs(start).add(6, 'month'));
  return dayjs(getRandomInteger(startTimestamp, endTimestamp)).format('YYYY-MM-DDTHH:mm');
};

export const generateEndDate = (startDate) => {
  const minDuration = dayjs(startDate).add(3, 'h');
  const maxDuration = dayjs(startDate).add(5, 'd');
  return dayjs(getRandomInteger(minDuration, maxDuration)).format('YYYY-MM-DDTHH:mm');
};

export const getDateDiffFormat = (startDate, endDate) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);

  return date2.isAfter(date1, 'day') ? 'MM/D HH:mm' : 'HH:mm';
};

export const humanizeStartDateFormat = (startDate, endDate) => {
  return dayjs(startDate).format(getDateDiffFormat(startDate, endDate));
};

export const humanizeEndDateFormat = (startDate, endDate) => {
  return dayjs(endDate).format(getDateDiffFormat(startDate, endDate));
};

export const getDatetimeFormat = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const humanizeDateFormat = (data) => {
  return dayjs(data).format('MMM D');
};

export const changeDateFormat = (date) => {
  return dayjs(date).format('YY/MM/DD HH:mm');
};

export const humanizeDurationFormat = (startDate, endDate) => {
  const diff = dayjs(endDate).diff(dayjs(startDate));
  const days = String(dayjs.duration(diff).days()).padStart(2, '0');
  const hours = String(dayjs.duration(diff).hours()).padStart(2, '0');
  const minutes = String(dayjs.duration(diff).minutes()).padStart(2, '0');

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

export const isFuturePoint = (point) => dayjs().isAfter(point.startDate, 'D') || dayjs().isSame(point.startDate, 'D');

export const isPastPoint = (point) => dayjs(point.endDate).isBefore(dayjs(), 'D');

export const createPointOffers = (offers) => {
  return offers.map((offer) =>
    `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
};

export const createOffers = (offers, type) => {
  return offers.map((offer) =>
    `<div class="event__offer-selector">
                        <input 
                        class="event__offer-checkbox  visually-hidden" 
                        id="event-offer-${type}-${offer.id}" 
                        type="checkbox" 
                        name="event-offer-${type}" 
                        checked>
                        <label 
                        class="event__offer-label" 
                        for="event-offer-${type}-${offer.id}">
                          <span class="event__offer-title">${offer.name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('');
};

const createPhotos = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('');
};

export const createDescriptionWithPhoto = (info) => {
  return (info === null) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info.description}</p>

    <div class="event__photos-container">
    <div class="event__photos-tape">
    ${createPhotos(info.photo)}
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
