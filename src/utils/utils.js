import { SHORTMOVIE_DURATION } from "./constants";

function transformMovieDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORTMOVIE_DURATION);
}

function filterMovies(movies, query, isShortMoviesSwitcher) {
  const moviesByQuery = movies.filter((movie) => {
    const movieRU = String(movie.nameRU).toLowerCase().trim();
    const movieEN = String(movie.nameEN).toLowerCase().trim();
    const userMovie = query.toLowerCase().trim();

    return movieRU.indexOf(userMovie) !== -1 || movieEN.indexOf(userMovie) !== -1;
  });

  if (isShortMoviesSwitcher) {
    return filterShortMovies(moviesByQuery);
  } else {
    return moviesByQuery;
  }
}

function transformMovies(movies) {
  movies.forEach(movie => {
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
    movie.image = `https://api.nomoreparties.co${movie.image.url}`
  });
  return movies
}

function getSavedMovie(array, movie) {
  return array.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export { transformMovieDuration, filterShortMovies, filterMovies, transformMovies, getSavedMovie }