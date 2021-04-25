import HttpStatusReason from '../../enums/HttpStatusReason';
import OgreError from '../OgreError';

class UnsupportedMediaTypeError extends OgreError {
  constructor(m: string = HttpStatusReason.UNSUPPORTED_MEDIA_TYPE) {
    super(m);

    Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
  }
}

export default UnsupportedMediaTypeError;
