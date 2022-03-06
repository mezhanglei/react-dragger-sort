import { DndSourceItem } from "./dnd-item";
import { DndTargetItemType, NotifyEventHandle, SubscribeHandle } from "./utils/types";
export declare class DndStore<T extends Object = any> {
    private subscriptions;
    dndItemMap: Map<HTMLElement, DndTargetItemType>;
    hoverTargetItem?: DndTargetItemType;
    constructor();
    subscribe: SubscribeHandle;
    unsubscribe: (area?: HTMLElement | null | undefined) => void;
    setHoverItem: (item?: DndTargetItemType | undefined) => void;
    setDndItemsMap: (node: HTMLElement, item: DndTargetItemType) => void;
    notifyEvent: NotifyEventHandle;
    findNearest: (sourceItem: DndSourceItem) => DndTargetItemType | undefined;
}
