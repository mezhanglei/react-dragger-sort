/// <reference types="react" />
import BuildDndSortable from './dnd-core';
import { arrayMove } from './utils/array';
declare const DndSortable: import("react").ForwardRefExoticComponent<import("./dnd-core").DndProps & import("react").RefAttributes<any>>;
export default DndSortable;
export { BuildDndSortable, arrayMove };
export * from './utils/types';
