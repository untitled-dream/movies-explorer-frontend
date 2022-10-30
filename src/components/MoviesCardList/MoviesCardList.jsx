import "./MoviesCardList.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScreenWidth from "../../hooks/useScreenWidth";

import MoviesCard from "../MoviesCard/MoviesCard";

import { getSavedMovie } from "../../utils/utils";
import { MOVIES_GRID } from "../../utils/constants";

const MoviesCardList = ({
  movieList,
  savedMovies,
  onSaveClick,
  onUnsaveClick,
}) => {
  const location = useLocation();

  const screenWidth = useScreenWidth();
  const { desktop, tablet, mobile } = MOVIES_GRID;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [movieCardDisplaySetting, setMovieCardDisplaySetting] = useState({
    movieCardCount: 12,
    onLoadAdd: 3,
  });

  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + movieCardDisplaySetting.onLoadAdd;
    const additional = movieList.length - start;

    if (additional > 0) {
      const newCards = movieList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  useEffect(() => {
    if (movieList.length) {
      const res = movieList.filter(
        (item, i) => i < movieCardDisplaySetting.movieCardCount
      );
      setShowMovieList(res);
    }
  }, [movieList, movieCardDisplaySetting.movieCardCount]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (screenWidth > desktop.width) {
        setMovieCardDisplaySetting(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setMovieCardDisplaySetting(tablet.cards);
      } else {
        setMovieCardDisplaySetting(mobile.cards);
      }
      return () => {
        setIsMount(false);
      };
    }
  }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);
  return (
    <section className="movies-list">
      <ul className="movies-list__list">
        {showMovieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            savedMovies={getSavedMovie(savedMovies, movie)}
            onSaveClick={onSaveClick}
            onUnsaveClick={onUnsaveClick}
          />
        ))}
      </ul>
      {location.pathname === "/movies" &&
        showMovieList.length >= 5 &&
        showMovieList.length < movieList.length && (
          <button
            className="movies-list__show-more"
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
