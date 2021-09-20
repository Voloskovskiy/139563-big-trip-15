import {createElement} from './../utils.js';

const createBoardTemplate = () => '<section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>';

export default class EventBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
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