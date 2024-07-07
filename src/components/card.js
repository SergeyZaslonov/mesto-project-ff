import {dialogAdd, formAdd} from '../scripts/index.js';
import {initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
export const cardList = document.querySelector('.places__list');

const dialogImage = document.querySelector('.popup_type_image');
const popupImageImg = dialogImage.querySelector('.popup__image');
const popupImageCaption = dialogImage.querySelector('.popup__caption');

// @todo: Функция создания карточки
export function createCard(card, deleteCardClick, likeCardClick, openImage) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg =newCard.querySelector('.card__image');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click',() => deleteCardClick(newCard));
  const likeBtn=newCard.querySelector('.card__like-button');
  likeBtn.addEventListener('click',() => likeCardClick(likeBtn));
  cardImg.addEventListener('click',() => openImage(card));
  return newCard;
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайк карточки
export function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
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

function openImage(card) {
  openModal(dialogImage);
  popupImageImg.src = card.link;
  popupImageImg.alt = card.name;
  popupImageCaption.textContent = card.name;
}

export function initCards() {
  formAdd.addEventListener('submit', saveCard);
  // @todo: Вывести карточки на страницу
  initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, likeCard, openImage));
  });
}
