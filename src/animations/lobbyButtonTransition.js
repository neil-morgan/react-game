const lobbyButtonTransition = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.25, ease: "easeOut" },
  },
  exit: {
    y: 10,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default lobbyButtonTransition;
