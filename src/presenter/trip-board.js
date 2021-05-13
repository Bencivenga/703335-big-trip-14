import TripListView from '../view/trip-list';
import SortView from '../view/sort';
import NoPointView from '../view/no-point';
import RoutePointPresenter from './route-point';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition, remove} from '../utils/render';
import {SortType} from '../data';
import {sortByDay, sortByPrice, sortByTime} from '../utils/route-point';


export default class TripBoard {
  constructor(tripBoardContainer) {
    this._tripBoardContainer = tripBoardContainer;
    this._routePointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripListComponent = new TripListView();
    this._noPointComponet = new NoPointView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripListPoints) {
    this._tripListPoints = tripListPoints.slice();

    this._renderTripBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearTripList();
    this._renderTripBoard();
  }

  _handleModeChange() {
    Object
      .values(this._routePointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripListPoints = updateItem(this._tripListPoints, updatedPoint);
    this._routePointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this._tripListPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripListPoints.sort(sortByPrice);
        break;
      case SortType.DAY:
      default:
        this._tripListPoints.sort(sortByDay);
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._tripBoardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const routePointPresenter = new RoutePointPresenter(this._tripListComponent, this._handlePointChange, this._handleModeChange);
    routePointPresenter.init(point);
    this._routePointPresenter[point.id] = routePointPresenter;
  }

  _renderPoints() {
    this._tripListPoints.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._tripBoardContainer, this._noPointComponet, RenderPosition.BEFOREEND);
  }

  _clearTripList() {
    Object
      .values(this._routePointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._routePointPresenter = {};
    remove(this._sortComponent);
  }

  _renderTripList() {
    render(this._tripBoardContainer, this._tripListComponent, RenderPosition.BEFOREEND);
  }

  _renderTripBoard() {
    if (this._tripListPoints.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderTripList();
    this._renderPoints();
  }

}
