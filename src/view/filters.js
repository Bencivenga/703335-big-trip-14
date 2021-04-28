import AbstractView from './abstract';

const createFilterItemTemplate = (filters, isChecked) => {
  const {name, count} = filters;

  return `<div class="trip-filters__filter">
                  <input id="filter-${name}" 
                  class="trip-filters__filter-input  visually-hidden" 
                  type="radio" 
                  name="trip-filter" 
                  value="${name}" 
                  ${isChecked ? 'checked' : ''}
                  ${count === 0 ? 'disabled' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count}</label>
                </div>`;
};

const createFiltersTemplate = (filterItems) => {

  const filtersItemTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
                ${filtersItemTemplate}

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export default class Filters extends AbstractView{
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}

