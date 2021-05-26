import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import {UpdateType, MenuItem, FilterType} from './data';
import {render, RenderPosition} from './utils/render';
import FiltersPresenter from './presenter/filters';
import TripBoardPresenter from './presenter/trip-board';
import RoutePointsModel from './model/route-points';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import FiltersModel from './model/filters';
import Api from './api';

const AUTHORIZATION = 'Basic ihWXtSRK5IReP2grbpzt';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const routePointsModel = new RoutePointsModel();
const destinationsModel = new DestinationsModel();
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

const tripBoardPresenter = new TripBoardPresenter(bodyContainer, routePointsModel, filtersModel, destinationsModel, offersModel, api);
const filtersPresenter = new FiltersPresenter(mainTripFiltersContainer, filtersModel, routePointsModel, offersModel, destinationsModel);


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
      break;
  }
};

addNewEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripBoardPresenter.createPoint();
});

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    routePointsModel.setPoints(UpdateType.INIT, points);
    render(mainTripContainer, new RouteInfoView(points), RenderPosition.AFTERBEGIN);
    render(mainTripNavContainer, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    filtersPresenter.init();
  })
  .catch(() => {
    offersModel.setOffers([]);
    destinationsModel.setDestinations([]);
    routePointsModel.setPoints(UpdateType.INIT, []);
    render(mainTripNavContainer, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });


tripBoardPresenter.init();
