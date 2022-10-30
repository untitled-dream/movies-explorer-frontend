import { Link } from "react-router-dom";

import "./Header.css";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn, isBurgerMenu, onClickBurgerMenu }) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__link">
          <Logo />
        </Link>
        <Navigation
          loggedIn={loggedIn}
          onClickBurgerMenu={onClickBurgerMenu}
          isBurgerMenu={isBurgerMenu}
        />
      </div>
    </header>
  );
};

export default Header;
