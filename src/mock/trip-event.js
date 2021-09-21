import dayjs from 'dayjs';
import {EVENT_TYPES} from './../const.js';
import {getRandomInteger} from './../common.js';

const generateDate = (dateStart = dayjs()) => {
  return dayjs(dateStart).add(getRandomInteger(500,1000), 'minute').toDate();
}
const generateCityName = () => {
  const cityNames = ['Москва', 'Иваново', 'Брянск', 'Минск', 'Питер', 'Калининград', 'Серпухов', 'Видное', 'Апрелевка'];
  return cityNames[getRandomInteger(0, cityNames.length - 1)];
}
const generateTypePoint = () => {
  return EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)];
}
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. '
  ];
  const randomCountSentence = getRandomInteger(1, 5);
  let sentenceList = '';
  for(let i = 0; i < randomCountSentence; i++){
    sentenceList = sentenceList + descriptions[getRandomInteger(0, descriptions.length - 1)];
  }
  return sentenceList;
}

const generatePhotos = () => {
  const descriptionPhotos = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. '
  ];
  let photoList = [];
  for(let i = 0; i < getRandomInteger(1, 4); i++){
    photoList.push(
      {
        src: 'http://picsum.photos/248/152?r=' + Math.random(),
        description: descriptionPhotos[getRandomInteger(0, descriptionPhotos.length - 1)]
      }
    );
  }
  return photoList;
}

const generateOffers = () => {
  const offers = [
    'Rent a car',
    'Pay to bus',
    'Buy drink',
    'Buy dish',
    'Buy water'
  ];
  let offerList = [];
  for(let i = 0; i < getRandomInteger(0, 5); i++){
    offerList.push(
      {
        title: offers[getRandomInteger(0, offers.length - 1)],
        price: getRandomInteger(50, 500)
      }
    );
  }
  return offerList;
}

export const generateEvent = () => {
  const dateFrom = generateDate();
  const dateTo = generateDate(dateFrom);
  return {
    type: generateTypePoint(),
    offers: generateOffers(),
    id: getRandomInteger(0, 50),
    basePrice: getRandomInteger(150, 5000),
    destination: {
      description: generateDescription(),
      name: generateCityName(),
      photos: generatePhotos(),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
    dateFrom: dateFrom,
    dateTo: dateTo
  }
};