import Context from 'lib/Context';

// TODO: refine types
type Layer = (context: Context, next: () => ReturnType<Layer> | undefined) => Promise<void>;

export default Layer;
