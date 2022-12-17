//открытие окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", escClosePopup);
  popup.addEventListener("click", outClosePopup);
}

//закрытие окна
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopup);
  popup.removeEventListener('click', outClosePopup);
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon')) {
    closePopup(document.querySelector('.popup_opened'));
  }
});

//обработчики события на esc / key out
function escClosePopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function outClosePopup(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
}