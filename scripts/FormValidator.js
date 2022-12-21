export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _setInputEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._setSubmitButtonState();
      });
    });
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this.hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    this._errorElement = this._form.querySelector(`.${input.name}-error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  hideInputError(input) {
    this._errorElement = this._form.querySelector(`.${input.name}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(`'${this._errorClass}`);
    input.classList.remove(this._inputErrorClass);
  }

  _isFormInvalid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _setSubmitButtonState() {
    if (this._isFormInvalid()) {
      this.disableSubmitButton()
    } else {
      this._activateSubmitButton()
    }
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(`${this._inactiveButtonClass}`);
  }

  _activateSubmitButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(`${this._inactiveButtonClass}`);
  }

  enableValidation() {
    this._setInputEventListeners();
  }
}
