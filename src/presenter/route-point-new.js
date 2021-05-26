import EditFormView from '../view/edit-form';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../data';

const BLANK_POINT = {
  basicPrice: '',
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  type: 'bus',
  offers: [],
  startDate: new Date(),
  endDate: new Date(),
  isFavorite: false,
};


export default class RoutePointNew {
  constructor(pointsContainer, changeData, destinationsModel, offersModel) {
    this._pointsContainer = pointsContainer;
    this._changeData = changeData;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._routePointNewComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._handleFormDeleteClick = this._handleFormDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._routePointNewComponent !== null) {
      return;
    }

    this._routePointNewComponent = new EditFormView(BLANK_POINT, this._destinationsModel.getDestinations(), this._offersModel.getOffers());
    this._routePointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._routePointNewComponent.setFormCloseClickHandler(this._handleFormCloseClick);
    this._routePointNewComponent.setFormDeleteClickHandler(this._handleFormDeleteClick);

    render(this._pointsContainer, this._routePointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._routePointNewComponent === null) {
      return;
    }

    remove(this._routePointNewComponent);
    this._routePointNewComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );

    this.destroy();
  }

  _handleFormCloseClick() {
    this.destroy();
  }

  _handleFormDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
