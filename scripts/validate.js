const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error-line',
  errorClass: 'popup__input_type_error-message'
};

const enableValidation = (validationConfig);

//показываем текст ошибки валидации и подчеркиваем поле
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
}

//скрываем при устранении 
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(enableValidation.errorClass);
}

//проверяем валидность данных в поле и принимаем решение показать/скрыть текст ошибки
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

//формируем список инпутов в форме и ставим на каждый слушатель
const setInputEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);
  setSubmitButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      setSubmitButtonState(inputList, submitButton);
    });
  });
}

//проверяем все ли поля импутов в текущей форме валидны
function isFormInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;

  })
}

//формируем список форм в документе и для каждой применяем список инпутов
const setFormEventListeners = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    setInputEventListeners(formElement);
  })
};
setFormEventListeners();

//стилизация кнопки и ее функционал (акт/неакт)
function setSubmitButtonState(inputList, submitButton) {
  if (isFormInvalid(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(enableValidation.inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(enableValidation.inactiveButtonClass);
  }
}

//неактивная для сброса ошибок при открытии окна
function disableSubmitButton(formElement) {
  const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(enableValidation.inactiveButtonClass);
}