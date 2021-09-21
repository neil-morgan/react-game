const actionsTransition = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

export default actionsTransition;
