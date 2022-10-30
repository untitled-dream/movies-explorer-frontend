import "./SearchForm.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../hooks/useFormValidation";

const SearchForm = ({
  isShort,
  savedMovies,
  setShowedMovies,
  handleShortFilms,
  handleSearchSubmit,
}) => {
  const location = useLocation();
  const [errorQuery, setErrorQuery] = useState("");
  const { inputValue, handleChange, isValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    inputValue.search
      ? handleSearchSubmit(inputValue.search)
      : setErrorQuery("Требуется ввести ключевое слово");
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("searchValue")
    ) {
      const searchValue = localStorage.getItem("searchValue");
      inputValue.search = searchValue;
    }
  }, []);

  useEffect(() => {
    setErrorQuery("");
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === "/saved-movies" && !inputValue.search) {
      setShowedMovies(savedMovies);
    }
  }, [inputValue, savedMovies, setShowedMovies, location]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search"
        id="search"
        onSubmit={handleSubmit}
      >
        <div className="search__form-wrapper">
          <input
            className="search__input"
            type="text"
            name="search"
            id="search"
            placeholder="Фильм"
            value={inputValue.search || ""}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="search__error">{errorQuery}</span>
          <button className="search__button" type="submit">
            <span className="search__button-text">Найти</span>
          </button>
        </div>
        <FilterCheckbox isShort={isShort} handleShortFilms={handleShortFilms} />
      </form>
    </section>
  );
};

export default SearchForm;
