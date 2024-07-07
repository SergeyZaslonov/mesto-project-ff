import {dialogEdit, dialogAdd, formEdit} from '../scripts/index.js';

const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let dlgOpened;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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

export function initModals() {
  document.querySelector('.profile__edit-button').addEventListener('click',openDialogProfileEdit);
  document.querySelector('.profile__add-button').addEventListener('click',openDialogAddCard);

  formEdit.addEventListener('submit', saveProfileEdit);
}