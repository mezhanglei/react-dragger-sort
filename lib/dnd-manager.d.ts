import { EventType, SortableItem, DndSortable } from "./utils/types";
export declare type GroupListener = {
    group: HTMLElement;
    onChange: (newValue?: any, oldValue?: any) => void;
};
export declare class DndManager<T extends Object = any> {
    dragItemMap: Map<HTMLElement, SortableItem>;
    dropItemMap: Map<HTMLElement, DndSortable>;
    private groupListeners;
    constructor();
    setDragItemsMap: (node: HTMLElement, data: SortableItem) => void;
    updateDragItemMap: (node: HTMLElement, params: Partial<SortableItem>) => void;
    setDropItemsMap: (node: HTMLElement, data: DndSortable) => void;
    updateDropItemMap: (node: HTMLElement, params: Partial<DndSortable>) => void;
    getDropItem: (node: HTMLElement) => DndSortable | undefined;
    getDragItem: (node: HTMLElement) => SortableItem | undefined;
    findOver: (e: EventType, selfNode: HTMLElement, isSelf?: boolean) => HTMLElement | undefined;
    subscribeGroup(group: HTMLElement, listener: GroupListener['onChange']): () => void;
    unsubscribeGroup(group?: HTMLElement): void;
    notify(group?: HTMLElement): void;
}
