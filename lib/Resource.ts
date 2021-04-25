import HttpMethod from './enums/HttpMethod';
import Layer from './Layer';
import { stringPathToRegExp } from './utils';

type Path = RegExp;

/**
 * Extendable class defining an HTTP resource.
 */
class Resource {
  /** Pattern used to catch requests with corresponding resource paths. */
  path: Path;

  /**
   * @param path - Pattern used to catch requests with corresponding resource paths.
   *
   * @remarks
   *
   * Path variables are accessible as a property through
   *   {@link Request.query | `context.request.query`}.
   *
   * @example `'/users/\{userId\}'` will match `'/users/123'`, `'/users/123/'` etc. but not
   *   `'/users/123/friends/'`.
   * @example `'/users/\{userId\}/*'` will match `'/users/123'`, `'/users/123/'`,
   *   `'/users/123/friends/'` etc.
   */
  constructor(path: string | RegExp) {
    this.path = this.setPath(path);
  }

  /**
   * Sets the regular expression used by the resource to match request paths.
   *
   * @remarks
   *
   * If the argument is a string, the path will be parsed into a regular expression.
   *
   * @param path - Path of the resource.
   */
  private setPath = (path: string | RegExp) => (
    typeof path === 'string'
      ? stringPathToRegExp(path)
      : path
  );

  /** GET method handler. */
  get?: Layer;

  /** HEAD method handler. */
  head?: Layer;

  /** POST method handler. */
  post?: Layer;

  /** PUT method handler. */
  put?: Layer;

  /** DELETE method handler. */
  delete?: Layer;

  /** CONNECT method handler. */
  connect?: Layer;

  /** OPTIONS method handler. */
  options?: Layer;

  /** TRACE method handler. */
  trace?: Layer;

  /** PATCH method handler. */
  patch?: Layer;

  /** Fallback layer used when the resource does not include any handler for the request method */
  fallback?: Layer;

  /** Makes a {@link Layer | layer} out of the resource. */
  toLayer = (): Layer => async (context, next) => {
    const { request } = context;

    const match = this.path.exec(request.path);

    if (match == null) {
      await next();
      return;
    }

    const { groups } = match;

    request.pathParameters = { ...groups };

    const handleMethodNotFound = async () => (
      this.fallback != null
        ? this.fallback(context, next)
        : next()
    );

    switch (request.method) {
      case HttpMethod.GET:
        if (this.get != null) {
          await this.get(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.HEAD:
        if (this.head != null) {
          await this.head(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.POST:
        if (this.post != null) {
          await this.post(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.PUT:
        if (this.put != null) {
          await this.put(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.DELETE:
        if (this.delete != null) {
          await this.delete(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.CONNECT:
        if (this.connect != null) {
          await this.connect(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.OPTIONS:
        if (this.options != null) {
          await this.options(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.TRACE:
        if (this.trace != null) {
          await this.trace(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      case HttpMethod.PATCH:
        if (this.patch != null) {
          await this.patch(context, next);
        } else {
          await handleMethodNotFound();
        }

        break;
      default:
        await handleMethodNotFound();
    }
  };
}

export default Resource;
