import {initialCards} from './cards.js';

// @todo: DOM ����
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardList = document.querySelector('.places__list');

// @todo: ������� �������� ��������
export function createCard(card, deleteCardClick) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg =newCard.querySelector('.card__image');
  cardImg.src=card.link;
  cardImg.alt='���������� '+card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click',() => deleteCardClick(newCard));
  return newCard;
}

// @todo: ������� �������� ��������
export function deleteCardClick(card) {
  card.remove();
}

// @todo: ������� �������� �� ��������
export function viewAllCard() {
  initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCardClick));
  });
}
