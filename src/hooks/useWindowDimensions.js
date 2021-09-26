import { useState, useEffect } from "react";
import { throttle } from "../utils";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    const listener = throttle(handleResize, 100);

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
