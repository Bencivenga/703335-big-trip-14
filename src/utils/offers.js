import {offersMap} from '../data';

export const createPointOffers = (offers) => {

  return (offers && offers.length !== 0) ? offers
    .map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('') : '';
};

export const createOffers = ({offers, type}) => {

  const availableOffers = offersMap.get(type);

  return (availableOffers && availableOffers.length !== 0) ? availableOffers.map((offer) => {

    const isChecked = offers ? offers.some((item) => item.name === offer.name) : false;

    return `<div class="event__offer-selector">
                        <input
                        class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${type}-${offer.id}"
                        type="checkbox"
                        name="event-offer-${type}"
                        data-name="${offer.name}"
                        ${isChecked ? 'checked' : ''}>
                        <label
                        class="event__offer-label"
                        for="event-offer-${type}-${offer.id}">
                          <span class="event__offer-title">${offer.name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
  }).join('') : '';
};

