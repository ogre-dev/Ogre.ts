// eslint-disable-next-line max-len
const once = <T, A extends any[], R> (fn: (this: T, ...args: A) => R): ((that: T, ...args: A) => R | undefined) => {
  let hasAlreadyBeenRun = false;

  return (that: T, ...args: A) => {
    if (hasAlreadyBeenRun === false) {
      const result = fn.call(that, ...args);
      hasAlreadyBeenRun = true;
      return result;
    }

    return undefined;
  };
};

export {
  // eslint-disable-next-line import/prefer-default-export
  once,
};
