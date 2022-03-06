import DndArea from './dnd-area';
import BuildDndProvider from './dnd-provider';
import { arrayMove } from './utils/array';
import { deepSet } from './utils/object';
declare const DndContextProvider: (props: import("./utils/types").DndProviderProps) => JSX.Element;
export default DndArea;
export { BuildDndProvider, DndContextProvider, arrayMove, deepSet };
export * from './dnd-store';
export * from './utils/types';
