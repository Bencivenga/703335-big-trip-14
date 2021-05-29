import {changeDateFormat, getDestinationsList, createEventsTypeList} from '../utils/route-point';
import {createOffers} from '../utils/offers';
import {createDescriptionWithPhoto} from '../utils/description';
import {isEmptyArray} from '../utils/common';
import {Mode} from '../data';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEditFormTemplate = (state, destinations, availableOffers, mode) => {
  const {basicPrice, type, destination, offers, startDate, endDate, isDisabled, isSaving, isDeleting} = state;

  const hasOffers = !isEmptyArray(availableOffers.get(type));
  const hasDescription = Boolean(destination.description);
  const isAddingMode = mode === Mode.ADDING_NEW;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventsTypeList(availableOffers, type, isDisabled)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''} required>
                    <datalist id="destination-list-1">
                      ${getDestinationsList(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${changeDateFormat(startDate)}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${changeDateFormat(endDate)}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(basicPrice))}" ${isDisabled ? 'disabled' : ''} required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  ${isAddingMode ? '<button class="event__reset-btn" type="reset">Cancel</button>' : `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>`}
                  
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers ${hasOffers ? '' : 'visually-hidden' }">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                        ${hasOffers ? createOffers(availableOffers, type, offers, isDisabled) : ''}
                      </div>
                    </div>
                  </section>
                    ${hasDescription ? createDescriptionWithPhoto(destination) : ''}
                </section>
              </form>
            </li>`;
};

export default class EditForm extends SmartView {
  constructor(point, destinations, availableOffers, mode) {
    super();
    this._state = EditForm.parsePointToState(point);
    this._destinations = destinations;
    this._availableOffers = availableOffers;
    this._startDatePicker = null;
    this._endDatePicker = null;
    this._mode = mode;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setStartDatePicker();
    this._setEndDatePicker();
    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createEditFormTemplate(this._state, this._destinations, this._availableOffers, this._mode);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseClickHandler(this._callback.closeClick);
    this.setFormDeleteClickHandler(this._callback.deleteClick);
  }

  reset(point) {
    this.updateState(
      EditForm.parsePointToState(point),
    );
  }

  _setStartDatePicker() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    this._startDatePicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: new Date(this._state.startDate),
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _setEndDatePicker() {
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    this._endDatePicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: new Date(this._state.endDate),
        minDate: new Date(this._state.startDate),
        onChange: this._endDateChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group')
      .addEventListener('click', this._typeClickHandler);

    this.getElement().querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);

    this.getElement().querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);

    this.getElement().querySelectorAll('.event__offer-checkbox')
      .forEach((item) => item.addEventListener('change', this._offersChangeHandler));
  }

  _startDateChangeHandler([userDate]) {
    this.updateState({
      startDate: userDate,
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateState({
      endDate: userDate,
    });
  }

  _typeClickHandler(evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('event__type-label')) {
      return;
    }

    const targetType = evt.target.dataset.type;

    this.updateState({
      type: targetType,
      hasOffers: isEmptyArray(this._availableOffers.get(targetType)),
      offers: [],
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const destinationValue = evt.target.value;

    const availableDestination = this._destinations.find((destination) => destinationValue === destination.name);

    if (!availableDestination) {
      evt.target.setCustomValidity('Please select one of the available destinations from the list');
      evt.target.reportValidity();
      return;
    }

    evt.target.setCustomValidity('');

    this.updateState({
      destination: availableDestination,
    });
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    const targetOffer = evt.target.dataset.name;
    const availableOffers = this._availableOffers.get(this._state.type);

    const checkedOffers = availableOffers.find((item) => item.title === targetOffer);
    const changedOffers = this._state.offers.find((item) => item.title === targetOffer);

    this.updateState({
      offers: changedOffers ?
        this._state.offers.filter((item) => item.title !== targetOffer) :
        [...this._state.offers, checkedOffers],
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    const value = Number(evt.target.value);

    if (value < 0 || isNaN(value)) {
      evt.target.setCustomValidity('Must be a positive integer number');
      evt.target.reportValidity();
      return;
    }

    evt.target.setCustomValidity('');


    this.updateState({
      basicPrice: value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseStateToPoint(this._state));
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditForm.parseStateToPoint(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseClickHandler);
  }

  setFormDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToState(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);

    delete state.isDisabled;
    delete  state.isSaving;
    delete state.isDeleting;

    return state;
  }
}
