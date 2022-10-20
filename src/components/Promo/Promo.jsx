import "./Promo.css";

import NavTab from "../NavTab/NavTab";

const Promo = () => {
  return (
    <div className="promo">
      <div className="promo__container">
        <h1 className="promo__heading">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </div>
  );
};

export default Promo;