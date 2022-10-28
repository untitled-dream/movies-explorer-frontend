import "./BurgerMenu.css";

import { useEffect } from "react";
import useScreenWidth from "../../hooks/useScreenWidth";

const BurgerMenu = ({ isBurgerMenuOpened, onClickBurgerMenu }) => {
  const screenWidth = useScreenWidth(); 
  
  function handleOnClickBurger() {
    onClickBurgerMenu();
  }

  useEffect(() => {
    if (screenWidth < 768 && isBurgerMenuOpened) {
      onClickBurgerMenu();
    }
  }, [isBurgerMenuOpened, screenWidth, onClickBurgerMenu]);

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
