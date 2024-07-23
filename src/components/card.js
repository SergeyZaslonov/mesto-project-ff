import {myProfile, setLike,unsetLike} from '../scripts/api.js';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки
export function createCard(card, deleteCardClick, likeCardClick, openImage) {
  const newCard = cardTemplate.cloneNode(true);
  const btnDelete = newCard.querySelector('.card__delete-button');
  const cardImg =newCard.querySelector('.card__image');
  const likeCount = newCard.querySelector('.card__like-count');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.id = card._id;
  newCard.querySelector('.card__title').textContent = card.name;
  likeCount.textContent = card.likes.length;
  if (card.likes.some((like) => {return like._id===myProfile.id})) { 
    const likeBtn=newCard.querySelector('.card__like-button');
    likeBtn.classList.toggle('card__like-button_is-active');
  }
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

// @todo: Функция лайк карточки
export function likeCard(card) {
  const likeBtn=card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-count');
  likeBtn.classList.toggle('card__like-button_is-active');
  if (likeBtn.classList.contains('card__like-button_is-active')) {
    setLike(card)
    .then((res) => {
      likeCount.textContent = res.likes.length
    })
    .catch((err) => console.log(err))
  } 
  else {
    unsetLike(card)
    .then((res) => {
      likeCount.textContent = res.likes.length
    })
    .catch((err) => console.log(err))
  }
}

