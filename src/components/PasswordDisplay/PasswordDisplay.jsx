import './PasswordDisplay.css';

import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordDisplay({ isDisplay, onDisplay }) {
  return (
    <IconContext.Provider value={{ color: "white", size: "20" }}>
      <button
        className="password-view"
        type="button"
        onClick={onDisplay}
        title={isDisplay ? "Показать пароль" : "Скрыть пароль"}
      >
        {isDisplay ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </button>
    </IconContext.Provider>
  );
}

export default PasswordDisplay;
