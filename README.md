# The Ogre Framework

Fast and minimalist framework for [Node.js](https://nodejs.org/) written in TypeScript.

> Ogres are like onions... They have layers.

```typescript
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
npm i @ogre.dev/framework
```

## Documentation

[Full documentation](https://ogre-dev.github.io/Ogre.ts/)

## Contact

* [Github](https://github.com/ogre-dev/Ogre.ts)
* [Discord](https://discord.gg/ZD6ZPwGx)
