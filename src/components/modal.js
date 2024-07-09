const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let openedDialog;

export function openModal(dialog) {
  openedDialog=dialog;
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