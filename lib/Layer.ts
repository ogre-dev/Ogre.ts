import Context from './Context';

// TODO: refine types
type Layer = (context: Context, next: Function) => Promise<void>;

export default Layer;
