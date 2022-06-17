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
    from: DragItem;
}
export interface DndParams extends DragParams {
    to?: DropItem;
}
export declare type DndHandle = (params: DndParams) => void;
export declare type DndCondition = (params: DndParams, options: DndProps['options']) => boolean;
export interface DndBaseProps {
    onStart?: DndHandle;
    onMove?: DndHandle;
    onEnd?: DndHandle;
    onAdd?: DndHandle;
    onUpdate?: DndHandle;
    onHover?: (over: HTMLElement) => void;
    onUnHover?: (over: HTMLElement) => void;
    options: {
        groupPath?: string;
        handle?: string;
        filter?: string;
        allowDrop: boolean | DndCondition;
        allowSort?: boolean | DndCondition;
        childOut?: boolean | (HTMLElement | string)[] | DndCondition;
        childDrag: boolean | (HTMLElement | string)[] | ((from: DragItem, options: DndProps['options']) => boolean);
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
