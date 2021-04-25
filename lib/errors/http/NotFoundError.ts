import HttpStatusReason from '../../enums/HttpStatusReason';
import OgreError from '../OgreError';

class NotFoundError extends OgreError {
  constructor(m: string = HttpStatusReason.BAD_REQUEST) {
    super(m);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
