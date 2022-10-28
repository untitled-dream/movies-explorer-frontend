class MoviesAPI {
  constructor({ baseURL, headers }) {
    this._baseUrl = baseURL;
    this._headers = headers;
  }

  async _defaultResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return await res.json();
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._defaultResponse);
  }
}

const moviesAPI = new MoviesAPI({
  baseURL: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesAPI;