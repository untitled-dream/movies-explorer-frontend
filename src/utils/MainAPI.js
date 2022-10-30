class MainAPI {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  async _defaultResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return await res.json();
  }

  createUser({ name, email, password }) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name, email, password
      })
    }).then(this._defaultResponse)
  }

  login({ email, password }) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    }).then(this._defaultResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt") }`
      }
    }).then(this._defaultResponse)
  }

  updateCurrentUser({ name, email }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, email })
    }).then(this._defaultResponse)
  }

  getSavedMovies() {
    return fetch(`${this._baseURL}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._defaultResponse)
  }


  createSavedMovie(data) {
    return fetch(`${this._baseURL}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._defaultResponse)
  }

  removeSavedMovie(data) {
    return fetch(`${this._baseURL}/movies/${data}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._defaultResponse)
  }
}

const mainAPI = new MainAPI({
  baseURL: "https://api.beat-film.nomoredomains.icu",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainAPI;