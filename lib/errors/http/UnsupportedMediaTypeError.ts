import HttpStatusReason from '../../enums/HttpStatusReason';
import OgreError from '../OgreError';

class InternalServerError extends OgreError {
  constructor(m: string = HttpStatusReason.INTERNAL_SERVER_ERROR) {
    super(m);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export default InternalServerError;
