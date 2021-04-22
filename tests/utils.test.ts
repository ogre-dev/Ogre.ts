import { once, memoize, stringPathToRegExp } from '../lib/utils';

describe('once', () => {
  it('produces a function that can only be called once', () => {
    const roar = 'RRROOOOOOOOOOOOAAAAAAAARRR!!!!!';

    const doTheRoar = once(() => roar);

    expect(doTheRoar()).toBe(roar);
    expect(doTheRoar()).toBeUndefined();
  });
});

describe('memoize', () => {
  it('executes the memoized function only once', () => {
    let count = 0;

    const incrementCount = () => { count += 1; };

    const memoizedFunction = memoize(incrementCount);

    memoizedFunction();
    memoizedFunction();

    expect(count).toBe(1);
  });

  it('returns the same result when called multiple times', () => {
    const roar = 'RRROOOOOOOOOOOOAAAAAAAARRR!!!!!';

    const doTheRoar = memoize(() => roar);

    expect(doTheRoar()).toBe(roar);
    expect(doTheRoar()).toBe(roar);
  });
});

describe('stringPathToRegExp', () => {
  it('converts \'/\' string path into /^\\/?$/ regular expression', () => {
    const regex = stringPathToRegExp('/');
    expect(String(regex)).toBe(String(/^\/?$/));
  });

  it('converts \'*\' symbol into a catch-all regular expression', () => {
    const regex = stringPathToRegExp('*');
    expect(String(regex)).toBe(String(/^(?:\/.*)?$/));
  });

  it('converts \'\\/*\' symbol combination into a catch-all regular expression', () => {
    const regex = stringPathToRegExp('*');
    expect(String(regex)).toBe(String(/^(?:\/.*)?$/));
  });

  it('replaces variables with named capturing groups', () => {
    const regex = stringPathToRegExp('/users/{userId}/friends/{friendId}');
    expect(String(regex)).toBe(String(/^\/users\/(?<userId>[^/]*)\/friends\/(?<friendId>[^/]*)$/));
  });

  it('makes the last \'/\' character optional', () => {
    const regex = stringPathToRegExp('/users/');
    expect(String(regex)).toBe(String(/^\/users\/?$/));
  });

  it('produces a regular expression matching \'/users/1/friends/2/optional\' when the pattern is \'/users/{userId}/friends/{friendId}/*\'', () => {
    expect(
      stringPathToRegExp('/users/{userId}/friends/{friendId}/*')
        .test('/users/1/friends/2/optional'),
    ).toBe(true);
  });

  it('produces a regular expression matching \'/users/1/friends/2\' when the pattern is \'/users/{userId}/friends/{friendId}/*\'', () => {
    expect(
      stringPathToRegExp('/users/{userId}/friends/{friendId}/*')
        .test('/users/1/friends/2'),
    ).toBe(true);
  });

  it('produces a regular expression that does not match \'/users/1/friends/2\' when the pattern is \'/users/{userId}/friends/{friendId}/*\'', () => {
    expect(
      stringPathToRegExp('/users/{userId}/friends/{friendId}/*')
        .test('/users/1/2'),
    ).toBe(false);
  });

  it('produces a regular expression that does not match \'/users/1/friends/2/optional\' when the pattern is \'/users/{userId}/friends/{friendId}\'', () => {
    expect(
      stringPathToRegExp('/users/{userId}/friends/{friendId}')
        .test('/users/1/friends/2/optional'),
    ).toBe(false);
  });

  it('produces a regular expression that catches variables when specified in the pattern', () => {
    const match = stringPathToRegExp('/users/{userId}/friends/{friendId}').exec('/users/1/friends/2');

    expect(match?.groups).toBeDefined();
    expect(match?.groups?.userId).toBe('1');
    expect(match?.groups?.friendId).toBe('2');
  });
});
