import '../pages/index.css';

import {createCard, deleteCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

import {enableValidation} from './validation.js';

import {getMyProfile, setMyProfile, setMyAvatar, getInitialCards} from './api.js';

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
  const btn = formEdit.querySelector('.popup__button');
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
  const btn = formEditAvatar.querySelector('.popup__button');
  btn.textContent = 'Сохранение...';
  evt.preventDefault();
  document.querySelector('.profile__image-avatar').src = formEditAvatar.link.value;
  setMyAvatar(formEditAvatar.link.value)
  .then(() => closeModal(dialogEditAvatar))
  .catch((err) => console.log(err))
  .finally(() => {btn.textContent = 'Сохранить'})
}

export function openDialogAddCard() {
  openModal(dialogAdd);
  formAdd.place_name.focus();
}

export function openDialogDeleteCard() {
  openModal(dialogDelete);
}

function saveCard(evt) {
  evt.preventDefault();
  const card = {
    name: formAdd.place_name.value,
    link: formAdd.link.value,
  };
  cardList.prepend(createCard(card,deleteCard,likeCard,openImage));
  formAdd.reset();
  closeModal(dialogAdd);
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

  formEdit.addEventListener('submit', saveProfileEdit);
  formEditAvatar.addEventListener('submit', saveAvatarEdit);
}

function initProfile() {
  getMyProfile()
  .then((res) => {
    myProfile.id = res._id;
    myProfile.name = res.name;
    myProfile.about = res.about;
    myProfile.avatar = res.avatar;
    profileTitle.textContent = myProfile.name;
    profileDescription.textContent = myProfile.about;
    document.querySelector('.profile__image-avatar').src = myProfile.avatar;
  })
  .catch((err) => console.log(err));
}

function initCards() {
  formAdd.addEventListener('submit', saveCard);
  // @todo: Вывести карточки на страницу
  getInitialCards()
  .then((res) => {
    res.forEach((element) => {
      cardList.append(createCard(element, deleteCard, likeCard, openImage));
    })
  });
}

initModals();
enableValidation();
initProfile();
initCards();
