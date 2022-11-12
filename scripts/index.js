//открытие/закрытие окон
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  popupType.classList.add('popup_closing');
  setTimeout(function () { popupType.classList.remove('popup_closing'); }, 1000);
}

//редактирование профиля
const editForm = document.querySelector('.profile__profile-info');
const openPopupEdit = editForm.querySelector('.profile__edit-button');
const userName = editForm.querySelector('.profile__name');
const userJob = editForm.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_edit');
const closePopupEdit = popupEdit.querySelector('.popup__close-icon');
const nameInput = popupEdit.querySelector('.popup__input_el_name');
const jobInput = popupEdit.querySelector('.popup__input_el_job');
const formEdit = popupEdit.querySelector('.popup__form-element');

openPopupEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});
closePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});
formEdit.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

//добавление карточки вручную
const openPopupAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closePopupAdd = popupAdd.querySelector('.popup__close-icon');
const placeInput = popupAdd.querySelector('.popup__input_el_place');
const linkInput = popupAdd.querySelector('.popup__input_el_link');
const formAdd = popupAdd.querySelector(('.popup__form-element'));

openPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});
closePopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});
formAdd.addEventListener('submit', formSubmitHandlerAdd);

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });
  placeInput.value = '';
  linkInput.value = '';
  closePopup(popupAdd);
}

//карточки из коробки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//создаем карточку и вносим в нее данные из массива
const cardTemplate = document.querySelector('#card').content.querySelector('.element');
const gallery = document.querySelector('.elements__gallery');
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const place = newCard.querySelector('.element__place');
  place.textContent = dataCard.name;

  const img = newCard.querySelector('.element__photo');
  img.src = dataCard.link;
  img.alt = dataCard.name;

  //добавляем отслеживание событий
  const likeButton = newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  const delButton = newCard.querySelector('.element__del').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  //добавляем окно просмотра карточки
  const popupImg = document.querySelector('.popup_image');

  const openPopupImg = newCard.querySelector('.element__photo').addEventListener('click', () => {
    openPopup(popupImg);
    document.querySelector('.element__img').src = img.src;
    document.querySelector('.element__description').textContent = place.textContent;
  });

  const closePopupImg = popupImg.querySelector('.popup__close-icon').addEventListener('click', () => {
    closePopup(popupImg);
  });

  return newCard;
}

//вставляем карточку на страницу
const renderCard = (dataCard) => {
  gallery.prepend(generateCard(dataCard));
}

//делаем это для всех данных из массива
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})