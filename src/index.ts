
import { arrayMove } from './utils/array';
import { isObjectEqual } from './utils/object';
import buildDndArea from './dnd-area-builder';
import DndItem from './dnd-item';
import DndContextProvider from './dnd-provider';

const DndArea = buildDndArea();
DndArea.Item = DndItem;
export default DndArea;
export { DndContextProvider, arrayMove, isObjectEqual };
export * from './utils/types';
