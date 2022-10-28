import "./Tooltip.css";
import useEscape from "../../hooks/useEscape";

export default function Tooltip({ onClose, status: { isOpen, state, messageText } }) {
  function handleClickOverlay(evt) {
    evt.stopPropagation();
  }

  useEscape(onClose, isOpen);

  return (
    <div
      className={`info-tooltip ${isOpen && "info-tooltip_opened"}`}
      onClick={onClose}
    >
      <div className="info-tooltip__wrapper" onClick={handleClickOverlay}>
        <div className="info-tooltip-container">
          <div
            className={`info-tooltip__status ${
              state
                ? "info-tooltip__status_success"
                : "info-tooltip__status_fail"
            }`}
          ></div>
          <h2 className="info-tooltip__title">{messageText}</h2>
        </div>

        <button
          type="button"
          className="info-tooltip__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
