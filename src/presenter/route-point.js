import RoutePointView from '../view/route-point';
import EditFormView from '../view/edit-form';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePoint {
  constructor(routePointContainer, changeData, changeMode) {
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._routePointComponent = null;
    this._routePointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(point) {
    this._point = point;

    const prevRoutePointComponent = this._routePointComponent;
    const prevRoutePointEditComponent = this._routePointEditComponent;

    this._routePointComponent = new RoutePointView(point);
    this._routePointEditComponent = new EditFormView(point);

    this._routePointComponent.setRollupClickHandler(this._handleRollupClick);
    this._routePointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._routePointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this._routePointContainer, this._routePointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._routePointContainer.getElement().contains(prevRoutePointComponent.getElement())) {
      replace(this._routePointComponent, prevRoutePointComponent);
    }

    if (this._routePointEditComponent.getElement().contains(prevRoutePointEditComponent.getElement())) {
      replace(this._routePointEditComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  destroy() {
    remove(this._routePointComponent);
    remove(this._routePointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._routePointEditComponent, this._routePointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._routePointComponent, this._routePointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleRollupClick() {
    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}
