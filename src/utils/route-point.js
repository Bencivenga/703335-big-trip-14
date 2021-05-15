import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomInteger} from '../utils/common';
import {TYPES} from '../data';
import {capitalizeFirstChar} from './common';

dayjs.extend(duration);
dayjs.duration(100);

export const generateDate = (start) => {
  const startTimestamp = Number(dayjs(start));
  const endTimestamp = Number(dayjs(start).add(6, 'month'));
  return dayjs(getRandomInteger(startTimestamp, endTimestamp)).format('YYYY-MM-DDTHH:mm');
};

export const generateEndDate = (startDate) => {
  const minDuration = dayjs(startDate).add(3, 'h');
  const maxDuration = dayjs(startDate).add(5, 'd');
  return dayjs(getRandomInteger(minDuration, maxDuration)).format('YYYY-MM-DDTHH:mm');
};

export const getDateDiffFormat = (startDate, endDate) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);

  return date2.isAfter(date1, 'day') ? 'MM/D HH:mm' : 'HH:mm';
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
  return dayjs(date).format('YY/MM/DD HH:mm');
};

export const humanizeDurationFormat = (startDate, endDate) => {
  const diff = dayjs(endDate).diff(dayjs(startDate));
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

export const isFuturePoint = (point) => dayjs().isAfter(point.startDate, 'D') || dayjs().isSame(point.startDate, 'D');

export const isPastPoint = (point) => dayjs(point.endDate).isBefore(dayjs(), 'D');

export const sortByDay = (pointA, pointB) => dayjs(pointA.date.startDate) - dayjs(pointB.date.startDate);

export const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.date.endDate).diff(dayjs(pointA.date.startDate));
  const timeB = dayjs(pointB.date.endDate).diff(dayjs(pointB.date.startDate));
  return timeB - timeA;
};

export const sortByPrice = (pointA, pointB) => pointB.basicPrice - pointA.basicPrice;

export const getDestinationsList = (destinations) => {
  return destinations.map((destination) => {
    return `<option value="${destination.name}"></option>`;
  }).join('');
};

export const createEventsTypeList = (currentType) => {
  return TYPES
    .map((type) =>
      `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1" data-type="${type}">${capitalizeFirstChar(type)}</label>
    </div>`)
    .join('');
};
