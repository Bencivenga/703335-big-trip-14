import AbstractView from './abstract';
import {getRoutePointsListTitle, calcTotalPrice, getRouteDates} from '../utils/route-point';

const createRouteInfoTemplate = (points) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getRoutePointsListTitle(points)}</h1>

              <p class="trip-info__dates">${getRouteDates(points)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${calcTotalPrice(points)}</span>
            </p>
          </section>`;
};

export default class RouteInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._points);
  }
}
