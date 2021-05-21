import AbstractView from './abstract';
import {MenuItem} from '../data';

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">Table</a>
                <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">Stats</a>
              </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('trip-tabs__btn') || evt.target.classList.contains('trip-tabs__btn--active')) {
      return;
    }

    const prevItem = document.querySelector('.trip-tabs__btn--active');
    prevItem.classList.remove('trip-tabs__btn--active');
    evt.target.classList.add('trip-tabs__btn--active');

    this._callback.menuClick(evt.target.dataset.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
