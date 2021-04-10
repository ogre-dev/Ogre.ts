/**
 * Executes the function given as an argument once then does nothing.
 *
 * @param {(this: T, ...args: A) => R} fn
 * @returns {((that: T, ...args: A) => R | undefined)}
 */
// eslint-disable-next-line max-len
const once = <T, A extends any[], R> (fn: (this: T, ...args: A) => R): ((this: T, ...args: A) => R | undefined) => {
  let hasAlreadyBeenRun = false;

  // eslint-disable-next-line func-names
  return function (this: T, ...args: A) {
    if (hasAlreadyBeenRun === false) {
      const result = fn.call(this, ...args);
      hasAlreadyBeenRun = true;
      return result;
    }

    return undefined;
  };
};

/**
 * Executes the function given as an argument once then caches the result for subsequent calls.
 *
 * @param {(this: T, ...args: A) => R} fn
 * @returns {((that: T, ...args: A) => R)}
 */
// eslint-disable-next-line max-len
const memoize = <T, A extends any[], R> (fn: (this: T, ...args: A) => R): ((this: T, ...args: A) => R | R) => {
  let hasAlreadyBeenRun = false;
  let memo: R;

  // eslint-disable-next-line func-names
  return function (this: T, ...args: A) {
    if (hasAlreadyBeenRun === false) {
      memo = fn.call(this, ...args);
      hasAlreadyBeenRun = true;
    }

    return memo;
  };
};

export {
  once,
  memoize,
};
