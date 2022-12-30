import {openPopup} from '../utils/utils.js'
export class Card {
  constructor(place, image, bigPhoto, cardTemplate) {
    this._place = place;
    this._image = image;
    this._popup = bigPhoto.popup;
    this._showPhoto = bigPhoto.photo;
    this._showDescription = bigPhoto.description;
    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.element__place');
    this._photo = this._element.querySelector('.element__photo');
    this._likeButton = this._element.querySelector('.element__like');
  }

  _getTemplate() {
    const newCard = this._cardTemplate.querySelector('.element').cloneNode(true)
    return newCard
  }
  
  generateCard() {  
    this._title.textContent = this._place;
    this._photo.src = this._image;
    this._photo.alt = this._place;
    this._setEventListeners();

    return this._element;
  }

  _handleOpenPopup() {
    openPopup(this._popup)
    this._showPhoto.src = this._image;
    this._showPhoto.alt = this._place;
    this._showDescription.textContent = this._place;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _handleDelCard() {
    this._element.remove();
    this._element = null
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like')) {
        this._handleLikeClick();
      }
      if (evt.target.classList.contains('element__del')) {
        this._handleDelCard();
      }
    });

    this._photo.addEventListener('click', () => {
        this._handleOpenPopup();
      });

     
  }
}