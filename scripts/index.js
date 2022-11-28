//открытие окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClosePopup);
  popup.addEventListener('click', outClosePopup);
}

//закрытие окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopup);
  popup.removeEventListener('click', outClosePopup);
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon')) {
    closePopup(document.querySelector('.popup_opened'))
  }
})

//слушатели на esc / key out
function escClosePopup (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function outClosePopup (evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//редактирование профиля
const profileForm = document.querySelector('.profile__profile-info');
const openPopupEditButton = profileForm.querySelector('.profile__edit-button');
const userName = profileForm.querySelector('.profile__name');
const userJob = profileForm.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_edit');
const formEditProfile = document.forms.edit;
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;

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

//добавление карточки вручную
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add');
const formAddCard = document.forms.add;
const placeInput = formAddCard.elements.place;
const linkInput = formAddCard.elements.link;

openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  hideInputError(popupAddCard, placeInput);
  hideInputError(popupAddCard, linkInput);  
  disableSubmitButton(popupAddCard);
});

formAddCard.addEventListener('submit', addFormSubmitHandler);
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });
  formAddCard.reset();
  closePopup(popupAddCard);
}

//отрисовка карт, с данными, хранящимися в массиве
const cardTemplate = document.querySelector('#card').content.querySelector('.element');
const gallery = document.querySelector('.elements__gallery');
const popupImg = document.querySelector('.popup_image');
const addImg = document.querySelector('.element__img');
const addDescription = document.querySelector('.element__description');
gallery.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active')
  };
})

gallery.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__del')) {
    evt.target.closest('.element').remove();
  };
})

//создаем карточку и вносим в нее данные из массива
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const place = newCard.querySelector('.element__place');
  place.textContent = dataCard.name;

  const img = newCard.querySelector('.element__photo');
  img.src = dataCard.link;
  img.alt = dataCard.name;  

  const openPopupImgButton = img; 
  openPopupImgButton.addEventListener('click', () => {
    openPopup(popupImg);
    addImg.src = img.src;
    addImg.alt = place.textContent;
    addDescription.textContent = place.textContent;
  });
  
  return newCard;
}

//вставляем карточку на страницу
const renderCard = (dataCard) => {
  gallery.prepend(generateCard(dataCard));
}

//делаем это для всех данных из массива
initialCards.forEach(renderCard);