//редактирование профиля
const editForm = document.querySelector('.profile__profile-info');
const editButton = editForm.querySelector('.profile__edit-button');
const userName = editForm.querySelector('.profile__name');
const userJob = editForm.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_edit');
const closeEditButton = popupEdit.querySelector('.popup__close-icon');
const nameInput = popupEdit.querySelector('.popup__input_el_name');
const jobInput = popupEdit.querySelector('.popup__input_el_job');
const formEdit = popupEdit.querySelector('.popup__form-element');

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//закрытие окна


function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
  popupEdit.classList.add('popup_close');
  setTimeout(function () { popupEdit.classList.remove('popup_close'); }, 2000);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopupEdit();
}

editButton.addEventListener('click', openPopupEdit);
closeEditButton.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandler);

//добавление карточки вручную

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closeAddButton = popupAdd.querySelector('.popup__close-icon');
const placeInput = popupAdd.querySelector('.popup__input_el_place');
const linkInput = popupAdd.querySelector('.popup__input_el_link');
const formAdd = popupAdd.querySelector(('.popup__form-element'));


function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopup() {
  popupAdd.classList.remove('popup_opened');
  popupAdd.classList.add('popup_close');
  setTimeout(function () { popupAdd.classList.remove('popup_close'); }, 2000);
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });
  placeInput.value = '';
  linkInput.value = '';
  closePopup();
}

addButton.addEventListener('click', openPopupAdd);
closeAddButton.addEventListener('click', closePopup);
formAdd.addEventListener('submit', formSubmitHandlerAdd);




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

const cardTemplate = document.querySelector('#card').content.querySelector('.element');
const gallery = document.querySelector('.elements__gallery');

//создаем карточку и вносим в нее данные из массива
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
  const delButton = newCard.querySelector('.element__basket').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  //добавляем окно просмотра карточки
  const popupImg = document.querySelector('.popup_image');
  const openCardButton = newCard.querySelector('.element__photo').addEventListener('click', openPopupImg);
  const closeCardButton = popupImg.querySelector('.popup__close-icon').addEventListener('click', closePopupImg);

  function openPopupImg() {
    popupImg.classList.add('popup_opened');
    document.querySelector('.element__photo_show').src = img.src;
    document.querySelector('.element__place_show').textContent = place.textContent;
  }

  function closePopupImg() {
    popupImg.classList.remove('popup_opened');
    popupImg.classList.add('popup_close');
    setTimeout(function () { popupImg.classList.remove('popup_close'); }, 2000);
  }

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

