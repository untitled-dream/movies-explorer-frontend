import "./Movies.css";

import { useState, useEffect } from "react";

import {
  transformMovies,
  filterMovies,
  filterShortMovies,
} from "../../utils/utils.js";

import moviesAPI from "../../utils/MoviesAPI";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({
  onSaveClick,
  savedMovies,
  setIsTooltip,
  onUnsaveClick,
  setIsPreloader,
}) => {
  const [isShort, setIsShort] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function handleSetFilteredMovies(movies, query, isShortSwitcher) {
    const moviesList = filterMovies(movies, query, isShortSwitcher);

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
      isShortSwitcher ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleShortFilms() {
    setIsShort(!isShort);
    if (!isShort) {
      setFilteredMovies(filterShortMovies(defaultMovies));
    } else {
      setFilteredMovies(defaultMovies);
    }
    localStorage.setItem("isShort", !isShort);
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem("searchValue", inputValue);
    localStorage.setItem("isShort", isShort);

    if (isAllMovies.length === 0) {
      setIsPreloader(true);
      moviesAPI
        .getMovies()
        .then((movies) => {
          setIsAllMovies(movies);
          handleSetFilteredMovies(transformMovies(movies), inputValue, isShort);
        })
        .catch(() =>
          setIsTooltip({
            isOpen: true,
            state: false,
            messageText:
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          })
        )
        .finally(() => setIsPreloader(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, isShort);
    }
  }

  useEffect(() => {
    if (filteredMovies.length === 0 && isShort) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredMovies, isShort]);

  useEffect(() => {
    if (localStorage.getItem("isShort") === "true") {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setDefaultMovies(movies);
      if (localStorage.getItem("isShort") === "true") {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        isShort={isShort}
        handleShortFilms={handleShortFilms}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!notFound && (
        <MoviesCardList
          movieList={filteredMovies}
          savedMovies={savedMovies}
          onSaveClick={onSaveClick}
          onUnsaveClick={onUnsaveClick}
        />
      )}
    </main>
  );
};

export default Movies;
