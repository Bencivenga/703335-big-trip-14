import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import {generateRoutePoint} from './mock/route-point';
import {destinations} from './mock/destinations';
import {UpdateType} from './data';
import {sortByDay} from './utils/route-point';
import {render, RenderPosition} from './utils/render';
import FiltersPresenter from './presenter/filters';
import TripBoardPresenter from './presenter/trip-board';
import RoutePointsModel from './model/route-points';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import FiltersModel from './model/filters';

const ROUTE_POINT_COUNTER = 15;

const routePoints = new Array(ROUTE_POINT_COUNTER).fill().map(generateRoutePoint).sort(sortByDay);

const routePointsModel = new RoutePointsModel();
routePointsModel.setPoints(routePoints);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(UpdateType.PATCH, destinations);

const filtersModel = new FiltersModel();
const offersModel = new OffersModel();

const mainHeader = document.querySelector('.page-header');
const mainTripContainer = mainHeader.querySelector('.trip-main');
const mainTripNavContainer = mainTripContainer.querySelector('.trip-controls__navigation');
const mainTripFiltersContainer = mainTripContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(mainTripContainer, new RouteInfoView(), RenderPosition.AFTERBEGIN);
render(mainTripNavContainer, new MenuView(), RenderPosition.BEFOREEND);

const tripBoardPresenter = new TripBoardPresenter(tripEventsContainer, routePointsModel, filtersModel, destinationsModel, offersModel);
const filtersPresenter = new FiltersPresenter(mainTripFiltersContainer, filtersModel, routePointsModel);

filtersPresenter.init();
tripBoardPresenter.init();

mainTripContainer.querySelector('.trip-main__event-add-btn')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    tripBoardPresenter.createPoint();
  });
