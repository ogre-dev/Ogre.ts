import HttpMethod from 'enums/HttpMethod';
import Context from 'lib/Context';
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

  toLayer = (): Layer => async (context: Context, next: Function) => {
    const { request } = context;

    const match = this.path.exec(request.path);

    if (match == null) {
      return next();
    }

    const { groups } = match;

    request.query = { ...groups };

    switch (request.method) {
      case HttpMethod.GET:
        return this.get ? this.get(context, next) : next();
      case HttpMethod.HEAD:
        return this.head ? this.head(context, next) : next();
      case HttpMethod.POST:
        return this.post ? this.post(context, next) : next();
      case HttpMethod.PUT:
        return this.put ? this.put(context, next) : next();
      case HttpMethod.DELETE:
        return this.delete ? this.delete(context, next) : next();
      case HttpMethod.CONNECT:
        return this.connect ? this.connect(context, next) : next();
      case HttpMethod.OPTIONS:
        return this.options ? this.options(context, next) : next();
      case HttpMethod.TRACE:
        return this.trace ? this.trace(context, next) : next();
      case HttpMethod.PATCH:
        return this.patch ? this.patch(context, next) : next();
      default:
        return next();
    }
  };
}

export default Resource;
