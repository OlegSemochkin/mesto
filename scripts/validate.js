

//выводим текст ошибки валидации и подчеркиваем поле

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error-line');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_type_error-message');
}

//скрываем при устранении 
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error-line');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input_type_error-message');
}

//проверяем валидность данных в поле 
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}


//формируем список инпутов в форме и ставим на каждый слушатель
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__button');
  setSubmitButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      setSubmitButtonState(inputList, submitButton);
    });
  });
}

//проверка все-ли поля импутов в текущей форме валидны
function isFormInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;

  })
}

//формируем список форм в документе и для каждой применяем 
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
};

enableValidation();

//стилизация кнопки и ее функционал (акт/неакт)
function setSubmitButtonState(inputList, submitButton) {
  if (isFormInvalid(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  }
}

