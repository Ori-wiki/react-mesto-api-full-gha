import { BASE_URL } from './utils';
class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._token = data.token;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  }

  getCards() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}cards/`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResult(res));
  }

  postCard(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      this._checkResult(res);
    });
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResult(res));
  }

  setUserInfo(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResult(res));
  }

  setUserAvatar(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
         authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResult(res));
  }
}
const api = new Api({
  serverUrl: BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  // },
  // token: "e9f215c8-c72b-443d-a34a-34c279d27704",
});

export default api;
