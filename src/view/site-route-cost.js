import AbstractView from './abstract.js';

const createRouteCostTemplate = () => (
  `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
);

export default class RouteCost extends AbstractView{
  getTemplate() {
    return createRouteCostTemplate();
  }
}