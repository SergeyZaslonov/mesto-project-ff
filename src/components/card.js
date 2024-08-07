import {myProfile, setLike,unsetLike} from '../scripts/api.js';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки
export function createCard(card, deleteCardClick, likeCardClick, openImage) {
  const newCard = cardTemplate.cloneNode(true);
  const btnDelete = newCard.querySelector('.card__delete-button');
  const cardImg =newCard.querySelector('.card__image');
  const likeCount = newCard.querySelector('.card__like-count');
  const likeBtn=newCard.querySelector('.card__like-button');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.id = card._id;
  newCard.querySelector('.card__title').textContent = card.name;
  likeCount.textContent = card.likes.length;
  if (myProfile.id===card.owner._id) {
    btnDelete.addEventListener('click',() => deleteCardClick(newCard));
  }
  else {
    btnDelete.remove();
  }

  likeBtn.addEventListener('click',() => likeCardClick(newCard));
  if (card.likes.some((like) => {return like._id===myProfile.id})) 
    likeBtn.classList.toggle('card__like-button_is-active');
  
  cardImg.addEventListener('click',() => openImage(card));
  return newCard;
}

// @todo: Функция лайк карточки
export function likeCard(card) {
  const likeBtn=card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-count');
  if (!likeBtn.classList.contains('card__like-button_is-active')) {
    setLike(card)
    .then((res) => {
      likeBtn.classList.toggle('card__like-button_is-active');
      likeCount.textContent = res.likes.length
    })
    .catch((err) => console.log(err))
  } 
  else {
    unsetLike(card)
    .then((res) => {
      likeBtn.classList.toggle('card__like-button_is-active');
      likeCount.textContent = res.likes.length
    })
    .catch((err) => console.log(err))
  }
}

