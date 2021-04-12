import {createMenuTemplate} from './view/menu';
import {createRouteInfoTemplate} from './view/route-info';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createMakeFormTemplate} from './view/make-form';
import {createEditFormTemplate} from './view/edit-form';
import {createRoutePointTemplate} from './view/route-point';
import {generateRoutePoint} from './mock/route-point';
import {generateFilter} from './mock/filter';

const ROUTE_POINT_COUNTER = 15;

const routePoints = new Array(ROUTE_POINT_COUNTER).fill().map(generateRoutePoint);
const filters = generateFilter(routePoints);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const mainHeader = document.querySelector('.page-header');
const mainTripContainer = mainHeader.querySelector('.trip-main');
const mainTripNavContainer = mainTripContainer.querySelector('.trip-controls__navigation');
const mainTripFiltersContainer = mainTripContainer.querySelector('.trip-controls__filters');
const mainEl = document.querySelector('.page-main');
const tripEventsContainer = mainEl.querySelector('.trip-events');

render(mainTripNavContainer, createMenuTemplate());
render(mainTripContainer, createRouteInfoTemplate(), 'afterbegin');
render(mainTripFiltersContainer, createFiltersTemplate(filters));
render(tripEventsContainer, createSortTemplate());
render(tripEventsContainer, createTripListTemplate());

const tripList = mainEl.querySelector('.trip-events__list');

render(tripList, createMakeFormTemplate(routePoints[0]));
render(tripList, createEditFormTemplate(routePoints[1]));


for (let i = 2; i < routePoints.length; i++) {
  render(tripList, createRoutePointTemplate(routePoints[i]));
}
