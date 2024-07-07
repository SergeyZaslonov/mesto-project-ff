import '../pages/index.css';

import {initCards} from '../components/card.js';
import {initModals} from '../components/modal.js';

export const dialogEdit = document.querySelector('.popup_type_edit');
export const dialogAdd = document.querySelector('.popup_type_new-card');

export const formEdit = document.forms.edit_profile;
export const formAdd = document.forms.new_place;

initCards();
initModals();