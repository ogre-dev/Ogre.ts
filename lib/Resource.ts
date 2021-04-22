import HttpMethod from 'enums/HttpMethod';
import Layer from 'lib/Layer';
import { stringPathToRegExp } from 'lib/utils';

type Path = RegExp;

class Resource {
  path: Path;

  constructor(path: string | RegExp) {
    this.path = this.setPath(path);
  }

  private setPath = (path: string | RegExp) => (
    typeof path === 'string'
      ? stringPathToRegExp(path)
      : path
  );

  get?: Layer;

  head?: Layer;

  post?: Layer;

  put?: Layer;

  delete?: Layer;

  connect?: Layer;

  options?: Layer;

  trace?: Layer;

  patch?: Layer;

  toLayer = (): Layer => async (context, next) => {
    const { request } = context;

    const match = this.path.exec(request.path);

    if (match == null) {
      next();
      return;
    }

    const { groups } = match;

    request.query = { ...groups };

    switch (request.method) {
      case HttpMethod.GET:
        if (this.get != null) {
          this.get(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.HEAD:
        if (this.head != null) {
          this.head(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.POST:
        if (this.post != null) {
          this.post(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.PUT:
        if (this.put != null) {
          this.put(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.DELETE:
        if (this.delete != null) {
          this.delete(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.CONNECT:
        if (this.connect != null) {
          this.connect(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.OPTIONS:
        if (this.options != null) {
          this.options(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.TRACE:
        if (this.trace != null) {
          this.trace(context, next);
        } else {
          next();
        }

        return;
      case HttpMethod.PATCH:
        if (this.patch != null) {
          this.patch(context, next);
        } else {
          next();
        }

        return;
      default:
        next();
    }
  };
}

export default Resource;
