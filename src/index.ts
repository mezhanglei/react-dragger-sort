import BuildDndSortable from './core';
import { arrayMove } from './utils/array';
import { deepClone } from './utils/object';

const DndSortable = BuildDndSortable();
export default DndSortable;
export { BuildDndSortable, arrayMove, deepClone };
export * from './types';
