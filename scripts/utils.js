//открытие окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClosePopup);
  popup.addEventListener('mousedown', outClosePopup);
  document.addEventListener('click', crossButtonClosePopup)
}

//закрытие окна
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopup);
  popup.removeEventListener('mousedown', outClosePopup);
  document.removeEventListener('click', crossButtonClosePopup)
}

//обработчики событий отк/закр окон
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

function crossButtonClosePopup(evt) {
  if (evt.target.classList.contains('popup__close-icon')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}