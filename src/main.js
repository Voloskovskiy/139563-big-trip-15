import EventBoardView from './view/create-board.js'
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
import {render, RenderPosition, replace, remove} from './render.js';

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
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };
  eventComponent.setClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditFormSubmitHandler(() => {
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const boardComponent = new EventBoardView();
render(pageBodyComponent, boardComponent, RenderPosition.BEFOREEND);

if (!tripEvents.length) {
  render(boardComponent, new EmptyEventListView(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent, new SortView(), RenderPosition.BEFOREEND);

  const EventListComponent = new EventListView();
  render(boardComponent, EventListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < tripEvents.length; i++) {
    renderEvent(EventListComponent, tripEvents[i]);
  }
}

const siteRouteInfo = siteBody.querySelector('.trip-main');
render(siteRouteInfo, new RouteInfoView(), RenderPosition.AFTERBEGIN);

const siteRouteCost = siteBody.querySelector('.trip-main__trip-info');
render(siteRouteCost, new RouteCostView(), RenderPosition.BEFOREEND);

const siteFilter = siteBody.querySelector('.trip-controls__filters');
render(siteFilter, new FilterView(), RenderPosition.BEFOREEND);


