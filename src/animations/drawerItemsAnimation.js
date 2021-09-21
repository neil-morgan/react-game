const drawerItemsAnimation = {
  parent: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.1,
      },
    },
  },
  animation: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
};

export default drawerItemsAnimation;
