import {Card} from '../components/Card.js';
import { initialCards, validationConfig} from '../utils/constantce.js';
import {FormValidator} from '../components/FormValidator.js';
import { openPopup, closePopup} from '../utils/utils.js';
import Section from '../components/Section.';

//добавление
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add');
const formAddCard = document.forms.add;
const placeInput = formAddCard.elements.place;
const linkInput = formAddCard.elements.link;
//редактир
const profileForm = document.querySelector('.profile__profile-info');
const popupEditOpenButton = profileForm.querySelector('.profile__edit-button');
const userName = profileForm.querySelector('.profile__name');
const userJob = profileForm.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_edit');
const formEditProfile = document.forms.edit;
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;
//для открытия карточки
const bigPhoto = {
  popup: document.querySelector('.popup_image'),
  photo:  document.querySelector('.element__img'),
  description: document.querySelector('.element__description'),
}

//рендеринг карт в разметку
const gallery = document.querySelector('.elements__gallery'); 
console.log(gallery)
// const renderCard = (dataCard, cardContainer) => {
//   const cardElement = dataCard.generateCard();
//   cardContainer.prepend(cardElement);
// }

const cardTemplate = document.querySelector('#card').content

//создание карт из массива
const cardList = new Section({
  data: initialCards,
  renderer: (item)=> {
    const card = new Card(item.name, item.link, bigPhoto, cardTemplate);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement)
   }
  }, 
  gallery
);
cardList.renderItems ()

//добавление карточки вручную
popupAddOpenButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  validationAddForm.hideInputError(placeInput);
  validationAddForm.hideInputError(linkInput);
  validationAddForm.disableSubmitButton();
  formAddCard.reset();
});
formAddCard.addEventListener('submit', addFormSubmitHandler);
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card(placeInput.value, linkInput.value, bigPhoto, cardTemplate);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement)
  formAddCard.reset();
  closePopup(popupAddCard);
}
const validationAddForm = new FormValidator(validationConfig, formAddCard);
 validationAddForm.enableValidation()

//редактирование профиля
popupEditOpenButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  validationEditForm.hideInputError(nameInput);
  validationEditForm.hideInputError(jobInput);  
  validationEditForm.disableSubmitButton();
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
