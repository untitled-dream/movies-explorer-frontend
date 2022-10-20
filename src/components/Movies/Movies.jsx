import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default Movies;
