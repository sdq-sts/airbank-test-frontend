export function debounce(fn, delay) {
  let timeoutID = null;

  return function debounceReturn(...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
