import RouteInfoView from '../view/route-info';
import {render, RenderPosition, remove} from '../utils/render';
import {sortByDay} from '../utils/route-point';

export default class RouteInfo {
  constructor(routeInfoContainer, routePointsModel) {
    this._routeInfoContainer = routeInfoContainer;
    this._routePointsModel = routePointsModel;

    this._routeInfoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._routePointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    remove(this._routeInfoComponent);

    const points = this._routePointsModel.getPoints();

    if (points.length === 0) {
      return;
    }

    this._routeInfoComponent = new RouteInfoView(points.slice().sort(sortByDay));

    render(this._routeInfoContainer, this._routeInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModelEvent() {
    this.init();
  }
}
