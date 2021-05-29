import MenuView from './view/menu';
import {UpdateType, MenuItem, FilterType} from './data';
import {render, RenderPosition} from './utils/render';
import RouteInfoPresenter from './presenter/route-info';
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
const mainHeaderElement = document.querySelector('.page-header');
const mainTripContainerElement = mainHeaderElement.querySelector('.trip-main');
const mainTripNavContainerElement = mainTripContainerElement.querySelector('.trip-controls__navigation');
const mainTripFiltersContainerElement = mainTripContainerElement.querySelector('.trip-controls__filters');
const addNewEventButtonElement = mainTripContainerElement.querySelector('.trip-main__event-add-btn');
const bodyContainerElement = siteMainElement.querySelector('.page-body__container');

const siteMenuComponent = new MenuView();

const routeInfoPresenter =  new RouteInfoPresenter(mainTripContainerElement, routePointsModel);
const tripBoardPresenter = new TripBoardPresenter(bodyContainerElement, routePointsModel, filtersModel, destinationsModel, offersModel, api);
const filtersPresenter = new FiltersPresenter(mainTripFiltersContainerElement, filtersModel, routePointsModel, offersModel, destinationsModel);


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripBoardPresenter.init();
      addNewEventButtonElement.disabled = false;
      filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case MenuItem.STATS:
      tripBoardPresenter.destroy();
      addNewEventButtonElement.disabled = true;
      break;
  }
};

addNewEventButtonElement.disabled = true;

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    routePointsModel.setPoints(UpdateType.INIT, points);
    render(mainTripNavContainerElement, siteMenuComponent, RenderPosition.BEFOREEND);
    addNewEventButtonElement.disabled = false;

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    addNewEventButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      tripBoardPresenter.createPoint();
    });
  })
  .catch(() => {
    offersModel.setOffers([]);
    destinationsModel.setDestinations([]);
    routePointsModel.setPoints(UpdateType.INIT, []);
    render(mainTripNavContainerElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

routeInfoPresenter.init();
filtersPresenter.init();
tripBoardPresenter.init();

