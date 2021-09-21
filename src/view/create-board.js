import AbstractView from './abstract.js';

const createBoardTemplate = () => '<section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>';

export default class EventBoard extends AbstractView{
  getTemplate() {
    return createBoardTemplate();
  }
}