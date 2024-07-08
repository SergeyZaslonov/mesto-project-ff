const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let OpenedDialog;

export function openModal(dlg) {
  OpenedDialog=dlg;
  dlg.classList.add(classOpened);
  dlg.addEventListener('keydown', CloseDialogByEscape);
  dlg.addEventListener('click', CloseDialogByOverlay);
  dlg.querySelector(classBtnClosed).addEventListener('click',CloseDialogByButton);
}

export function closeModal(dlg) {
  dlg.removeEventListener('keydown', CloseDialogByEscape);
  dlg.removeEventListener('click', CloseDialogByOverlay);
  dlg.querySelector(classBtnClosed).removeEventListener('click',CloseDialogByButton);
  dlg.classList.remove(classOpened);
}

function CloseDialogByButton() {
  closeModal(OpenedDialog);
}

function CloseDialogByEscape(evt) {
  if (evt.key === 'Escape') closeModal(OpenedDialog);
}

function CloseDialogByOverlay(evt) {
  if (evt.target === OpenedDialog) closeModal(OpenedDialog);
}