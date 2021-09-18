import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSiteRouteTemplate} from './view/site-route-info.js'
import {createSiteRouteCostTemplate} from './view/site-route-cost.js'
import {createSiteFilterTemplate} from './view/site-filter.js'
import {createSiteSortingTemplate} from './view/site-routes-sorting.js'
import {createSiteEventListTemplate} from './view/create-event-list.js'
import {createSiteEventEditFormTemplate} from './view/create-event-edit-form.js'
import {createSiteEventItemTemplate} from './view/create-event-item.js'
import {generateEvent} from './mock/trip-event.js';

const EVENT_COUNT = 15;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const tripEvent = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteBody = document.querySelector('.page-body');
const siteHeaderMenu = siteBody.querySelector('.trip-controls__navigation');

render(siteHeaderMenu, createSiteMenuTemplate(), 'beforeend');

const siteRouteInfo = siteBody.querySelector('.trip-main');
render(siteRouteInfo, createSiteRouteTemplate(), 'afterbegin');

const siteRouteCost = siteBody.querySelector('.trip-main__trip-info');
render(siteRouteCost, createSiteRouteCostTemplate(), 'beforeend');

const siteFilter = siteBody.querySelector('.trip-controls__filters');
render(siteFilter, createSiteFilterTemplate(), 'beforeend');

const siteSort = siteBody.querySelector('.trip-events');
render(siteSort, createSiteSortingTemplate(), 'beforeend');

const siteEventMainContainer = siteBody.querySelector('.trip-events');
render(siteEventMainContainer, createSiteEventListTemplate(), 'beforeend');

const siteEventList = siteBody.querySelector('.trip-events__list');
render(siteEventList, createSiteEventEditFormTemplate(), 'beforeend');

for(let i = 1; i < EVENT_COUNT; i++){
  render(siteEventList, createSiteEventItemTemplate(tripEvent[i]), 'beforeend');
}
