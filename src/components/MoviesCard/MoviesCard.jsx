import "./MoviesCard.css";

import { useLocation } from "react-router-dom";
import { transformMovieDuration } from "../../utils/utils"; 

const MoviesCard = ({
  movie,
  savedMovies,
  onSaveClick,
  onUnsaveClick,
}) => {
  const location = useLocation();

  function handleSaveClick() {
    onSaveClick(movie);
  }

  function handleUnsaveClick() {
    onUnsaveClick(movie);
  }
  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={movie.nameRU}
            className="movies-card__cover"
          />
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          {location.pathname === "/movies" && (
            <button
              type="button"
              className={`movies-card__button movies-card__button_type_${
                savedMovies ? "saved" : "save"
              }`}
              onClick={savedMovies ? handleUnsaveClick : handleSaveClick}
            ></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button
              className="movies-card__button movies-card__button_type_unsave"
              type="button"
              title="Удалить фильм из сохранённых"
              onClick={handleUnsaveClick}
            ></button>
          )}
        </div>
        <span className="movies-card__duration">
          {transformMovieDuration(movie.duration)}
        </span>
      </article>
    </li>
  );
};

export default MoviesCard;
