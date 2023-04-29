export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(`${selector}`);
    //console.log(this._popup)
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose();
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // this._popup.removeEventListener('mousedown', this._outClosePopup.bind(this));
    // this._popup.removeEventListener('click', this._crossButtonClosePopup.bind(this));
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          this.close();
        }
      },
      { once: true }
    );
  }

  setEventListeners() {
    //закрытие по оверлей
    this._popup.addEventListener('mousedown', this._outClosePopup.bind(this));

    //закрытие по иконке Х
    this._popup.addEventListener('click', this._crossButtonClosePopup.bind(this));
  }

  _outClosePopup(evt) {
    if (evt.target == evt.currentTarget) {
      this.close();
    }
  }

  _crossButtonClosePopup(evt) {
    if (evt.target.classList.contains('popup__close-icon')) {
      this.close();
      console.log('слущатели удал')
    }
  }
}
