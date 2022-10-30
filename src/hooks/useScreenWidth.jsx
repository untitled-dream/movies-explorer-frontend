import { useState, useEffect } from "react";

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
}
