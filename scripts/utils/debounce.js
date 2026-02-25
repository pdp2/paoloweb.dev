/*
  Many thanks to Josh Comeau, for his excellent blog post: https://www.joshwcomeau.com/snippets/javascript/debounce/
*/
export default function debounce(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
