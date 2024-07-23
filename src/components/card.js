import {myProfile, openDialogDeleteCard} from '../scripts/index.js';
import {setLike,unsetLike} from '../scripts/api.js';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки
export function createCard(card, deleteCardClick, likeCardClick, openImage) {
  const newCard = cardTemplate.cloneNode(true);
  const btnDelete = newCard.querySelector('.card__delete-button');
  const cardImg =newCard.querySelector('.card__image');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  if (myProfile.id===card.owner._id) {
    btnDelete.addEventListener('click',() => deleteCardClick(newCard));
  }
  else {
    btnDelete.remove();
    const likeBtn=newCard.querySelector('.card__like-button');
    likeBtn.addEventListener('click',() => likeCardClick(newCard));
  }
  cardImg.addEventListener('click',() => openImage(card));
  return newCard;
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  openDialogDeleteCard();
  card.remove();
}

// @todo: Функция лайк карточки
export function likeCard(card) {
  const likeBtn=card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-count');
  likeBtn.classList.toggle('card__like-button_is-active');
  if (likeBtn.classList.contains('card__like-button_is-active')) {
    setLike(card)
    .then(() => {
      likeCount.textContent = parseInt(likeCount.textContent) +1})
    .catch((err) => console.log(err))
  } 
  else {
    unsetLike(card)
    .then(() => {
      likeCount.textContent = parseInt(likeCount.textContent) -1})
    .catch((err) => console.log(err))
  }
}

