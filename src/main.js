import EventBoardView from './view/create-board'
import SiteMenuView from './view/site-menu.js';
import EmptyEventListView from './view/create-event-list-empty.js';
import RouteInfoView from './view/site-route-info.js'
import RouteCostView from './view/site-route-cost.js'
import FilterView from './view/site-filter.js'
import SortView from './view/site-sorting.js'
import EventListView from './view/create-event-list.js'
import EventEditFormView from './view/create-event-edit-form.js'
import EventItemView from './view/create-event-item.js'
import {generateEvent} from './mock/trip-event.js';
import {render, RenderPosition} from './utils.js';

const EVENT_COUNT = 15;
const tripEvents = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteBody = document.querySelector('.page-body');
const pageBodyComponent = document.querySelector('main .page-body__container');
const siteHeaderMenu = siteBody.querySelector('.trip-controls__navigation');

render(siteHeaderMenu, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventItemView(event);
  const eventEditComponent = new EventEditFormView(event);

  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const boardComponent = new EventBoardView();
render(pageBodyComponent, boardComponent.getElement(), RenderPosition.BEFOREEND);

if (!tripEvents.length) {
  render(boardComponent.getElement(), new EmptyEventListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

  const EventListComponent = new EventListView();
  render(boardComponent.getElement(), EventListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < tripEvents.length; i++) {
    renderEvent(EventListComponent.getElement(), tripEvents[i]);
  }
}

const siteRouteInfo = siteBody.querySelector('.trip-main');
render(siteRouteInfo, new RouteInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteRouteCost = siteBody.querySelector('.trip-main__trip-info');
render(siteRouteCost, new RouteCostView().getElement(), RenderPosition.BEFOREEND);

const siteFilter = siteBody.querySelector('.trip-controls__filters');
render(siteFilter, new FilterView().getElement(), RenderPosition.BEFOREEND);


