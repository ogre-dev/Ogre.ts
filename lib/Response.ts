import HttpStatusCode from './enums/HttpStatusCode';
import Body from './Body';

/**
 * Response class instanciated for every new request and attached to the context object passed
 *   across the layer stack. Used to set various properties of the HTTP response sent to the client.
 */
class Response {
  /** List of response headers. */
  readonly headers: { [key: string]: string | number };

  /** Response body. */
  body: Body;

  /**
   * HTTP response status.
   *
   * @defaultValue {@link HttpStatusCode.OK}
   */
  status: HttpStatusCode = HttpStatusCode.OK;

  constructor() {
    // Set various headers by default for added security.
    this.headers = {
      'Content-Security-Policy': "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests; require-trusted-types-for 'script'",
      'Expect-CT': 'max-age=0',
      'Origin-Agent-Cluster': '?1',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'X-XSS-Protection': 0,
    };
  }

  /**
   * Finds the name of a response header from a string irrespective of its case, if such a header
   *   exists.
   *
   * @param headerName - Case-insensitive name of the header.
   * @returns The name of a header, if it is set.
   */
  private findMatchingHeaderName = (headerName: string) => Object.keys(this.headers)
    .find((key) => key.toLowerCase() === headerName.toLowerCase());

  /**
   * Returns the value of a response header from its name.
   *
   * @param headerName - Case-insensitive name of the header.
   * @returns The value of the header.
   */
  getHeader = (headerName: string) => {
    const header = this.findMatchingHeaderName(headerName);

    return header != null ? this.headers[header] : undefined;
  };

  /**
   * Sets a response header.
   *
   * @param headerName - Name of the header in the format to be sent to the client.
   * @param value - Value of the header.
   * @returns The response object it was called on.
   */
  setHeader = (headerName: string, value: string | number): Response => {
    const header = this.findMatchingHeaderName(headerName);

    if (header != null) {
      delete this.headers[header];
    }

    this.headers[headerName] = value;

    return this;
  };

  /**
   * Removes a response header.
   *
   * @param headerName - Name of the header in the format to be sent to the client.
   * @returns The response object it was called on.
   */
  removeHeader = (headerName: string): Response => {
    const header = this.findMatchingHeaderName(headerName);

    if (header != null) {
      delete this.headers[header];
    }

    return this;
  };

  /**
   * Sets the body of the response.
   *
   * @remarks
   *
   * The content type of the HTTP response is automatically inferred and set from the body type,
   *   .e.g. setting the body to a string changes the 'Content-Type' header's value to 'text/plain'.
   *   You may directly assign the value to the {@link Response.body | body property} to avoid this
   *   behavior.
   *
   * @param headerName - Name of the header in the format to be sent to the client.
   * @returns The response object it was called on.
   */
  setBody = (body: Body): Response => {
    this.body = body;

    switch (typeof this.body) {
      case 'object': {
        if (this.body != null) {
          // body is JSON
          this.setHeader('Content-Type', 'application/json');
        } else {
          // body is empty
          this.removeHeader('Content-Type');
        }

        break;
      }

      case 'string': {
        this.setHeader('Content-Type', 'text/plain');
        break;
      }

      default:
    }

    return this;
  };

  /**
   * Sets the status of the response.
   *
   * @param statusCode - HTTP status code. @see {@link HttpStatusCode} for a list of available
   *   status codes.
   * @returns The response object it was called on.
   */
  setStatus = (statusCode: HttpStatusCode): Response => {
    this.status = statusCode;

    return this;
  };
}

export default Response;
