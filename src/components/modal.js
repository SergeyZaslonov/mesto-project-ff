const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let openedDialog;

export function openModal(dialog) {
  openedDialog=dialog;
  dialog.classList.add(classOpened);
  dialog.addEventListener('keydown', CloseDialogByEscape);
  dialog.addEventListener('click', CloseDialogByOverlay);
  dialog.querySelector(classBtnClosed).addEventListener('click',CloseDialogByButton);
}

export function closeModal(dialog) {
  dialog.removeEventListener('keydown', CloseDialogByEscape);
  dialog.removeEventListener('click', CloseDialogByOverlay);
  dialog.querySelector(classBtnClosed).removeEventListener('click',CloseDialogByButton);
  dialog.classList.remove(classOpened);
}

function CloseDialogByButton() {
  closeModal(openedDialog);
}

function CloseDialogByEscape(evt) {
  if (evt.key === 'Escape') closeModal(openedDialog);
}

function CloseDialogByOverlay(evt) {
  if (evt.target === openedDialog) closeModal(openedDialog);
}