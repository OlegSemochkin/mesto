import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    // this._showPhoto = link;
    // this._showDescription = place;
    this._image = this._popup.querySelector('.element__img'),
    this._description = this._popup.querySelector('.element__description')
    this._popup = document.querySelector(`${selector}`);
    console.log(this._image)
    console.log(this._description)
    console.log(this._popup)
  }

  open() {
    //super.open()   
    this._popup.classList.add('popup_opened')
    this._image.src = this._showPhoto;
    this._description = this._showDescription;
    this._image.alt = this._showDescription; 
  }

  // close() {
  //   super.close()
  // }

  // _handleEscClose() {
  //   super._handleEscClose()
  // }

  // setEventListeners() {
  //   super.setEventListeners()
  // }

  // _outClosePopup() {
  //   super._outClosePopup()
  // }

  // _crossButtonClosePopup() {
  //   super._crossButtonClosePopup()
  // }
}




// setEventListeners() {
//   //закрытие по оверлей
//   this._popup.addEventListener('mousedown', this._outClosePopup.bind(this));

//   //закрытие по иконке Х
//   this._popup.addEventListener('click', this._crossButtonClosePopup.bind(this));
// }

// _outClosePopup(evt) {
//   if (evt.target == evt.currentTarget) {
//     this.close();
//   }
// }

// _crossButtonClosePopup(evt) {
//   if (evt.target.classList.contains('popup__close-icon')) {
//     this.close();
//   }
// }