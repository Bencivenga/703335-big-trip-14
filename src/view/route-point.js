import AbstractView from './abstract';
import {
  getDatetimeFormat,
  humanizeStartDateFormat,
  humanizeEndDateFormat,
  humanizeDurationFormat,
  humanizeDateFormat
} from '../utils/route-point';
import {createPointOffers} from '../utils/offers';

const createRoutePointTemplate = (point) => {
  const {basicPrice, type, destination, offers, isFavorite, startDate, endDate} = point;
  const favoriteButtonClass = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${getDatetimeFormat(startDate)}">${humanizeDateFormat(startDate)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDate}">${humanizeStartDateFormat(startDate, endDate)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDate}">${humanizeEndDateFormat(startDate, endDate)}</time>
                  </p>
                  <p class="event__duration">${humanizeDurationFormat(startDate, endDate)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basicPrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createPointOffers(offers, type)}
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

export default class RoutePoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createRoutePointTemplate(this._point);
  }

  _rollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._point);
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}

