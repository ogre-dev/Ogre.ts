import HttpStatusReason from 'enums/HttpStatusReason';
import OgreError from 'errors/OgreError';

class InternalServerError extends OgreError {
  constructor(m: string = HttpStatusReason.INTERNAL_SERVER_ERROR) {
    super(m);

    Object.setPrototypeOf(this, OgreError.prototype);
  }
}

export default InternalServerError;
