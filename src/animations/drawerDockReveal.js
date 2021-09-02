const drawerDockReveal = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.8, duration: 0.6, ease: "backOut" },
  },
};

export default drawerDockReveal;
