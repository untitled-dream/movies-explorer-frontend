import "./SavedMovies.css";
import { useState, useContext, useEffect } from "react";

import { filterMovies, filterShortMovies } from "../../utils/utils.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ onDislikeClick, savedMovies, setIsTooltip }) => {
  const currentUser = useContext(CurrentUserContext);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [notFound, setNotFound] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMovies, inputValue, isShortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsTooltip({
        isOpen: true,
        state: false,
        messageText: "Ничего не найдено.",
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!isShortMovies) {
      setIsShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMoviesSwitcher`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setIsShortMovies(false);
      localStorage.setItem(
        `${currentUser.email} - shortSavedMoviesSwitch`,
        false
      );
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMoviesSwitcher`) ===
      "true"
    ) {
      setIsShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setIsShortMovies(false);
      setShowedMovies(savedMovies);
    }
  }, [savedMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        isShortMovies={isShortMovies}
        handleShortFilms={handleShortFilms}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!notFound && (
        <MoviesCardList
          movieList={showedMovies}
          savedMovies={savedMovies}
          onDislikeClick={onDislikeClick}
        />
      )}
    </main>
  );
};

export default SavedMovies;
