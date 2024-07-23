import {myProfile} from './index.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18/',
  headers: {
    authorization: 'b5fb99ba-cd3c-404d-b5be-67b006f1ba5c',
    'Content-Type': 'application/json'
  }
}

export const getMyProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
  .then ((res) => { 
    if (res.ok) return res.json()
    else return Promise.reject(res.status)
  })
}

export const setMyProfile = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then ((res) => { 
    if (res.ok) return res.json()
    else return Promise.reject(res.status)
  })
}

export const setMyAvatar = (avatar) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    avatar: avatar
    })
  })
  .then ((res) => { 
    if (res.ok) return res.json()
    else return Promise.reject(res.status)
  })
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) return res.json()
    else return Promise.reject(res.status)
  })
}