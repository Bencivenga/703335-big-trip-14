const createPhotos = (destination) => {
  return destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
};

export const createDescriptionWithPhoto = (destination) => {
  return (destination.description === null) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
    <div class="event__photos-tape">
    ${createPhotos(destination)}
  </div>
  </div>
  </section>`;
};
