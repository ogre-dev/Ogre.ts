import Context from './Context';
import { once } from './utils';

type NextLayer = ReturnType<typeof once>;

type Layer = (context: Context, next: NextLayer) => Promise<void>;

export default Layer;
