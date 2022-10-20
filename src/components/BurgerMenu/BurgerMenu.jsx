import "./BurgerMenu.css";

import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const BurgerMenu = ({ isBurgerMenuOpened, onClickBurgerMenu }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  function handleOnClickBurger() {
    onClickBurgerMenu();
  }

  useEffect(() => {
    if (!isMobile && isBurgerMenuOpened) {
      onClickBurgerMenu();
    }
  }, [isBurgerMenuOpened, isMobile, onClickBurgerMenu]);

  return (
    <button
      className={`burger-button burger-button_${
        isBurgerMenuOpened ? "state_opened" : "state_closed"
      }`}
      type="button"
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
};;

export default BurgerMenu;
