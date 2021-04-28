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
import {render, RenderPosition, replace} from './utils/render';

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
    replace(routeEditComponent, routePointComponent);
  };

  const replaceFormToPoint = () => {
    replace(routePointComponent, routeEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  routePointComponent.setRollupClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  routeEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, routePointComponent, RenderPosition.BEFOREEND);
};

const renderTripList = (container, points) => {
  if (points.length === 0) {
    render(container, new NoPointView(), RenderPosition.BEFOREEND);
  } else {
    render(container, new SortView(), RenderPosition.BEFOREEND);
    render(container, tripListComponent, RenderPosition.BEFOREEND);
    render(tripListComponent, new MakeFormView(points[0]), RenderPosition.BEFOREEND);
    render(mainTripContainer, new RouteInfoView(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < points.length; i++) {
      renderRoutePoint(tripListComponent, points[i]);
    }
  }
};

render(mainTripNavContainer, new MenuView(), RenderPosition.BEFOREEND);
render(mainTripFiltersContainer, new FiltersView(filters), RenderPosition.BEFOREEND);
renderTripList(tripEventsContainer, routePoints);


