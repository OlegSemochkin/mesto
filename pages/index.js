import {Card} from '../components/Card.js';
import { initialCards, validationConfig} from '../utils/constantce.js';
import {FormValidator} from '../components/FormValidator.js';
//import { openPopup, closePopup} from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm  from '../components/PopupWhisForm.js';
import UserInfo from '../components/UserInfo.js';


//добавление
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add');
const formAddCard = document.forms.add;
const placeInput = formAddCard.elements.place;
const linkInput = formAddCard.elements.link;
//редактир
const profileForm = document.querySelector('.profile__profile-info');
const popupEditOpenButton = profileForm.querySelector('.profile__edit-button');
const userName = profileForm.querySelector('.profile__name');
const userJob = profileForm.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_edit');
const formEditProfile = document.forms.edit;
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;
//для открытия карточки
const bigPhoto = {
  popup: document.querySelector('.popup_image'),
  photo:  document.querySelector('.element__img'),
  description: document.querySelector('.element__description'),
  }

//рендеринг карт в разметку
const gallery = document.querySelector('.elements__gallery'); 
// const renderCard = (dataCard, cardContainer) => {
//   const cardElement = dataCard.generateCard();
//   cardContainer.prepend(cardElement);
// }

const cardTemplate = document.querySelector('#card').content
//console.log(cardTemplate)
//создание карт из массива
const showPhoto = new PopupWithImage('.popup_image')
console.log(showPhoto)
// const newCard = new Card(place, image,
//   {handelCardClick: () => {
//     showPhoto.open()
//   }
//    }, 
//    cardTemplate,
//   )

const cardList = new Section({
  data: initialCards,
  renderer: (item)=> {
    const card = new Card(
      item.name, 
      item.link,
       
     {handelCardClick: () => {
      showPhoto.open(item.name, 
        item.link)
     }
     },  
     cardTemplate,
    );

    const cardElement = card.generateCard();
    cardList.addItem(cardElement)
   }
  }, 
  gallery
);
cardList.renderItems ()
// //добавление карточки вручную
// popupAddOpenButton.addEventListener('click', () => {
//   const popup = new Popup({selector:'.popup_add'})
//   popup.open()
//   validationAddForm.hideInputError(placeInput);
//   validationAddForm.hideInputError(linkInput);
//   validationAddForm.disableSubmitButton();
//   formAddCard.reset();
// });
// formAddCard.addEventListener('submit', addFormSubmitHandler);
// function addFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const card = new Card(placeInput.value, linkInput.value, bigPhoto, cardTemplate);
//   renderCard(card,gallery)
//   formAddCard.reset();
//   closePopup(popupAddCard);
// }
// const validationAddForm = new FormValidator(validationConfig, formAddCard);
//  validationAddForm.enableValidation()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//добавление карточки вручную
popupAddOpenButton.addEventListener('click', () => {  
  oneCard.renderItems()
 }
);


const oneCard = new Section ({
  data: [initialCards],
  renderer: () => {   
    const popupAdd = new PopupWithForm ({selector:'.popup_add', 
   handleFormSubmit:() => {
   const card = new Card(placeInput.value, linkInput.value, bigPhoto, cardTemplate);
   const cardElement = card.generateCard();
    
    oneCard.addItem(cardElement)
    popupAdd.close()  
      }
    } 
  )
   popupAdd.open()
   validationAddForm.hideInputError(placeInput);
   validationAddForm.hideInputError(linkInput);
   validationAddForm.disableSubmitButton(); 
  }
   },
   gallery
   );

   
   



const validationAddForm = new FormValidator(validationConfig, formAddCard);
 validationAddForm.enableValidation()











//редактирование профиля
const userProfile = new UserInfo( {userName:'profile__name', userJob:'profile__job'})

const popupEdit = new PopupWithForm ({selector:'.popup_edit',  
 handleFormSubmit: () => {
  userProfile.setUserInfo()
  popupEdit.close()
  }  
} 
 )
 
popupEditOpenButton.addEventListener('click', () => { 
  popupEdit.open()
  userProfile.getUserInfo()
 
  validationEditForm.hideInputError(nameInput);
  validationEditForm.hideInputError(jobInput);  
  validationEditForm.disableSubmitButton();
});

// formEditProfile.addEventListener('submit', editFormSubmitHandler);
// function editFormSubmitHandler(evt) {
//   evt.preventDefault();
//   userName.textContent = nameInput.value;
//   userJob.textContent = jobInput.value;
//   popup.close()
// }
const validationEditForm = new FormValidator(validationConfig, formEditProfile);
validationEditForm.enableValidation()
