export const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];


export const DESTINATIONS = [
  'Rome',
  'New York',
  'Tokyo',
  'Madrid',
  'Sydney',
  'Seoul',
  'Saint-Petersburg',
  'Moscow',
  'Beijing',
  'Pyongyang',
  'Bangkok',
];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const taxiOffers = [
  {
    name: 'Order Uber',
    price: '20',
    id: 1,
  },
  {
    name: 'Switch to comfort',
    price: '50',
    id: 2,
  },
];

const busOffers = [
  {
    name: 'Choose seats',
    price: '5',
    id: 3,
  },
  {
    name: 'Add luggage',
    price: '30',
    id: 4,
  },
];

const trainOffers = [
  {
    name: 'Choose seats',
    price: '5',
    id: 5,
  },
  {
    name: 'Add meal',
    price: '30',
    id: 6,
  },
];

const shipOffers = [
  {
    name: 'Choose seats',
    price: '5',
    id: 7,
  },
  {
    name: 'Add meal',
    price: '30',
    id: 8,
  },
  {
    name: 'Switch to comfort',
    price: '50',
    id: 9,
  },
  {
    name: 'Add luggage',
    price: '30',
    id: 10,
  },
];

const transportOffers = [
  {
    name: 'Rent a car',
    price: '50',
    id: 11,
  },
  {
    name: 'Travel by train',
    price: '50',
    id: 12,
  },
  {
    name: 'Add meal',
    price: '30',
    id: 13,
  },
];

const flightOffers = [
  {
    name: 'Add meal',
    price: '30',
    id: 14,
  },
  {
    name: 'Switch to comfort',
    price: '80',
    id: 15,
  },
  {
    name: 'Add luggage',
    price: '50',
    id: 16,
  },
];

const sightseeingOffers = [
  {
    name: 'Book tickets',
    price: '40',
    id: 17,
  },
  {
    name: 'Lunch in city',
    price: '30',
    id: 18,
  },
  {
    name: 'Add breakfast',
    price: '50',
    id: 19,
  },
];

export const offersMap = new Map();
offersMap
  .set('taxi', taxiOffers)
  .set('bus', busOffers)
  .set('train', trainOffers)
  .set('ship', shipOffers)
  .set('transport', transportOffers)
  .set('flight', flightOffers)
  .set('sightseeing', sightseeingOffers);


export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};
