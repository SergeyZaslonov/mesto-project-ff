export const myProfile = {};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18/',
  headers: {
    authorization: 'b5fb99ba-cd3c-404d-b5be-67b006f1ba5c',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function checkResponse(res) {
  if (res.ok) return res.json()
  else return Promise.reject(`Ошибка ${res.status}`);
}

export const getMyProfile = () => {
  return request(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
}

export const setMyProfile = (name, about) => {
  return request(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
}

export const setMyAvatar = (avatar) => {
  return request(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    avatar: avatar
    })
  })
}

export const getInitialCards = () => {
  return request(`${config.baseUrl}cards`, {
    headers: config.headers
  })
}

export const setLike = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export const unsetLike = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const postNewCard = (card) => {
  return request(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card)
  })
}

export const deleteCard = (card) => {
  return request(`${config.baseUrl}cards/${card.id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(card)
  })
}