import HttpStatusReason from 'enums/HttpStatusReason';
import OgreError from 'errors/OgreError';

class UnsupportedMediaTypeError extends OgreError {
  constructor(m: string = HttpStatusReason.UNSUPPORTED_MEDIA_TYPE) {
    super(m);

    Object.setPrototypeOf(this, OgreError.prototype);
  }
}

export default UnsupportedMediaTypeError;