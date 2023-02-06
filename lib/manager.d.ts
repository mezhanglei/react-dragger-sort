import { EventType, SortableItem } from "./utils/types";
export declare class DndManager {
    dragItemMap: Map<HTMLElement, SortableItem>;
    dropItemMap: Map<HTMLElement, SortableItem>;
    constructor();
    setDragItemsMap: (node: HTMLElement, data: SortableItem) => void;
    updateDragItemMap: (node: HTMLElement, params: Partial<SortableItem>) => void;
    setDropItemsMap: (node: HTMLElement, data: SortableItem) => void;
    updateDropItemMap: (node: HTMLElement, params: Partial<SortableItem>) => void;
    getDropItem: (node?: HTMLElement) => SortableItem | undefined;
    getDragItem: (node?: HTMLElement) => SortableItem | undefined;
    findOver: (e: EventType, selfNode: HTMLElement, isSelf?: boolean) => HTMLElement | undefined;
}
