import { useEffect } from "react";

export default function useEscape(onClose, isOpen) {
  useEffect(() => {
    if (isOpen) {
      function onEscapeClose(evt) {
        if (evt.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", onEscapeClose);
      return () => {
        document.removeEventListener("keydown", onEscapeClose);
      };
    }
  }, [isOpen]);
}
