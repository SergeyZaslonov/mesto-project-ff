import '../pages/index.css';

import {createCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

import {enableValidation, clearValidation} from './validation.js';

import {myProfile, getMyProfile, setMyProfile, setMyAvatar, getInitialCards, postNewCard, deleteCard} from './api.js';

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__input_error',
  errorClass: 'popup__input_error_active'
};

const dialogEdit = document.querySelector('.popup_type_edit');
const formEdit = document.forms.edit_profile;
const formEditSubmitButton = formEdit.querySelector(configValidation.submitButtonSelector);

const dialogEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.forms.edit_avatar;
const formEditAvatarSubmitButton = formEditAvatar.querySelector(configValidation.submitButtonSelector);

const dialogAdd = document.querySelector('.popup_type_new-card');
const formAdd = document.forms.new_place;

const dialogDelete = document.querySelector('.popup_type_delete_card');
const dialogDeleteSubmitButton = dialogDelete.querySelector(configValidation.submitButtonSelector)

const dialogImage = document.querySelector('.popup_type_image');

const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImageImg = dialogImage.querySelector('.popup__image');
const popupImageCaption = dialogImage.querySelector('.popup__caption');

function openDialogProfileEdit() {
  clearValidation(formEdit,configValidation);
  formEdit.reset();
  openModal(dialogEdit);
  formEdit.name.value=profileTitle.textContent;
  formEdit.description.value=profileDescription.textContent;
  formEdit.name.focus();
}

function openDialogProfileAvatarEdit() {
  clearValidation(formEditAvatar,configValidation);
  formEditAvatar.reset();
  openModal(dialogEditAvatar);
  formEditAvatar.link.focus();
}

function saveProfileEdit(evt) {
  formEditSubmitButton.textContent = 'Сохранение...';
  evt.preventDefault();
  setMyProfile(formEdit.name.value,formEdit.description.value)
  .then(() => {
    profileTitle.textContent=formEdit.name.value;
    profileDescription.textContent=formEdit.description.value;
    closeModal(dialogEdit)
  })
  .catch((err) => console.log(err))
  .finally(() => {formEditSubmitButton.textContent = 'Сохранить'})
}

function saveAvatarEdit(evt) {
  formEditAvatarSubmitButton.textContent = 'Сохранение...';
  evt.preventDefault();
  setMyAvatar(formEditAvatar.link.value)
  .then(() => {
    document.querySelector('.profile__image-avatar').src = formEditAvatar.link.value;
    closeModal(dialogEditAvatar)
  })
  .catch((err) => console.log(err))
  .finally(() => {formEditAvatarSubmitButton.textContent = 'Сохранить'})
}

function openDialogAddCard(card) {
  clearValidation(formAdd,configValidation);
  formAdd.reset();
  openModal(dialogAdd);
  formAdd.place_name.focus();
}

function openDialogDeleteCard(card) {
  dialogDelete.card = card;
  openModal(dialogDelete);
}

function executeDeleteCard(evt) {
  const card = dialogDelete.card;
  deleteCard(card)
  .then(() => {
    card.remove();
    closeModal(dialogDelete)
  }) 
  .catch((err) => console.log(err))
} 

function saveCard(evt) {
  const btn = formAdd.querySelector(configValidation.submitButtonSelector);
  btn.textContent = 'Сохранение...';
  evt.preventDefault();
  const card = {
    name: formAdd.place_name.value,
    link: formAdd.link.value,
    likes: []
  };
  postNewCard(card)
  .then((res) => {
    const card =  createCard(res, openDialogDeleteCard, likeCard, openImage);
    cardList.prepend(card);
  })
  .then(() => closeModal(dialogAdd))
  .catch((err) => console.log(err))
  .finally(() => {btn.textContent = 'Сохранить'})
}

function openImage(card) {
  openModal(dialogImage);
  popupImageImg.src = card.link;
  popupImageImg.alt = card.name;
  popupImageCaption.textContent = card.name;
}

function initModals() {
  document.querySelector('.profile__edit-button').addEventListener('click',openDialogProfileEdit);
  document.querySelector('.profile__image').addEventListener('click',openDialogProfileAvatarEdit);
  document.querySelector('.profile__add-button').addEventListener('click',openDialogAddCard);

  formAdd.addEventListener('submit', saveCard);
  formEdit.addEventListener('submit', saveProfileEdit);
  formEditAvatar.addEventListener('submit', saveAvatarEdit);
  
  dialogDelete.querySelector(configValidation.submitButtonSelector).addEventListener('click', executeDeleteCard);
}

function initProfileAndCards() {
  Promise.all([getMyProfile(), getInitialCards()])
  .then (([profile, listCards]) => {
    myProfile.id = profile._id;
    myProfile.name = profile.name;
    myProfile.about = profile.about;
    myProfile.avatar = profile.avatar;
    profileTitle.textContent = myProfile.name;
    profileDescription.textContent = myProfile.about;
    document.querySelector('.profile__image-avatar').src = myProfile.avatar;

    listCards.forEach((element) => {
      const card =  createCard(element, openDialogDeleteCard, likeCard, openImage);
      cardList.append(card);
    })
  })  
  .catch((err) => console.log(err));
}

initModals();
enableValidation(configValidation);
initProfileAndCards();
