const pageTransition = {
  initial: {
    x: 30,
    scale: 1.2,
    opacity: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.25, ease: "easeOut" },
  },
  exit: {
    x: -50,
    scale: 0.6,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default pageTransition;
