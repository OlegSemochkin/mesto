//import {openPopup} from '../utils/utils.js'
export class Card {
  constructor(place, image, handleCardClick, cardTemplate) {
    this._place = place;
    this._image = image;
    //this._cardTemplate = cardTemplate;
    this._cardTemplate = document.querySelector('#card').content
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.element__place');
    this._photo = this._element.querySelector('.element__photo');
    this._likeButton = this._element.querySelector('.element__like');
    this._handleCardClick = handleCardClick
    //console.log(this._cardTemplate)
  }

  _getTemplate() {
    
    const newCard = this._cardTemplate.querySelector('.element').cloneNode(true)
    //console.log(newCard)
    return newCard
  }
  
  generateCard() {  
    this._title.textContent = this._place;
    this._photo.src = this._image;
    this._photo.alt = this._place;
    this._setEventListeners();

    return this._element;
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
        this._handleCardClick
        console.log('нажали')
        console.log(this._handleCardClick)
    }
);
      
     
  }
  // _handleCardClick() {
  //   document.querySelector('.popup_image')
  //   .classList.add('popup_opened')
  // }
}
// _handleOpenPopup() {
  //   openPopup(this._popup)
  //   this._showPhoto.src = this._image;
  //   this._showPhoto.alt = this._place;
  //   this._showDescription.textContent = this._place;
  // }
