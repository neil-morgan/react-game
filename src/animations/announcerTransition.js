const announcerTransition = {
  initial: {
    y: "calc(-50% + 10px)",
    opacity: 0,
    x: "-50%",
  },
  animate: {
    y: "-50%",
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.25,
    },
  },
  exit: {
    y: "calc(-50% - 40px)",
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.25,
    },
  },
};

export default announcerTransition;
