export const createPointOffers = (offers) => {

  return (offers && offers.length !== 0) ? offers
    .map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('') : '';
};

export const createOffers = (availableOffers, type, checkedOffers) => {
  const offers = availableOffers.get(type);

  return (offers && offers.length !== 0) ? offers.map((offer) => {
    const {title, price, id = title} = offer;

    const isChecked = checkedOffers ? checkedOffers.some((item) => item.title === title) : false;

    return `<div class="event__offer-selector">
                        <input
                        class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${type}-${id}"
                        type="checkbox"
                        name="event-offer-${type}"
                        data-name="${title}"
                        ${isChecked ? 'checked' : ''}>
                        <label
                        class="event__offer-label"
                        for="event-offer-${type}-${id}">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>`;
  }).join('') : '';
};

