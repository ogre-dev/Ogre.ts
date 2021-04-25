/** Extendable error used by the Ogre framework. */
class OgreError extends Error {
  constructor(m?: string) {
    super(m);

    Object.setPrototypeOf(this, OgreError.prototype);
  }
}

export default OgreError;
