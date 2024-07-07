import {initialCards} from './cards.js';
import {openImage} from './modal.js';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
export const cardList = document.querySelector('.places__list');

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

// @todo: Вывести карточки на страницу
export function initCards() {
  initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, likeCard, openImage));
  });
}
