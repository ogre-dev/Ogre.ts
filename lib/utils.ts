/**
 * Returns a function that executes the function given as an argument once on the first call then
 *   does nothing.
 *
 * @typeParam T - Context type (this).
 * @typeParam A - List of arguments of the function passed as a parameter.
 * @typeParam R - Return type of the function passed as a parameter.
 * @param fn - Function to be made callable only once.
 * @returns A function that can be called only once.
 */
// eslint-disable-next-line max-len
const once = <T, A extends any[], R> (fn: (this: T, ...args: A) => R): ((this: T, ...args: A) => R | undefined) => {
  let hasAlreadyBeenRun = false;

  return function oncifiedFunction(this: T, ...args: A) {
    if (hasAlreadyBeenRun === false) {
      const result = fn.call(this, ...args);
      hasAlreadyBeenRun = true;
      return result;
    }

    return undefined;
  };
};

/**
 * Returns a function that executes the function given as an argument once then caches the result
 *   for subsequent calls.
 *
 * @typeParam T - Context type (this).
 * @typeParam A - List of arguments of the function passed as a parameter.
 * @typeParam R - Return type of the function passed as a parameter.
 * @param fn - Function to memoize.
 * @returns A memoized function, i.e. A function that executes the function passed as an argument
 *   only once on the first run and then returns the value cached from the first run on subsequent
 *   calls.
 */
// eslint-disable-next-line max-len
const memoize = <T, A extends any[], R> (fn: (this: T, ...args: A) => R): ((this: T, ...args: A) => R | R) => {
  let hasAlreadyBeenRun = false;
  let memo: R;

  return function memoizedFunction(this: T, ...args: A) {
    if (hasAlreadyBeenRun === false) {
      memo = fn.call(this, ...args);
      hasAlreadyBeenRun = true;
    }

    return memo;
  };
};

/**
 * Converts a string path into a regular expression.
 *
 * @param path - Path pattern to be converted to a regular expression.
 * @returns A regular expression matching paths following the path pattern passed as an argument.
 */
const stringPathToRegExp = (path: string): RegExp => new RegExp(`^${
  path
    .replace(/{([^}]*)}/g, '(?<$1>[^/]*)')
    .replace(/\/?\*$/, '(?:/.*)?')
    .replace(/\/$/, '/?')
}$`);

export {
  once,
  memoize,
  stringPathToRegExp,
};
