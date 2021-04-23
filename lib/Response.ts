import HttpStatusCode from './enums/HttpStatusCode';
import Body from './Body';

class Response {
  readonly headers: { [key: string]: string | number };

  body: Body;

  status: HttpStatusCode = HttpStatusCode.OK;

  constructor() {
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

  private findMatchingHeaderName = (headerName: string) => Object.keys(this.headers)
    .find((key) => key.toLowerCase() === headerName.toLowerCase());

  getHeader = (headerName: string) => {
    const header = this.findMatchingHeaderName(headerName);

    return header != null ? this.headers[header] : undefined;
  };

  setHeader = (headerName: string, value: string | number): Response => {
    const header = this.findMatchingHeaderName(headerName);

    if (header != null) {
      delete this.headers[header];
    }

    this.headers[headerName] = value;

    return this;
  };

  removeHeader = (headerName: string): Response => {
    const header = this.findMatchingHeaderName(headerName);

    if (header != null) {
      delete this.headers[header];
    }

    return this;
  };

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

  setStatus = (statusCode: HttpStatusCode): Response => {
    this.status = statusCode;

    return this;
  };
}

export default Response;
