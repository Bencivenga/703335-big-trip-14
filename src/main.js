import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import FiltersView from './view/filters';
import SortView from './view/sort';
import TripListView from './view/trip-list';
import MakeFormView from './view/make-form';
import EditFormView from './view/edit-form';
import RoutePointView from './view/route-point';
import NoPointView from './view/no-point';
import {generateRoutePoint} from './mock/route-point';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './util';

const ROUTE_POINT_COUNTER = 15;

const routePoints = new Array(ROUTE_POINT_COUNTER).fill().map(generateRoutePoint);
const filters = generateFilter(routePoints);

const mainHeader = document.querySelector('.page-header');
const mainTripContainer = mainHeader.querySelector('.trip-main');
const mainTripNavContainer = mainTripContainer.querySelector('.trip-controls__navigation');
const mainTripFiltersContainer = mainTripContainer.querySelector('.trip-controls__filters');
const mainEl = document.querySelector('.page-main');
const tripEventsContainer = mainEl.querySelector('.trip-events');
const tripListComponent = new TripListView();

const renderRoutePoint = (container, point) => {
  const routePointComponent = new RoutePointView(point);
  const routeEditComponent = new EditFormView(point);

  const replacePointToForm = () => {
    container.replaceChild(routeEditComponent.getElement(), routePointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    container.replaceChild(routePointComponent.getElement(), routeEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };


  routePointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  routeEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, routePointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripList = (container, points) => {
  if (points.length === 0) {
    render(container, new NoPointView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(container, new SortView().getElement(), RenderPosition.BEFOREEND);
    render(container, tripListComponent.getElement(), RenderPosition.BEFOREEND);
    render(tripListComponent.getElement(), new MakeFormView(points[0]).getElement(), RenderPosition.BEFOREEND);
    render(mainTripContainer, new RouteInfoView().getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < points.length; i++) {
      renderRoutePoint(tripListComponent.getElement(), points[i]);
    }
  }
};

render(mainTripNavContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(mainTripFiltersContainer, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);
renderTripList(tripEventsContainer, routePoints);


