import TripListView from '../view/trip-list';
import SortView from '../view/sort';
import NoPointView from '../view/no-point';
import RoutePointPresenter from './route-point';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render';


export default class TripBoard {
  constructor(tripBoardContainer) {
    this._tripBoardContainer = tripBoardContainer;
    this._routePointPresenter = {};

    this._tripListComponent = new TripListView();
    this._sortComponent = new SortView();
    this._noPointComponet = new NoPointView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(tripListPoints) {
    this._tripListPoints = tripListPoints;

    this._renderTripBoard();
  }

  _handleModeChange() {
    Object
      .values(this._routePointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedTask) {
    this._tripListPoints = updateItem(this._tripListPoints, updatedTask);
    this._routePointPresenter[updatedTask.id].init(updatedTask);
  }

  _renderSort() {
    render(this._tripBoardContainer, this._sortComponent, RenderPosition.BEFOREEND);
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
