import {cardList, createCard, deleteCard, likeCard} from './card.js';

const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let dlgOpened;

const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAdd = document.querySelector('.popup_type_new-card');
const dialogImage = document.querySelector('.popup_type_image');

const formEdit = document.forms.edit_profile;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAdd = document.forms.new_place;

const popupImageImg = dialogImage.querySelector('.popup__image');
const popupImageCaption = dialogImage.querySelector('.popup__caption');

export function openModal(dlg) {
  dlgOpened=dlg;
  dlg.classList.add(classOpened);
  dlg.addEventListener('keydown', dialogCloseByEscape);
  dlg.addEventListener('click', dialogCloseByOverlay);
  dlg.querySelector(classBtnClosed).addEventListener('click',dialogCloseByButton);
}

export function closeModal(dlg) {
	dlg.removeEventListener('keydown', dialogCloseByEscape);
	dlg.removeEventListener('click', dialogCloseByOverlay);
  dlg.querySelector(classBtnClosed).removeEventListener('click',dialogCloseByButton);
  dlg.classList.remove(classOpened);
}

function dialogCloseByButton() {
  closeModal(dlgOpened);
}

function dialogCloseByEscape(evt) {
  if (evt.key === 'Escape') closeModal(dlgOpened);
}

function dialogCloseByOverlay(evt) {
  if (evt.target === dlgOpened) closeModal(dlgOpened);
}

function openDialogProfileEdit() {
  openModal(dialogEdit);
  formEdit.name.value=profileTitle.textContent;
  formEdit.description.value=profileDescription.textContent;
}

function saveProfileEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent=formEdit.name.value;
  profileDescription.textContent=formEdit.description.value;
  closeModal(dialogEdit);
}

function openDialogAddCard() {
  openModal(dialogAdd);
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

export function initModals() {
  document.querySelector('.profile__edit-button').addEventListener('click',openDialogProfileEdit);
  document.querySelector('.profile__add-button').addEventListener('click',openDialogAddCard);

  formEdit.addEventListener('submit', saveProfileEdit);
  formAdd.addEventListener('submit', saveCard);
}