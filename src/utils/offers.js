export const createPointOffers = (offers) => {
  return offers.map((offer) =>
    `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
};

export const createOffers = (offers, type) => {
  return offers.map((offer) =>
    `<div class="event__offer-selector">
                        <input 
                        class="event__offer-checkbox  visually-hidden" 
                        id="event-offer-${type}-${offer.id}" 
                        type="checkbox" 
                        name="event-offer-${type}" 
                        checked>
                        <label 
                        class="event__offer-label" 
                        for="event-offer-${type}-${offer.id}">
                          <span class="event__offer-title">${offer.name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('');
};

