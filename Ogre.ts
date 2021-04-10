import {
  createServer,
  RequestListener,
} from 'http';
import Context from 'lib/Context';
import { once } from 'lib/utils';

// TODO: refine types
type Layer = (context: Context, next: Function) => Promise<void>;

class Ogre {
  private layers: Layer[] = [];

  addLayer = (layer: Layer): Ogre => {
    this.layers.push(layer);
    return this;
  };

  /**
   * Listens to server requests.
   *
   * @async
   */
  listener: RequestListener = async (request, response) => {
    // TODO: refine type

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

  listen = (port: number, ...args: any[]) => {
    const server = createServer();
    server.on('request', this.listener);
    server.listen(port, ...args);
  };
}

export default Ogre;
