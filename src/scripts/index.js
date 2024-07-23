import '../pages/index.css';

import {createCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

import {enableValidation} from './validation.js';

import {getMyProfile, setMyProfile, setMyAvatar, getInitialCards, postNewCard, deleteCard} from './api.js';

export const myProfile = {};

export const dialogEdit = document.querySelector('.popup_type_edit');
export const dialogEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const dialogAdd = document.querySelector('.popup_type_new-card');
export const dialogDelete = document.querySelector('.popup_type_delete_card');

export const dialogImage = document.querySelector('.popup_type_image');

export const formEdit = document.forms.edit_profile;
export const formEditAvatar = document.forms.edit_avatar;
export const formAdd = document.forms.new_place;

const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImageImg = dialogImage.querySelector('.popup__image');
const popupImageCaption = dialogImage.querySelector('.popup__caption');

export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__input_error',
  errorClass: 'popup__input_error_active'
};

function openDialogProfileEdit() {
  openModal(dialogEdit);
  formEdit.name.value=profileTitle.textContent;
  formEdit.description.value=profileDescription.textContent;
  formEdit.name.focus();
}

function openDialogProfileAvatarEdit() {
  openModal(dialogEditAvatar);
  formEditAvatar.link.focus();
}

function saveProfileEdit(evt) {
  const btn = formEdit.querySelector(configValidation.submitButtonSelector);
  btn.textContent = 'Сохранение...';
  evt.preventDefault();
  profileTitle.textContent=formEdit.name.value;
  profileDescription.textContent=formEdit.description.value;
  setMyProfile(formEdit.name.value,formEdit.description.value)
  .then(() => closeModal(dialogEdit))
  .catch((err) => console.log(err))
  .finally(() => {btn.textContent = 'Сохранить'})
}

function saveAvatarEdit(evt) {
  const btn = formEditAvatar.querySelector(configValidation.submitButtonSelector);
  btn.textContent = 'Сохранение...';
  evt.preventDefault();
  document.querySelector('.profile__image-avatar').src = formEditAvatar.link.value;
  setMyAvatar(formEditAvatar.link.value)
  .then(() => closeModal(dialogEditAvatar))
  .catch((err) => console.log(err))
  .finally(() => {btn.textContent = 'Сохранить'})
}

export function openDialogAddCard(card) {
  openModal(dialogAdd);
  formAdd.place_name.focus();
}

function openDialogDeleteCard(card) {
  dialogDelete.querySelector(configValidation.submitButtonSelector).card = card;
  openModal(dialogDelete);
}

function executeDeleteCard(evt) {
  const card = evt.target.card;
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
  formAdd.reset();
  postNewCard(card)
  .then((res) => {
    const card =  createCard(res, openDialogDeleteCard, likeCard, openImage);
    cardList.prepend(card);
  })
  .then(() => closeModal(dialogAdd))
  .catch((err) => console.log(err))
  .finally(() => {btn.textContent = 'Сохранить'})
  // const card = {
  //   name: 'Калининград',
  //   link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/q76g/hPdFbeeNE',
  //   link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/EsCd/bnCtc5wiR'
  // };
}

export function openImage(card) {
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
