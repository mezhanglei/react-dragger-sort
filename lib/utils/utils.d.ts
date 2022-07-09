import { DndParams, DndProps, DragItem } from "./types";
export declare const isListItem: (item: string) => boolean;
export declare const getCurrentPath: (name: string, parent?: string) => string;
export declare const isChildDrag: (item: DragItem, options: DndProps['options']) => boolean | undefined;
export declare const isChildOut: (params: DndParams, options: DndProps['options']) => boolean | undefined;
export declare const isCanSort: (params: DndParams, options: DndProps['options']) => boolean | undefined;
export declare const isCanDrop: (params: DndParams, options: DndProps['options']) => boolean | undefined;
