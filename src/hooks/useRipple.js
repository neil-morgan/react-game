import { useEffect } from "react";

const DEFAULT_DURATION = 700;
const DEFAULT_SIZE = 100;
const DEFAULT_COLOR = "rgba(0, 0, 0, 0.3)";
const DEFAULT_EVENT = {
  clientX: 0,
  clientY: 0,
  target: null,
};

if (typeof document !== "undefined") {
  const style = document.createElement("style");

  const keyframes = `
    @keyframes use-ripple-animation {
      0% {
        opacity: 1;
        transform: scale(0);
      }
      90% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: scale(10);
      }
    }
    `;

  style.innerHTML = keyframes;
  document.querySelector("head").appendChild(style);
}

const emitRipple = (element, options) => (e) => {
  const isExcluded = (options?.excludedRefs || []).some(
    (ref) =>
      (!!ref.current && ref.current.contains(e?.target)) ||
      ref.current?.isSameNode(e?.target)
  );

  if (isExcluded) {
    return;
  }

  const clientX = e?.clientX || DEFAULT_EVENT.clientX;
  const clientY = e?.clientY || DEFAULT_EVENT.clientY;

  const { height, width, top, left } = element.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;

  const rippleSize = Math.min(
    height,
    width,
    options?.rippleSize || DEFAULT_SIZE
  );

  const positionTop = clientX
    ? y - rippleSize / 2
    : rippleSize / 2 - height / 2;

  const positionLeft = clientY
    ? x - rippleSize / 2
    : width / 2 - rippleSize / 2;

  const span = document.createElement("span");

  span.style.cssText = `
    top: ${positionTop}px;
    left: ${positionLeft}px;
    position: absolute;
    border-radius: 50%;
    background-color: ${options?.rippleColor || DEFAULT_COLOR};
    pointer-events: none;
    width: ${rippleSize}px;
    height: ${rippleSize}px;
    animation: use-ripple-animation ${
      options?.animationLength || DEFAULT_DURATION
    }ms ease-in;
  `;

  element.appendChild(span);

  span.addEventListener("animationend", () => {
    element.removeChild(span);
  });
};

const useRipple = (ref, options) => {
  useEffect(() => {
    if (options?.disabled || !ref?.current) {
      return;
    }

    const element = ref.current;

    const position = getComputedStyle(element).getPropertyValue("position");
    element.style.position =
      position === "static" || !position ? "relative" : position;
    element.style.overflow = "hidden";

    const handleEvent = emitRipple(element, options);
    const handleKeyEvent = (event) =>
      event.key === "Enter" || (event.key === " " && handleEvent());

    element.addEventListener("mousedown", handleEvent);
    element.addEventListener("keydown", handleKeyEvent);
    return () => {
      element.removeEventListener("mousedown", handleEvent);
      element.removeEventListener("keydown", handleKeyEvent);
    };
  });
};

export default useRipple;
