import StatsView from '../view/stats';
import {render, replace, remove, RenderPosition} from '../utils/render';

export default class Stats {
  constructor(statsContainer, routePointsModel) {
    this._statsContainer = statsContainer;
    this._statsComponent = null;

    this._routePointsModel = routePointsModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._routePointsModel.addObserver(this._handleModelEvent);

    const prevStatsComponent = this._statsComponent;
    this._statsComponent = new StatsView(this._routePointsModel.getPoints());

    if (prevStatsComponent === null) {
      render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._statsComponent, prevStatsComponent);
    remove(prevStatsComponent);
  }

  destroy() {
    remove(this._statsComponent);
    this._statsComponent = null;
    this._routePointsModel.removeObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }
}
