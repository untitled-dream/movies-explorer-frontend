import "./FilterCheckbox.css";
import React from "react";

const FilterCheckbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className="filter__switch"></span>
      <p className="filter__label">Короткометражки</p>
    </label>
  );
};

export default FilterCheckbox;
