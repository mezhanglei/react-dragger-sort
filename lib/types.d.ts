/// <reference types="react" />
import { DndManager } from "./manager";
export type EventType = MouseEvent | TouchEvent;
export declare enum DropEffect {
    None = "none",
    Move = "move",
    Copy = "copy",
    Link = "link"
}
export interface SortableGroup extends DndSortableProps {
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
export interface DndParams<T = {}> {
    e: EventType;
    from: DragItem & T;
    to?: SortableItem & T;
}
export type DndHandle<T = {}> = (params: DndParams<T>) => void;
export type DndCondition<T = {}> = (params: DndParams<T>) => boolean | undefined;
export type UnionCondition = boolean | (HTMLElement | string)[] | DndCondition;
export interface DndSortableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    dndManager?: DndManager;
    forwardedRef?: any;
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
