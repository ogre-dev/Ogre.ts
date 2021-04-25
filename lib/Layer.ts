import Context from './Context';
import { once } from './utils';

/**
 * Next inner layer in the stack.
 *
 * @remarks
 *
 * The next layer can only be called once. Subsequent calls are ignored.
 * Be advised that layers can be asynchronous; when in doubt, next layers should be `await`ed.
 */
type NextLayer = ReturnType<typeof once>;

/**
 * Layer.
 *
 * @param context - Context object containing the request and response objects, as well as a
 *   modifiable state property to pass data across the layers.
 * @param next - Next inner layer in the stack.
 */
type Layer = (context: Context, next: NextLayer) => any;

export default Layer;
