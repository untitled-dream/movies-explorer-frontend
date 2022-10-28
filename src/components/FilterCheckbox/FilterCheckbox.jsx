import "./FilterCheckbox.css";

const FilterCheckbox = ({ isShortMovies, handleShortFilms }) => {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        checked={isShortMovies ? true : false}
        onChange={handleShortFilms}
      />
      <span className="filter__switch"></span>
      <p className="filter__label">Короткометражки</p>
    </label>
  );
};

export default FilterCheckbox;
