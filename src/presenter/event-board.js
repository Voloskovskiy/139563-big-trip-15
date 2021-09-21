import EventBoardView from './../create-board.js';
import FilterView from './view/site-filter.js'
import SortView from './view/site-sorting.js'
import EventListView from './view/create-event-list.js'
import EventEditFormView from './view/create-event-edit-form.js'
import EventItemView from './view/create-event-item.js'
import EmptyEventListView from './view/create-event-list-empty.js';

export default class TripBoard {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventComponent = new EventBoardView();
    this._sortComponent = new SortView();
    this._filterComponent = new FilterView();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new EmptyEventListView();
  }

  init(tripEvents){
    this._tripEvents = tripEvents.slice();

    render(this._tripContainer, this._eventComponent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  _renderTripBoard() {
    if (!this._tripEvents.length) {
      this._noEventComponent();
      return;
    }

    this._renderEventList();
    this._sortEventList();
    this._renderEvents();

  }

  _renderEventList(){
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents(){
    this._tripEvents.forEach(tripEvent => {
      this._renderEvent(tripEvent);
    });
  }

  _renderEvent(tripEvent){
    const eventComponent = new EventItemView(tripEvent);
    const eventEditComponent = new EventEditFormView(tripEvent);

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

    render(this._eventListComponent, eventComponent, RenderPosition.BEFOREEND);
  }

  _noEventComponent(){
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _sortEventList(){
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }
}