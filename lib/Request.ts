import { IncomingMessage, IncomingHttpHeaders } from 'http';
import { decode as decodeQueryString, ParsedUrlQuery } from 'querystring';
import HttpMethod from './enums/HttpMethod';
import BadRequestError from './errors/http/BadRequestError';
import UnsupportedMediaTypeError from './errors/http/InternalServerError';
import Body from './Body';
import { memoize } from './utils';

/**
 * Parses the request's raw buffer into a body object.
 *
 * @param bodyBuffer
 * @throws {BadRequestError}
 * @returns {Body | undefined}
 */
const parseJSONBody = (bodyBuffer: string): Body | undefined => {
  try {
    return bodyBuffer.length > 0 ? JSON.parse(bodyBuffer) : undefined;
  } catch (error) {
    throw new BadRequestError();
  }
};

class Request {
  private incomingMessage: IncomingMessage;

  method: HttpMethod;

  headers: IncomingHttpHeaders;

  path: string;

  query: ParsedUrlQuery;

  constructor(incomingMessage: IncomingMessage) {
    this.incomingMessage = incomingMessage;
    this.method = this.incomingMessage.method as HttpMethod;
    this.headers = this.incomingMessage.headers;

    const parsedUrl = this.parseUrl();
    this.path = parsedUrl.path;
    this.query = parsedUrl.query;
  }

  private parseUrl = (): { path: string, query: ParsedUrlQuery } => {
    const [path, queryString] = (this.incomingMessage.url as string).split('?', 2);

    return {
      path,
      query: queryString != null ? decodeQueryString(queryString) : {},
    };
  };

  /**
   * Get the request body.
   * Parses the request body from the incomingMessage buffer the first time it is called,
   * then caches the result for subsequent calls for better performance.
   * The body will not be parsed unless this function is called somewhere in the middleware stack,
   * thus saving some extra computation for controllers that don't need it.
   *
   * @async
   * @throws {BadRequestError}
   * @returns {Promise<Body>}
   */
  getBody = memoize(async (): Promise<Body> => {
    const getBodyBuffer = async (): Promise<string> => new Promise(
      (resolve, reject) => {
        const body: Uint8Array[] = [];

        this.incomingMessage
          .on('error', (error) => reject(error))
          .on('data', (chunk: Uint8Array) => body.push(chunk))
          .on('end', () => resolve(Buffer.concat(body).toString()));
      },
    );

    switch (this.headers['content-type'] as string) {
      case 'application/json':
        return parseJSONBody(await getBodyBuffer());

      case 'application/x-www-form-urlencoded':
        return { ...decodeQueryString(await getBodyBuffer()) };

      case 'text/plain':
        return await getBodyBuffer();

      default:
        throw new UnsupportedMediaTypeError();
    }
  });

  getHeader = (headerName: string) => this.headers[headerName.toLowerCase()];
}

export default Request;
