import {
  createPointOffers,
  getDatetimeFormat,
  humanizeStartDateFormat,
  humanizeEndDateFormat,
  humanizeDurationFormat,
  humanizeDateFormat,
  createElement
} from '../util';

const createRoutePointTemplate = (point) => {
  const {basicPrice, type, destination, offers, isFavorite, date} = point;
  const favoriteButtonClass = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${getDatetimeFormat(date.startDate)}">${humanizeDateFormat(date.startDate)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${date.startDate}">${humanizeStartDateFormat(date.startDate, date.endDate)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${date.endDate}">${humanizeEndDateFormat(date.startDate, date.endDate)}</time>
                  </p>
                  <p class="event__duration">${humanizeDurationFormat(date.startDate, date.endDate)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basicPrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createPointOffers(offers)}
                </ul>
                <button class="event__favorite-btn ${favoriteButtonClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class RoutePoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createRoutePointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

