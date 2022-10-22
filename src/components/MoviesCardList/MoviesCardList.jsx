import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

import { MovieList } from "../../utils/utils";

const MoviesCardList = ({ onLikeClick, onDeleteClick }) => {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {MovieList.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </ul>
      <button className="movies-card-list__show-more">Ещё</button>
    </section>
  );
};

export default MoviesCardList;
