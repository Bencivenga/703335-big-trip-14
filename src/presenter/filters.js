import FiltersView from '../view/filters';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {filters} from '../utils/filters';
import {FilterType, UpdateType} from '../data';

export default class Filters {
  constructor(filtersContainer, filtersModel, routePointsModel) {
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;
    this._routePointsModel = routePointsModel;

    this._filtersComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._routePointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();

    const prevFiltersComponent = this._filtersComponent;

    this._filtersComponent = new FiltersView(filters, this._filtersModel.getFilter());
    this._filtersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFiltersComponent === null) {
      render(this._filtersContainer, this._filtersComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {

    if (this._filtersModel.getFilter() === filterType) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._routePointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: filters[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filters[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: filters[FilterType.PAST](points).length,
      },
    ];
  }
}
