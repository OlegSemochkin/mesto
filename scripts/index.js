//открытие окна
function openPopup(popup) {
  popup.classList.add('popup_opened'); 


  function escClosePopup (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  }
  
  function outClosePopup (evt) {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  }

  document.addEventListener('keydown', escClosePopup);
  popup.addEventListener('click', outClosePopup);
}

//закрытие окна


function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  })

  popup.removeEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  })
}

//редактирование профиля
const editForm = document.querySelector('.profile__profile-info');
const openPopupEditButton = editForm.querySelector('.profile__edit-button');
const userName = editForm.querySelector('.profile__name');
const userJob = editForm.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_edit');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close-icon');
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

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
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
const closePopupAddButton = popupAddCard.querySelector('.popup__close-icon');
const formAddCard = document.forms.add;
const placeInput = formAddCard.elements.place;
const linkInput = formAddCard.elements.link;


openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  hideInputError(popupAddCard, placeInput);
  hideInputError(popupAddCard, linkInput);  
  disableSubmitButton(popupAddCard);
});

closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAddCard);

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
  const popupImg = document.querySelector('.popup_image');//
  const openPopupImgButton = newCard.querySelector('.element__photo');
  const closePopupImgButton = popupImg.querySelector('.popup__close-icon');//
  const addImg = document.querySelector('.element__img');//
  const addDescription = document.querySelector('.element__description');//

  openPopupImgButton.addEventListener('click', () => {
    openPopup(popupImg);
    addImg.src = img.src;
    addImg.alt = place.textContent;
    addDescription.textContent = place.textContent;
  });

  closePopupImgButton.addEventListener('click', () => {
    closePopup(popupImg);
  });////////////////////////////////////////////

  return newCard;
}



//вставляем карточку на страницу
const renderCard = (dataCard) => {
  gallery.prepend(generateCard(dataCard));
}

//делаем это для всех данных из массива
initialCards.forEach(renderCard);