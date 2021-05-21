import AbstractView from './abstract';

const createTripBoardTemplate = () => {
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
</section>`;
};

export default class TripBoard extends AbstractView{
  getTemplate() {
    return createTripBoardTemplate();
  }
}
