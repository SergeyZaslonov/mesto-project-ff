// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, deleteCardClick) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg =newCard.querySelector('.card__image');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click',deleteCardClick);
  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  cardList.append(addCard(element, deleteCard));
});
