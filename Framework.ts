import {
  createServer,
  RequestListener,
} from 'http';
import Context from 'lib/Context';
import { once } from 'lib/utils';

// TODO: refine types
type Middleware = (context: Context, next: Function) => Promise<void>;

class Framework {
  middlewareStack: Middleware[] = [];

  // TODO: implement
  use = (middleware: Middleware): Framework => {
    this.middlewareStack.push(middleware);
    return this;
  };

  loadResources = (): Framework => this;

  listener: RequestListener = async (request, response) => {
    // TODO: add helmet-like security by default
    // TODO: implement
    // TODO: refine type

    // const body = await this.parseBody(request);

    const context = new Context(request, response);

    const invokeMiddleware = (index: number) => {
      if (this.middlewareStack[index] != null) {
        this.middlewareStack[index](context, once(invokeMiddleware.bind(null, index + 1)));
      }
    };

    invokeMiddleware(0);
  };

  listen = (port: number) => {
    const server = createServer();
    server.on('request', this.listener);
    server.listen(port);
  };
}

export default Framework;
