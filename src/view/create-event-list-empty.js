import {createElement} from './../utils.js';

const createEventListEmptyTemplate = () => (`<p class="trip-events__msg">Click New Event to create your first point</p>`);

export default class EmptyEventList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventListEmptyTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}