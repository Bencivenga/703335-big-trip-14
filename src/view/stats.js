import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import {getUniqueTypes, getCostsByType, countPointsByType, getDurationByType} from '../utils/stats';
import {humanizeDurationFormat} from '../utils/route-point';

const BAR_HEIGHT = 55;

const moneyFormat = (val) => `€ ${val}`;
const typeFormat = (val) => `${val}x`;
const timeFormat = (val) => `${humanizeDurationFormat(val)}`;

const renderChart = (ctx, uniqueTypes, data, format, title) => {
  ctx.height = BAR_HEIGHT * uniqueTypes.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqueTypes,
      datasets: [{
        data: data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: format,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatsTemplate = () => {

  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>
            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>
            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>
            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};


export default class Stats extends SmartView {
  constructor(points) {
    super();

    this._points = points;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpentChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpentChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpentChart = null;
    }
  }

  getTemplate() {
    return createStatsTemplate(this._points);
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpentChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpentChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    const uniqueTypes = getUniqueTypes(this._points);
    const moneyByTypes = uniqueTypes.map((type) => getCostsByType(this._points, type));
    const pointsByTypes = uniqueTypes.map((type) => countPointsByType(this._points, type));
    const durationsByTypes = uniqueTypes.map((type) => getDurationByType(this._points, type));

    this._moneyChart = renderChart(moneyCtx, uniqueTypes, moneyByTypes, moneyFormat, 'MONEY');
    this._typeChart = renderChart(typeCtx, uniqueTypes, pointsByTypes, typeFormat, 'TYPE');
    this._timeSpentChart = renderChart(timeCtx, uniqueTypes, durationsByTypes, timeFormat, 'TIME-SPEND');
  }

}
