import {openPopup} from './utils.js'
export class Card {
  constructor(place, image, bigPhoto) {
    this._place = place;
    this._image = image;
    this._popup = bigPhoto.popup;
    this._photo = bigPhoto.photo;
    this._description = bigPhoto.description;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector('#card')
      .content.querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__place').textContent = this._place;
    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__photo').alt = this._place;
    this._setEventListeners();

    return this._element;
  }

  _handleOpenPopup() {
    openPopup(this._popup)
    this._photo.src = this._image;
    this._photo.alt = this._place;
    this._description.textContent = this._place;
  }

  _handleLikeClick() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  _handleDelCard() {
    this._element.remove();
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

    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        this._handleOpenPopup();
      });

     
  }
}