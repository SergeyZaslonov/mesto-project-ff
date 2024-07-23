const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let openedDialog;

export function openModal(dialog) {
  openedDialog=dialog;
  const form = dialog.querySelector('.popup__form');
  if (form) {
    form.querySelector('.popup__button').classList.add('popup__button_inactive');
  }  
  const errors = dialog.querySelectorAll('.popup__input_error');
  errors.forEach(element => {element.textContent = ''});
  dialog.classList.add(classOpened);
  dialog.addEventListener('keydown', closeDialogByEscape);
  dialog.addEventListener('click', closeDialogByOverlay);
  dialog.querySelector(classBtnClosed).addEventListener('click',closeDialogByButton);
}

export function closeModal(dialog) {
  dialog.removeEventListener('keydown', closeDialogByEscape);
  dialog.removeEventListener('click', closeDialogByOverlay);
  dialog.querySelector(classBtnClosed).removeEventListener('click',closeDialogByButton);
  dialog.classList.remove(classOpened);
}

function closeDialogByButton() {
  closeModal(openedDialog);
}

function closeDialogByEscape(evt) {
  if (evt.key === 'Escape') closeModal(openedDialog);
}

function closeDialogByOverlay(evt) {
  if (evt.target === openedDialog) closeModal(openedDialog);
}