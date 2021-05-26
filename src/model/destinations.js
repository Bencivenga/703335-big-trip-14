import Observer from '../utils/observer';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();

    this._notify(destinations);
  }

  getDestinations() {
    return this._destinations;
  }
}
