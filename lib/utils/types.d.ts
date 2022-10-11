import { CSSProperties } from "react";
export declare type EventType = MouseEvent | TouchEvent;
export declare enum DropEffect {
    None = "none",
    Move = "move",
    Copy = "copy",
    Link = "link"
}
export interface SortableGroup extends DndBaseProps {
    node: HTMLElement;
}
export interface SortableItem {
    node?: HTMLElement & {
        animated?: boolean;
    };
    id?: string | number;
    index?: number;
    group?: SortableGroup;
}
export interface DragItem extends SortableItem {
    clone?: HTMLElement;
}
export interface DndParams {
    e: EventType;
    from: DragItem;
    to?: SortableItem;
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
    collection?: any;
    options: {
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
