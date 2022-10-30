import "./Tooltip.css";
import useEscape from "../../hooks/useEscape";

export default function Tooltip({
  onCloseTooltip,
  isTooltip: { isOpen, state, messageText },
}) {

  useEscape(onCloseTooltip, isOpen);

  return (
    <div
      className={`info-tooltip ${isOpen && "info-tooltip_opened"}`}
      onClick={onCloseTooltip}
    >
      <div className="info-tooltip__wrapper">
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
          onClick={onCloseTooltip}
        ></button>
      </div>
    </div>
  );
}
