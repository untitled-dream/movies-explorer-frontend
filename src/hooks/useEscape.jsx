import { useEffect } from "react";

export default function useEscapePress(onClose, isOpen) {
  useEffect(() => {
    if (isOpen) {
      const onEscapeClose = (evt) => {
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
