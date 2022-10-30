import "./BurgerMenu.css";

import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const BurgerMenu = ({ isBurgerMenu, onClickBurgerMenu }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  
  function handleOnClickBurger() {
    onClickBurgerMenu();
  }

  useEffect(() => {
    if (!isMobile && isBurgerMenu) {
      onClickBurgerMenu();
    }
  }, [isBurgerMenu, isMobile, onClickBurgerMenu]);

  return (
    <button
      className={`burger-button burger-button_${
        isBurgerMenu ? "state_opened" : "state_closed"
      }`}
      type="button"
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
};;

export default BurgerMenu;
