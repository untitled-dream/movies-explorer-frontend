import "./Movies.css";

import { useState, useContext, useEffect } from "react";

import {
  transformMovies,
  filterMovies,
  filterShortMovies,
} from "../../utils/utils.js";

import moviesAPI from "../../utils/MoviesAPI";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Movies = ({
  setIsLoader,
  setIsTooltip,
  savedMovies,
  onLikeClick,
  onDislikeClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isAllMovies, setIsAllMovies] = useState([]);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);

    if (moviesList.length === 0) {
      setIsTooltip({
        isOpen: true,
        state: false,
        messageText: "По Вашему запросу ничего не найдено",
      });
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setDefaultMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function handleShortFilms() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setFilteredMovies(filterShortMovies(defaultMovies));
    } else {
      setFilteredMovies(defaultMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !isShortMovies);
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, isShortMovies);

    if (isAllMovies.length === 0) {
      setIsLoader(true);
      moviesAPI
        .getMovies()
        .then((movies) => {
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            transformMovies(movies),
            inputValue,
            isShortMovies
          );
        })
        .catch(() =>
          setIsTooltip({
            isOpen: true,
            state: false,
            messageText:
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          })
        )
        .finally(() => setIsLoader(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, isShortMovies);
    }
  }

  useEffect(() => {
    if (filteredMovies.length === 0 && isShortMovies) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredMovies, isShortMovies]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setDefaultMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === "true"
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        isShortMovies={isShortMovies}
        handleShortFilms={handleShortFilms}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!notFound && (
        <MoviesCardList
          movieList={filteredMovies}
          savedMovies={savedMovies}
          onLikeClick={onLikeClick}
          onDislikeClick={onDislikeClick}
        />
      )}
    </main>
  );
};

export default Movies;
