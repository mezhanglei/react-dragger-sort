import { CSSProperties } from "react";
export type EventType = MouseEvent | TouchEvent;
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
export type DndHandle = (params: DndParams) => void;
export type DndCondition = (params: DndParams) => boolean;
export type UnionCondition = boolean | (HTMLElement | string)[] | DndCondition;
export interface DndBaseProps {
    onStart?: DndHandle;
    onMove?: DndHandle;
    onEnd?: DndHandle;
    onAdd?: DndHandle;
    onUpdate?: DndHandle;
    onHover?: (over: HTMLElement) => void;
    onUnHover?: (over: HTMLElement) => void;
    collection?: any;
    options?: {
        handle?: string;
        filter?: string;
        hiddenFrom?: UnionCondition;
        disabledDrop?: UnionCondition;
        disabledSort?: UnionCondition;
        disabledDrag?: UnionCondition;
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
