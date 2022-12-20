import {Card} from './Card.js';
import { initialCards, validationConfig} from './data.js';
import {FormValidator} from './FormValidator.js';
import { openPopup, closePopup, hideInputError, disableSubmitButton } from './utils.js';

//добавление
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add');
const formAddCard = document.forms.add;
const placeInput = formAddCard.elements.place;
const linkInput = formAddCard.elements.link;
//редактир
const profileForm = document.querySelector('.profile__profile-info');
const openPopupEditButton = profileForm.querySelector('.profile__edit-button');
const userName = profileForm.querySelector('.profile__name');
const userJob = profileForm.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_edit');
const formEditProfile = document.forms.edit;
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;
//для открытия
const bigPhoto = {
  popup: document.querySelector('.popup_image'),
  photo:  document.querySelector('.element__img'),
  description: document.querySelector('.element__description'),
}

//рендеринг карт в разметку
const gallery = document.querySelector('.elements__gallery'); 
const renderCard = (dataCard) => {
  const cardElement = dataCard.generateCard();
  gallery.prepend(cardElement);
}

//создание карт из массива
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, bigPhoto);
  renderCard(card)
});

//добавление карточки вручную
openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  hideInputError(popupAddCard, placeInput);
  hideInputError(popupAddCard, linkInput);
  disableSubmitButton(popupAddCard);
  formAddCard.reset();
});
formAddCard.addEventListener('submit', addFormSubmitHandler);
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card(placeInput.value, linkInput.value, bigPhoto);
  renderCard(card)
  formAddCard.reset();
  closePopup(popupAddCard);
}
const validationAddForm = new FormValidator(validationConfig, formAddCard);
 validationAddForm.enableValidation()

//редактирование профиля
openPopupEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
   hideInputError(popupEditProfile, nameInput);
   hideInputError(popupEditProfile, jobInput);  
   disableSubmitButton(popupEditProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

formEditProfile.addEventListener('submit', editFormSubmitHandler);
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
const validationEditForm = new FormValidator(validationConfig, formEditProfile);
validationEditForm.enableValidation()
