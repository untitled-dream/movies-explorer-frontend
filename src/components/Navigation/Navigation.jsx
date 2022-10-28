import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = ({ loggedIn, isBurgerMenuOpened, onClickBurgerMenu }) => {
  const activeLink = `navigation__link_active_${
    isBurgerMenuOpened ? "mobile" : "desktop"
  }`;

  function handleClickOverlay(evt) {
    evt.stopPropagation();
  }
  return (
    <>
      {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link
                to="/signup"
                className="navigation__link navigation__link_landing"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="navigation__link navigation__link_landing navigation__link_signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav
          className={`navigation navigation_${
            isBurgerMenuOpened ? "opened" : "closed"
          }`}
          onClick={isBurgerMenuOpened ? onClickBurgerMenu : undefined}
        >
          <BurgerMenu
            isBurgerMenuOpened={isBurgerMenuOpened}
            onClickBurgerMenu={onClickBurgerMenu}
          />
          <ul
            className={`navigation__list navigation__list_logged navigation__list_${
              isBurgerMenuOpened ? "opened" : "closed"
            }`}
            onClick={handleClickOverlay}
          >
            {isBurgerMenuOpened && (
              <li className="navigation__item">
                <NavLink
                  className="navigation__link"
                  activeClassName={activeLink}
                  onClick={onClickBurgerMenu}
                  exact
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
            )}
            <li className="navigation__item">
              <NavLink
                to="/movies"
                className="navigation__link"
                activeClassName={activeLink}
                onClick={onClickBurgerMenu}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="/saved-movies"
                className="navigation__link"
                activeClassName={activeLink}
                onClick={onClickBurgerMenu}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item navigation__item_profile">
              <NavLink
                to="/profile"
                className="navigation__link navigation__link_profile"
                onClick={onClickBurgerMenu}
              >
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
