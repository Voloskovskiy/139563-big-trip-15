export const createSiteDetailInfoFormTemplate = (destination, offers) => {
  const {description, photos} = destination;

  const createSiteDetailInfoOfferFormTemplate = (offers) => (
    offers !== null ? `
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${offers.map((offerItem) => `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" >
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offerItem.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offerItem.price}</span>
        </label>
      </div>
      </span>`).join('')}</section>` : ''
  );

  const createSiteDetailInfoDescriptionFormTemplate = (description) => (
    description.length !== 0 ? `<p class="event__destination-description">${description}</p>` : ''
  );

  const createSiteDetailInfoPhotosFormTemplate = (photos) => (
    photos !== null ? `<div class="event__photos-container">
    <div class="event__photos-tape">${photos.map((photoItem) => `<img class="event__photo" src="${photoItem.src}" alt="${photoItem.description}">`).join('')}</div></div>` : ''
  );

  const createSiteDetailInfoDestinationFormTemplate = (description, photos) => {
    if(description.length !== 0 || photos !== null){
      return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${createSiteDetailInfoDescriptionFormTemplate(description)}
      ${createSiteDetailInfoPhotosFormTemplate(photos)}
      </section>`
    }
  }

  if(offers !== null || description.length || photos !== null){
    return `<section class="event__details">
      ${createSiteDetailInfoOfferFormTemplate(offers)}
      ${createSiteDetailInfoDestinationFormTemplate(description, photos)}
    </section>`    
  }
  else{
    return ''
  }
}
