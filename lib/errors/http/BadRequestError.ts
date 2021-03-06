import HttpStatusReason from '../../enums/HttpStatusReason';
import OgreError from '../OgreError';

class BadRequestError extends OgreError {
  constructor(m: string = HttpStatusReason.BAD_REQUEST) {
    super(m);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
