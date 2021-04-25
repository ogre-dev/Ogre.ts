# The Ogre Framework

[![license](https://img.shields.io/github/license/ogre-dev/Ogre.ts)](https://github.com/ogre-dev/Ogre.ts)
[![downloads](https://img.shields.io/npm/dt/@ogre.dev/framework)](https://www.npmjs.com/package/@ogre.dev/framework)
[![npm version](https://img.shields.io/npm/v/@ogre.dev/framework)](https://www.npmjs.com/package/@ogre.dev/framework)
[![codecov](https://img.shields.io/codecov/c/github/ogre-dev/Ogre.ts)](https://codecov.io/gh/ogre-dev/Ogre.ts)

Fast and minimalist framework for [Node.js](https://nodejs.org/) written in TypeScript.

> Ogres are like onions... They have layers.

```ts
import Ogre from '@ogre.dev/framework";
const onion = new Ogre();

onion.addLayer((context, next) => {
  const { response } = context;

  response.setBody('What are you doing in my swamp!?');
});

onion.listen(3000);
```

## Installation

The framework is available through an [npm registry](https://www.npmjs.com/package/@ogre.dev/framework):

```bash
npm install @ogre.dev/framework
```

## Documentation

[Full documentation](https://ogre-dev.github.io/Ogre.ts/)

## Contact

* [Github](https://github.com/ogre-dev/Ogre.ts)
* [Discord](https://discord.gg/ZD6ZPwGx)
