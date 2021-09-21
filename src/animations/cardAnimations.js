export const liveCardTransition = {
  initial: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  animate: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const deadCardTransition = {
  initial: { opacity: 0, scale: 0.9, y: 5, rotateX: "-45deg" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: "0deg",
    transition: { duration: 1, ease: "easeOut" },
  },
};
