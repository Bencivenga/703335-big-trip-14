import {createMenuTemplate} from './view/menu';
import {createRouteInfoTemplate} from './view/route-info';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createMakeFormTemplate} from './view/make-form';
import {createEditFormTemplate} from './view/edit-form';
import {createRoutePointTemplate} from './view/route-point';

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
render(mainTripFiltersContainer, createFiltersTemplate());
render(tripEventsContainer, createSortTemplate());
render(tripEventsContainer, createTripListTemplate());

const tripList = mainEl.querySelector('.trip-events__list');
const ROUTE_POINT_COUNTER = 3;

render(tripList, createEditFormTemplate(), 'afterbegin');
render(tripList, createMakeFormTemplate());

for (let i = 0; i < ROUTE_POINT_COUNTER; i++) {
  render(tripList, createRoutePointTemplate());
}


