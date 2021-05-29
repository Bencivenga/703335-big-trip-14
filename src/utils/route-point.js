import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {capitalizeFirstChar} from '../utils/common';
import {MAX_ROUTE_LIST_TITLE_LENGTH} from '../data';

dayjs.extend(duration);
dayjs.duration(100);

export const getRoutePointsListTitle = (points) => {
  const destinations = points.map((point) => point.destination.name);

  if (destinations.length > MAX_ROUTE_LIST_TITLE_LENGTH) {
    return `${destinations.slice(0, MAX_ROUTE_LIST_TITLE_LENGTH - 2)}
    —  . . . —  ${destinations.slice([destinations.length - 1])}`;
  }
  return destinations.join(' — ');
};

const calcAllPointsPrice = (points) => points
  .reduce((acc, point) => acc + point.basicPrice, 0);

const calcAllOffersPrice = (points) => {
  return points.reduce((pointsAcc, {offers}) => {
    pointsAcc += offers.reduce((offersAcc, offer) => {
      return offersAcc + offer.price;
    }, 0);

    return pointsAcc;
  }, 0);

};

export const calcTotalPrice = (points) => calcAllPointsPrice(points) + calcAllOffersPrice(points);

export const getRouteDates = (points) => {
  const firstDate = dayjs(points[0].startDate).format('D MMM');
  const lastDate = dayjs(points[points.length - 1].endDate).format('D MMM');

  return `${firstDate} — ${lastDate}`;
};

export const getDateDiffFormat = (startDate, endDate) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);

  return date2.isAfter(date1, 'day') ? 'D/MM HH:mm' : 'HH:mm';
};

export const humanizeStartDateFormat = (startDate, endDate) => {
  return dayjs(startDate).format(getDateDiffFormat(startDate, endDate));
};

export const humanizeEndDateFormat = (startDate, endDate) => {
  return dayjs(endDate).format(getDateDiffFormat(startDate, endDate));
};

export const getDatetimeFormat = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const humanizeDateFormat = (data) => {
  return dayjs(data).format('MMM D');
};

export const changeDateFormat = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

export const getDateDuration = (startDate, endDate) => {
  return dayjs(endDate).diff(dayjs(startDate));
};

export const humanizeDurationFormat = (diff) => {
  const days = String(dayjs.duration(diff).days()).padStart(2, '0');
  const hours = String(dayjs.duration(diff).hours()).padStart(2, '0');
  const minutes = String(dayjs.duration(diff).minutes()).padStart(2, '0');

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

export const isFuturePoint = (point) => dayjs(point.startDate).isAfter(dayjs(), 'D') ||
  dayjs(point.startDate).isSame(dayjs(), 'D');

export const isPastPoint = (point) => dayjs(point.endDate).isBefore(dayjs(), 'D');

export const sortByDay = (pointA, pointB) => dayjs(pointA.startDate) - dayjs(pointB.startDate);

export const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
  const timeB = dayjs(pointB.endDate).diff(dayjs(pointB.startDate));
  return timeB - timeA;
};

export const sortByPrice = (pointA, pointB) => pointB.basicPrice - pointA.basicPrice;

export const getDestinationsList = (destinations) => {
  return destinations.map((destination) => {
    return `<option value="${destination.name}"></option>`;
  }).join('');
};

export const createEventsTypeList = (availableOffers, currentType, isDisabled) => {
  return Array.from(availableOffers.keys())
    .map((type) =>
      `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1" data-type="${type}">${capitalizeFirstChar(type)}</label>
    </div>`)
    .join('');
};

export const areDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB);
};
