const debounce = (wait, fn) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fn, wait, args);
  };
};

export default debounce;
