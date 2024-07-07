
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


function openDialogAddCard() {
  openModal(dialogAdd);
}

export function openImage(card) {
  openModal(dialogImage);
}

export function initModals() {
  document.querySelector('.profile__edit-button').addEventListener('click',openDialogProfileEdit);
  document.querySelector('.profile__add-button').addEventListener('click',openDialogAddCard);
}