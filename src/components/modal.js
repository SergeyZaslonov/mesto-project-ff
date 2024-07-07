const classOpened = 'popup_is-opened';
const classBtnClosed = '.popup__close';

let dlgOpened;

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