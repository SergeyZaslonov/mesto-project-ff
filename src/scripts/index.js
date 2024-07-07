// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCardClick) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg =newCard.querySelector('.card__image');
  cardImg.src=card.link;
  cardImg.alt='Фотография '+card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click',() => deleteCardClick(newCard));
  return newCard;
}

// @todo: Функция удаления карточки
function deleteCardClick(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  cardList.append(createCard(element, deleteCardClick));
});
