let editForm = document.querySelector('.profile-info');
let editButton = editForm.querySelector('.profile-info__edit-button');
let userName = editForm.querySelector('.profile-info__name');
let userJob = editForm.querySelector('.profile-info__job');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-icon');
let submitButton = popup.querySelector('.popup__submit-button');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let form = popup.querySelector('.popup__form-element');

editButton.addEventListener('click', openPopup);

function openPopup() {
  popup.classList.add('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

submitButton.addEventListener('click', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}

form.addEventListener('keydown', function (ent) {
  if (ent.key == "Enter") {
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
  }
}
)