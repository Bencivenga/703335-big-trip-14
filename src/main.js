import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import FiltersView from './view/filters';
import {generateRoutePoint} from './mock/route-point';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import TripBoardPresenter from './presenter/trip-board';

const ROUTE_POINT_COUNTER = 15;

const routePoints = new Array(ROUTE_POINT_COUNTER).fill().map(generateRoutePoint);
const filters = generateFilter(routePoints);

const mainHeader = document.querySelector('.page-header');
const mainTripContainer = mainHeader.querySelector('.trip-main');
const mainTripNavContainer = mainTripContainer.querySelector('.trip-controls__navigation');
const mainTripFiltersContainer = mainTripContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(mainTripContainer, new RouteInfoView(), RenderPosition.AFTERBEGIN);
render(mainTripNavContainer, new MenuView(), RenderPosition.BEFOREEND);
render(mainTripFiltersContainer, new FiltersView(filters), RenderPosition.BEFOREEND);

const tripBoardPresenter = new TripBoardPresenter(tripEventsContainer);
tripBoardPresenter.init(routePoints);
