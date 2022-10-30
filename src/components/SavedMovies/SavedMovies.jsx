import "./SavedMovies.css";
import { useState, useEffect } from "react";

import { filterMovies, filterShortMovies } from "../../utils/utils.js";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ onUnsaveClick, savedMovies, setIsTooltip }) => {
  
  const [isShort, setIsShort] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(query) {
    const moviesList = filterMovies(savedMovies, query, isShort);
    if (moviesList.length === 0) {
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
    if (!isShort) {
      setIsShort(true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setIsShort(false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        isShort={isShort}
        savedMovies={savedMovies}
        setShowedMovies={setShowedMovies}
        handleShortFilms={handleShortFilms}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!notFound && (
        <MoviesCardList
          movieList={showedMovies}
          savedMovies={savedMovies}
          onUnsaveClick={onUnsaveClick}
        />
      )}
    </main>
  );
};

export default SavedMovies;
