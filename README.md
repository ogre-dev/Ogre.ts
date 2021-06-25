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

## Onions and layers

Unlike most frameworks where middleware functions are called sequentially, the Ogre framework uses a layer system where the first layers in the stack wrap around the following layers, much like onions or Russian dolls.

A `Layer` takes a `context` and a reference to the `next` layer as arguments:

```ts
const layer: Layer = (context, next) => {
  ...
};
```

Whenever a layer calls its `next` parameter, the request lifecycle enters the next layer in the stack. Once the execution of the next layer has finished, the initial layer can proceed with the rest of its code.

Executing the following:

```ts
import Ogre from '@ogre.dev/framework';

const onion = new Ogre();

onion
  .addLayer((context, next) => {
    console.log('entering layer 0');
    next();
    console.log('exiting layer 0');
  })
  .addLayer((context, next) => {
    console.log('entering layer 1');
    next();
    console.log('exiting layer 1');
  })
  .addLayer((context, next) => {
    console.log('entering layer 2');
    console.log('exiting layer 2');
  };

onion.listen(3000);
```

...will print:

```bash
entering layer 0
entering layer 1
entering layer 2
exiting layer 2
exiting layer 1
exiting layer 0
```

Layers's `next` method can only be called once. Subsequent calls are ignored.

Note that layers can be asynchronous. When in doubt, it is advised to `await` the execution of the `next` layer.

A typical use case would be to record the time it took to respond to the request:

```ts
import Ogre from '@ogre.dev/framework';

const onion = new Ogre();

onion
  .addLayer(async (context, next) => {
    const tic = new Date().getTime();

    await next();

    const toc = new Date().getTime();

    console.log(`execution took ${toc - tic}ms`);
  })
  .addLayer(async () => new Promise((resolve) => setTimeout(resolve, 1000));
  });

onion.listen(3000);
```

```bash
execution took 1002ms
```

## Routing

### Routing overview

The Ogre framework adopts a REST approach to routing with the extendable `Resource` class to model HTTP resources.

For instance, let's consider the path `/users/123` which targets the `users` HTTP resource with a specific `userId` of 123.

Here is how you would define a `User` resource with a simple `GET` handler:

```ts
import { Resource } from '@ogre.dev/framework';

class UserResource extends Resource {
  path = '/users/{userId}';

  get = (context) => {
    const { request, response } = context;

    response.setBody({ userId: request.pathParameters.userId });
  };
}

export default new UserResource().toLayer();
```

Note that the `userId` path variable is accessible through `context.request.pathParameters`.

You can then import the resource into your app and use it as a layer:

```ts
import User from './resources/User';

...

onion.addLayer(User);

...
```

### Paths

As we have seen in the [previous section](#routing-overview), resources revolve around their paths.

The `path` property can be either a string or directly a regular expression. The former may contain path variables surrounded by brackets (e.g. `{userId}`) that are made accessible through `context.request.pathParameters` inside the resource layers, or an asterisk (e.g. `/users/*`) to match all paths starting with the pattern preceding the symbol.

For instance `/users/{userId}/*` will match `/users/123`, `/users/my-user`, `/users/123/this/is/an/example` etc.

### Best practice

The example shown in the [routing overview section](#routing-overview) is intentionally simple and is only intended to help new users get started.

For more advanced applications with many resources, it is best advised to follow a modular approach with a project structure similar to the following:

```bash
main.ts
/resources
  /Users
    index.ts
    /controllers
      get.ts
      post.ts
      index.ts
```

```ts
// /resources/Users/index.ts

import { Resource } from '@ogre.dev/framework';
import { get, post } from './controllers';

class Users extends Resource {
  constructor() {
    super('/users');
    this.get = get;
    this.post = post;
  }
}

export default new Users().toLayer();
```

```ts
// /resources/Users/controllers/get.ts

import { Layer } from '@ogre.dev/framework';

const get: Layer = (context) => {
  const { response } = context;

  response.setBody([/* list of users */]);
};

export default get;
```

```ts
// /resources/Users/controllers/index.ts

export { default as get } from './get';
export { default as post } from './post';
```

```ts
// main.ts

import Users from './resources/Users';

...

onion.addLayer(Users);

...
```

### Fallback handler

You may override the `fallback` method of the `Resource` class with a custom layer to handle cases where the request path matched the resource's but no handlers were found for the requested HTTP method.

## Error handling

The Ogre framework tries to remain as little opinionated as possible, instead leaving the user to decide what works best for their particular needs.

By default no error handling is configured. In most cases however, common errors such as `404 - Not Found` and `500 - Internal Server Error` should be dealt with. This can be achieved with the following:

```ts
// main.ts

import Ogre from '@ogre.dev/framework';
import Users from './resources/Users';

const onion = new Ogre();

onion
  .addLayer(async (context, next) => {
    try {
      await next();
    } catch (error) {
      // handle 500 errors
      const { response } = context;

      response
        .setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .setBody({ message: HttpStatusReason.INTERNAL_SERVER_ERROR });
    }
  })
  .addLayer(Users)
  .addLayer((context) => {
    // handle 404 errors
    const { response } = context;

    response
      .setStatus(HttpStatusCode.NOT_FOUND)
      .setBody({ message: HttpStatusReason.NOT_FOUND});
  });
```

Not that the order of the layers is important. The `Internal Server Error` layer wraps the entire layer stack and catches unhandled errors while the `Not Found` layer acts as the center-most layer thus intercepting requests that have not been dealt with by previous layers.

## Trivia

The Ogre framework is a reference to the [Shrek movie](https://en.wikipedia.org/wiki/Shrek) and its scene about ogres having layers, much like the framework:

> Shrek: Ogres are like onions.
>
> Donkey: They stink?
>
> Shrek: Yes... No!
>
> Donkey: Oh, they make you cry.
>
> Shrek: No.
>
> Donkey: Oh, you leave 'em out in the sun, they get all brown, start sproutin' little white hairs.
>
> Shrek: No! Layers. Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.

The release of the Ogre framework also coincided with the 20th anniversary of the movie.

## Documentation

[Full documentation](https://ogre-dev.github.io/Ogre.ts/)

## Contact

* [Github](https://github.com/ogre-dev/Ogre.ts)
* [Discord](https://discord.gg/ZD6ZPwGx)
