const throttle = (fn, wait) => {
  let timeout = false;

  return () => {
    if (!timeout) {
      fn.call();
      timeout = true;
      setTimeout(() => {
        timeout = false;
      }, wait);
    }
  };
};

export default throttle;
