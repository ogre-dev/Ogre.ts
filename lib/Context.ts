import { IncomingMessage, ServerResponse } from 'http';
import Request from './Request';
import Response from './Response';

class Context {
  /** Incoming request object. */
  request: Request;

  /** Outbound response object. */
  response: Response;

  /** Property used to pass data across the middleware stack.  */
  state: { [key: string]: any };

  /**
   * Original, untouched Node.js request and response objects.
   * Calling or modifying their properties directly is not supported.
   */
  raw: {
    /**
     * Original, untouched Node.js request object.
     * Calling or modifying its properties directly is not supported.
     */
    request: IncomingMessage,

    /**
     * Original, untouched Node.js response object.
     * Calling or modifying its properties directly is not supported.
     */
    response: ServerResponse
  };

  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = new Request(request);
    this.response = new Response();
    this.state = {};
    this.raw = { request, response };
  }
}

export default Context;
