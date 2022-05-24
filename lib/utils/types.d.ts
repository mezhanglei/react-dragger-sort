import { CSSProperties } from "react";
export declare type EventType = MouseEvent | TouchEvent;
export declare enum DropEffect {
    None = "none",
    Move = "move",
    Copy = "copy",
    Link = "link"
}
export interface DndSortable {
    groupPath?: string;
    groupNode: HTMLElement;
    props: DndBaseProps;
}
export interface SortableItem extends DndSortable {
    item: HTMLElement & {
        animated?: boolean;
    };
    index: number;
    draggableIndex?: number;
    path: string;
}
export interface DragItem extends SortableItem {
    clone?: HTMLElement;
}
export interface DropItem extends DndSortable {
    item?: HTMLElement & {
        animated?: boolean;
    };
    index?: number;
    draggableIndex?: number;
    path?: string;
}
export interface DragParams {
    e: EventType;
    drag: DragItem;
}
export interface DndParams extends DragParams {
    drop: DropItem;
}
export interface DndMoveParams extends DragParams {
    over?: DropItem;
}
export declare type DndHandle = (params: DndParams) => void;
export declare type DragHandle = (params: DndMoveParams) => void;
export interface DndBaseProps {
    onStart?: DragHandle;
    onMove?: DragHandle;
    onEnd?: DragHandle;
    onAdd?: DndHandle;
    onUpdate?: DndHandle;
    onHover?: (over: HTMLElement) => void;
    onUnHover?: (over: HTMLElement) => void;
    options: {
        groupPath?: string;
        handle?: string;
        filter?: string;
        allowDrop: boolean | ((params: DndMoveParams, options: DndProps['options']) => boolean);
        allowSort?: boolean | ((params: DndMoveParams, options: DndProps['options']) => boolean);
        childDrag: boolean | (HTMLElement | string)[] | ((el: HTMLElement, options: DndProps['options']) => boolean);
        direction?: string[];
        sortPreClass?: string;
        sortNextClass?: string;
    };
}
export interface DndProps extends DndBaseProps {
    children: any;
    className?: string;
    style?: CSSProperties;
}
