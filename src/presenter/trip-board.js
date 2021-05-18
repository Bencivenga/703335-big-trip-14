import TripListView from '../view/trip-list';
import SortView from '../view/sort';
import NoPointView from '../view/no-point';
import RoutePointNewPresenter from './route-point-new';
import RoutePointPresenter from './route-point';
import {render, RenderPosition, remove} from '../utils/render';
import {filters} from '../utils/filters';
import {SortType, UpdateType, UserAction, FilterType} from '../data';
import {sortByDay, sortByPrice, sortByTime} from '../utils/route-point';


export default class TripBoard {
  constructor(tripBoardContainer, routePointsModel, filtersModel, destinationsModel, offersModel) {
    this._tripBoardContainer = tripBoardContainer;
    this._routePointsModel = routePointsModel;
    this._filtersModel = filtersModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._routePointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._tripListComponent = new TripListView();
    this._noPointComponet = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._routePointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this>this._handleModelEvent);

    this._routePointNewPresenter = new RoutePointNewPresenter(this._tripListComponent, this._handleViewAction, this._destinationsModel);
  }

  init() {
    render(this._tripBoardContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._routePointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filtersModel.getFilter();
    const points = this._routePointsModel.getPoints();
    const filteredPoints = filters[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints.sort(sortByDay);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTripBoard();
    this._renderTripBoard();
  }

  _handleModeChange() {
    this._routePointNewPresenter.destroy();
    Object
      .values(this._routePointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._routePointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._routePointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._routePointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._routePointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTripBoard();
        break;
    }
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._tripBoardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point, destinations) {
    const routePointPresenter = new RoutePointPresenter(this._tripListComponent, this._handleViewAction, this._handleModeChange, this._destinations);
    routePointPresenter.init(point, destinations);
    this._routePointPresenter[point.id] = routePointPresenter;
  }

  _renderPoints() {
    this._getPoints().forEach((point) => this._renderPoint(point, this._destinationsModel.getDestinations()));
  }

  _renderNoPoints() {
    render(this._tripBoardContainer, this._noPointComponet, RenderPosition.BEFOREEND);
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._routePointNewPresenter.destroy();

    Object
      .values(this._routePointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._routePointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointComponet);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTripBoard() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(this._routePointsModel);
  }

}
