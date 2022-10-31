let editForm = document.querySelector('.profile__profile-info');
let editButton = editForm.querySelector('.profile__edit-button');
let userName = editForm.querySelector('.profile__name');
let userJob = editForm.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-icon');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let form = popup.querySelector('.popup__form-element');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);