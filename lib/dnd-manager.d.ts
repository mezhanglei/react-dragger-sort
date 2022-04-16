import { EventType, SortableItem, DndSortable } from "./utils/types";
export declare class DndManager<T extends Object = any> {
    dragItemMap: Map<HTMLElement, SortableItem>;
    dropItemMap: Map<HTMLElement, DndSortable>;
    constructor();
    setDragItemsMap: (data: SortableItem) => void;
    setDropItemsMap: (data: DndSortable) => void;
    getDropItem: (node: HTMLElement) => DndSortable | undefined;
    getDragItem: (node: HTMLElement) => SortableItem | undefined;
    setActive: (target: HTMLElement) => void;
    removeActive: (target: HTMLElement) => void;
    findNearest: (e: EventType, self: HTMLElement) => HTMLElement | undefined;
}
