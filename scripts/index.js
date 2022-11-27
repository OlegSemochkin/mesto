//открытие окна


function openPopup(popup) {
  popup.classList.add('popup_opened');

  

  
  

  
}

//закрытие окна
function escClosePopup (evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

function outClosePopup (evt, popup) {
  if (evt.target == evt.currentTarget) {
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  // const button = popup.querySelector('.popup__button');
  // button.setAttribute('disabled', true);
  // button.classList.add('popup__button_disabled');
  
  document.removeEventListener('keydown', escClosePopup)

  popup.removeEventListener('click', outClosePopup)
}

//редактирование профиля
const editForm = document.querySelector('.profile__profile-info');
const openPopupEditButton = editForm.querySelector('.profile__edit-button');
const userName = editForm.querySelector('.profile__name');
const userJob = editForm.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_edit');
const closePopupEditButton = popupEdit.querySelector('.popup__close-icon');
const formEdit = document.forms.edit;
const nameInput = formEdit.elements.firstname;
const jobInput = formEdit.elements.job;


openPopupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  document.addEventListener('keydown', escClosePopup(popupEdit));
 // popupEdit.addEventListener('click', outClosePopup(popupEdit));
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

formEdit.addEventListener('submit', editFormSubmitHandler);

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}


//добавление карточки вручную
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closePopupAddButton = popupAdd.querySelector('.popup__close-icon');
const formAdd = document.forms.add;
const placeInput = formAdd.elements.place;
const linkInput = formAdd.elements.link;


openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});
formAdd.addEventListener('submit', addFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });
  formAdd.reset();
  closePopup(popupAdd);
}

//отрисовка карт, с данными, хранящимися в массиве

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
  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  newCard.querySelector('.element__del').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  //добавляем окно просмотра карточки
  const popupImg = document.querySelector('.popup_image');
  const openPopupImgButton = newCard.querySelector('.element__photo');
  const closePopupImgButton = popupImg.querySelector('.popup__close-icon');
  const addImg = document.querySelector('.element__img');
  const addDescription = document.querySelector('.element__description');

  openPopupImgButton.addEventListener('click', () => {
    openPopup(popupImg);
    addImg.src = img.src;
    addImg.alt = place.textContent;
    addDescription.textContent = place.textContent;
  });

  closePopupImgButton.addEventListener('click', () => {
    closePopup(popupImg);
  });

  return newCard;
}



//вставляем карточку на страницу
const renderCard = (dataCard) => {
  gallery.prepend(generateCard(dataCard));
}

//делаем это для всех данных из массива
initialCards.forEach(renderCard);