import { IncomingMessage, ServerResponse } from 'http';
import Request from './Request';
import Response from './Response';

/**
 * Context object passed down to every layer exposing a request and a response objects.
 *
 * @remarks
 *
 * Directly affecting the original request and response objects from the `raw` property may cause
 *   unexpected behavior and is not supported.
 */
class Context {
  /** Incoming request object. */
  request: Request;

  /** Outbound response object. */
  response: Response;

  /** Property used to pass data across the middleware stack.  */
  state: { [key: string]: any };

  /**
   * Original, untouched Node.js request and response objects.
   *
   * @remarks
   *
   * Directly affecting these properties may cause unexpected behavior and is not supported.
   */
  raw: {
    /**
     * Original, untouched Node.js request object.
     * Calling or modifying its properties directly is not supported.
     *
     * @remarks
     *
     * Directly affecting the original response object may cause unexpected behavior and is not
     *   supported. Refer to {@link Context.request} instead.
     */
    request: IncomingMessage,

    /**
     * Original, untouched Node.js response object.
     * Calling or modifying its properties directly is not supported.
     *
     * @remarks
     *
     * Directly affecting the original request object may cause unexpected behavior and is not
     *   supported. Refer to {@link Context.response} instead.
     */
    response: ServerResponse
  };

  /**
   * @param request - Original `IncomingMessage`.
   * @param response - `ServerResponse` abstracted by {@link Response}.
   */
  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = new Request(request);
    this.response = new Response();
    this.state = {};
    this.raw = { request, response };
  }
}

export default Context;
