import "./SearchForm.css";

import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SearchForm = ({
  handleSearchSubmit,
  handleShortFilms,
  isShortMovies,
}) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const [errorQuery, setErrorQuery] = useState("");
  const { inputValue, handleChange, isValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    inputValue
      ? handleSearchSubmit(inputValue.search)
      : setErrorQuery("Требуется ввести ключевое слово");
  }

  useEffect(() => {
    setErrorQuery("");
  }, [isValid]);

  /*useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      inputValue.search = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
    }
  }, [currentUser, location.pathname, inputValue]);*/

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
            required
          />
          <span className="search__error">{errorQuery}</span>
          <button className="search__button" type="submit">
            <span className="search__button-text">Найти</span>
          </button>
        </div>
        <FilterCheckbox
          isShortMovies={isShortMovies}
          handleShortFilms={handleShortFilms}
        />
      </form>
    </section>
  );
};

export default SearchForm;
