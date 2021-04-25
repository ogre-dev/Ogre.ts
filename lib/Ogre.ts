import {
  createServer,
  RequestListener,
} from 'http';
import Context from './Context';
import Layer from './Layer';
import { once } from './utils';

/**
 * Instantiable Ogre server.
 *
 * @remarks
 *
 * "Ogres are like onions... they have layers."
 *
 * @example
 *
 * ```
 * import Ogre from '@ogre.dev/framework";
 *
 * const onion = new Ogre();
 *
 * onion
 *   .addLayer((context, next) => {
 *     const { response } = context;
 *
 *     response
 *       .setStatus(HttpStatusCode.OK)
 *       .setBody({ message: 'What are you doing in my swamp!?' });
 *   });
 *
 * const port = 3000;
 *
 * onion.listen(port, `server listening on port ${port}...`);
 * ```
 */
class Ogre {
  private layers: Layer[] = [];

  /**
   * Adds a layer passed as an argument to the layer stack. Previous layers wrap this layer.
   *
   * @param layer - Inner layer to be added to the stack.
   * @returns A reference to the {@link Ogre} instance.
   */
  addLayer = (layer: Layer): Ogre => {
    this.layers.push(layer);
    return this;
  };

  /**
   * Handles incoming server requests.
   *
   * @param request - The original Node.js request.
   * @param response - The Node.js response.
   */
  listener: RequestListener = async (request, response) => {
    const context = new Context(request, response);

    const traverseLayer = async (index: number) => {
      if (this.layers[index] != null) {
        await this.layers[index](context, once(traverseLayer.bind(null, index + 1)));
      }
    };

    await traverseLayer(0);

    Object.entries(context.response.headers).forEach(([header, value]) => {
      response.setHeader(header, value);
    });

    response.end(JSON.stringify(context.response.body));
  };

  /**
   * Listens to incoming server requests.
   *
   * @param port - Port number the server should be listening to.
   * @param args - List of arguments passed on to the inner Node.js server.
   */
  listen = (port: number, ...args: any[]) => {
    const server = createServer();
    server.on('request', this.listener);
    server.listen(port, ...args);
  };
}

export default Ogre;
