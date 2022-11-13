//открытие/закрытие окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//редактирование профиля
const editForm = document.querySelector('.profile__profile-info');
const openPopupEditButton = editForm.querySelector('.profile__edit-button');
const userName = editForm.querySelector('.profile__name');
const userJob = editForm.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_edit');
const closePopupEditButton = popupEdit.querySelector('.popup__close-icon');
const nameInput = popupEdit.querySelector('.popup__input_el_name');
const jobInput = popupEdit.querySelector('.popup__input_el_job');
const formEdit = popupEdit.querySelector('.popup__form-element');

openPopupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});
closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
formEdit.addEventListener('submit', EditformSubmitHandler);

function EditformSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

//добавление карточки вручную
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closePopupAddButton = popupAdd.querySelector('.popup__close-icon');
const placeInput = popupAdd.querySelector('.popup__input_el_place');
const linkInput = popupAdd.querySelector('.popup__input_el_link');
const formAdd = popupAdd.querySelector(('.popup__form-element'));

openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});
formAdd.addEventListener('submit', AddformSubmitHandler);

function AddformSubmitHandler(evt) {
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