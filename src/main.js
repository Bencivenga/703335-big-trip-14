import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import {generateRoutePoint} from './mock/route-point';
import {destinations} from './mock/destinations';
import {UpdateType, MenuItem, FilterType} from './data';
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

const siteMainElement = document.querySelector('.page-body__page-main');
const mainHeader = document.querySelector('.page-header');
const mainTripContainer = mainHeader.querySelector('.trip-main');
const mainTripNavContainer = mainTripContainer.querySelector('.trip-controls__navigation');
const mainTripFiltersContainer = mainTripContainer.querySelector('.trip-controls__filters');
const addNewEventButton = mainTripContainer.querySelector('.trip-main__event-add-btn');
const bodyContainer = siteMainElement.querySelector('.page-body__container');

const siteMenuComponent = new MenuView();

render(mainTripContainer, new RouteInfoView(), RenderPosition.AFTERBEGIN);
render(mainTripNavContainer, siteMenuComponent, RenderPosition.BEFOREEND);

const tripBoardPresenter = new TripBoardPresenter(bodyContainer, routePointsModel, filtersModel, destinationsModel, offersModel);
const filtersPresenter = new FiltersPresenter(mainTripFiltersContainer, filtersModel, routePointsModel);


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripBoardPresenter.init();
      addNewEventButton.disabled = false;
      filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case MenuItem.STATS:
      tripBoardPresenter.destroy();
      addNewEventButton.disabled = true;
      filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filtersPresenter.init();
tripBoardPresenter.init();

addNewEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripBoardPresenter.createPoint();
});
