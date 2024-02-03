export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  getInitialCards() {
    return this._checkStatus(
      fetch(`${this._url}/cards`, {
        headers: this._headers,
        method: 'GET'
      })).then((res) => res.data)
  };

  getUserInfo() {
    return this._checkStatus(
      fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: 'GET'
      })).then((res) => res.data)
  };

  deleteCard(cardId) {
    return this._checkStatus(
      fetch(`${this._url}/cards/${cardId}`, {
        headers: this._headers,
        method: 'DELETE'
      })).then((res) => res.data)
  };

  setUserInfo(userInfo) {
    return this._checkStatus(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.about
        })
      })).then((res) => res.data)
  };

  setUserAvatar(avatarUrl) {
    return this._checkStatus(
      fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })).then((res) => res.data)
  };

  addNewCard({ name, link}) {
    return this._checkStatus(
      fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })).then((res) => res.data)
  };

  _checkStatus(promiseResult) {
    return promiseResult.then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  };
  
  addLike(cardId) {
    return this._checkStatus(
      fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT'
      })).then((res) => res.data)
  }

  deleteLike(cardId) {
    return this._checkStatus(
      fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE'
      })).then((res) => res.data)
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}
