import '../pages/index.css';

import {initialCards} from '../components/cards.js';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

export const dialogEdit = document.querySelector('.popup_type_edit');
export const dialogAdd = document.querySelector('.popup_type_new-card');
export const dialogImage = document.querySelector('.popup_type_image');

export const formEdit = document.forms.edit_profile;
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

function saveProfileEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent=formEdit.name.value;
  profileDescription.textContent=formEdit.description.value;
  closeModal(dialogEdit);
}

export function openDialogAddCard() {
  openModal(dialogAdd);
  formAdd.place_name.focus();
}

function saveCard(evt) {
  evt.preventDefault();
  const card = {
    name: formAdd.place_name.value,
    link: formAdd.link.value,
  };
  cardList.append(createCard(card,deleteCard,likeCard,openImage));
  formAdd.reset();
  closeModal(dialogAdd);
}

export function openImage(card) {
  openModal(dialogImage);
  popupImageImg.src = card.link;
  popupImageImg.alt = card.name;
  popupImageCaption.textContent = card.name;
}

function initCards() {
  formAdd.addEventListener('submit', saveCard);
  // @todo: Вывести карточки на страницу
  initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, likeCard, openImage));
  });
}

function initModals() {
  document.querySelector('.profile__edit-button').addEventListener('click',openDialogProfileEdit);
  document.querySelector('.profile__add-button').addEventListener('click',openDialogAddCard);

  formEdit.addEventListener('submit', saveProfileEdit);
}

initCards();
initModals();