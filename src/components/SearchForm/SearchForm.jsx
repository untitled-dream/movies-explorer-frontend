import "./SearchForm.css";

import { useState, useEffect } from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../hooks/useFormValidation";

const SearchForm = ({
  handleSearchSubmit,
  handleShortFilms,
  isShortMovies,
}) => {

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
