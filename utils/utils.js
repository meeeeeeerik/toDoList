export function removeElementAfterAnimationPromise(element) {
  return new Promise((res) => {
    const onAnimationEnd = () => {
      element.removeEventListener('animationend', onAnimationEnd);

      if (typeof cb === 'function') {
        cb();
      }

      element.remove();

      res();
    };

    element.addEventListener('animationend', onAnimationEnd);
  });
}
