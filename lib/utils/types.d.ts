import { DndSourceItem, DndItemHandler } from "../dnd-core";
export declare type EventType = MouseEvent | TouchEvent;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd"
}
export interface DndTargetItemType {
    node: HTMLElement;
    path: string;
}
export interface MoveInArea {
    area: HTMLElement;
    path: string;
}
export interface TargetParams extends MoveInArea {
    item: DndTargetItemType;
}
export interface SourceParams {
    e: EventType;
    source: {
        area: HTMLElement;
        item: DndSourceItem;
        path: string;
    };
}
export interface ListenParams extends SourceParams {
    target: MoveInArea;
}
export declare type listenEvent = {
    listener: (params: ListenParams) => MoveInArea | void;
    target: MoveInArea;
};
export declare type NotifyEventHandle = (sourceParams: SourceParams) => MoveInArea | void;
export declare type SubscribeHandle = (target: MoveInArea, addEvent: listenEvent['listener']) => void;
export interface DndParams extends SourceParams {
    target: {
        area: HTMLElement;
        item?: DndTargetItemType;
        path: string;
    };
}
export declare type DragMoveHandle = (params: DndParams) => void | boolean;
export interface DndChildrenContextProps {
    contextDragStart?: DndItemHandler;
    contextDrag?: DndItemHandler;
    contextDragEnd?: DndItemHandler;
    contextHoverItem?: DndTargetItemType;
}
