/// <reference types="react" />
import BuildDndSortable from './core';
import { arrayMove } from './utils/array';
import { deepClone } from './utils/object';
declare const DndSortable: import("react").ForwardRefExoticComponent<import("./types").DndSortableProps & import("react").RefAttributes<unknown>>;
export default DndSortable;
export { BuildDndSortable, arrayMove, deepClone };
export * from './types';
