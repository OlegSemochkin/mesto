import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor ({selector, handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._selector = document.querySelector(selector)
    this._form = this._selector.querySelector('.popup__form')
    //console.log(this._selector)
  }
 
  //open() {
  //   super.open()
  // }
  _getInputValues() {
    
    this._inputList = this._form.querySelectorAll('.popup__input');    
    console.log(this._inputList)
      
    this._formValues = {};
    console.log(this._formValues)
  
    
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
      //console.log(this._formValues)
    
    return this._formValues;
  } 

  
  close() {
    super.close ();    
    this._form.reset();
  }

  setEventListeners() { 
    super.setEventListeners()  
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset()
      console.log('обработчик сабмит')
    });
  }
}

