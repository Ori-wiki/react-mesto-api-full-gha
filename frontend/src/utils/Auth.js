import { BASE_URL } from './utils';
class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
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
  register = (data) => {
    return fetch(`${this._url}signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._checkResult(res));
  };
  authorize = (email, password) => {
    return fetch(`${this._url}signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResult(res));
  };
  getContent = () => {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResult(res));
  };
}

const auth = new Auth({
  baseUrl: BASE_URL
});

export default auth;
