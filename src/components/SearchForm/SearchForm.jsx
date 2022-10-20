import "./SearchForm.css";

import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SearchForm = ({ handleSearchSubmit, handleShortFilms, shortMovies }) => {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const { inputValue, handleChange, isValid, setIsValid } = useFormValidation();
  const [errorQuery, setErrorQuery] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid
      ? handleSearchSubmit(inputValue.search)
      : setErrorQuery("Нужно ввести ключевое слово.");
  }

  useEffect(() => {
    setErrorQuery("");
  }, [isValid]);

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      const searchValue = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
      inputValue.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search"
        noValidate
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
            required
          />
          <span className="search__error">{errorQuery}</span>
          <button className="search__button" type="submit">
            <span className="search__button-text">Найти</span>
          </button>
        </div>
        <FilterCheckbox
          shortMovies={shortMovies}
          handleShortFilms={handleShortFilms}
        />
      </form>
    </section>
  );
};

export default SearchForm;
