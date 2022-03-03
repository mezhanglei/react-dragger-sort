import { CSSProperties, JSXElementConstructor, ReactElement } from 'react';
import { DndSourceItem, DndItemHandler } from "../dnd-item";
export declare type EventType = MouseEvent | TouchEvent;
export declare type ChildrenType = ReactElement<any, string | JSXElementConstructor<any>>;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd"
}
export interface DndTargetItemType {
    node: HTMLElement;
    id: string | number;
}
export interface SubscribeTargetParams {
    area: HTMLElement;
    collect: unknown;
}
export interface SourceParams {
    e: EventType;
    source: {
        area: HTMLElement;
        item: DndSourceItem;
        collect: unknown;
    };
}
export interface ListenParams extends SourceParams {
    target: SubscribeTargetParams;
}
export declare type listenEvent = {
    listener: (params: ListenParams) => SubscribeTargetParams | void;
    target: SubscribeTargetParams;
};
export declare type TriggerFuncHandle = (sourceParams: SourceParams) => SubscribeTargetParams | void;
export declare type SubscribeHandle = (target: SubscribeTargetParams, addEvent: listenEvent['listener']) => void;
export declare type DndAreaBuilder = () => any;
export interface DndAreaProps {
    className?: string;
    style?: CSSProperties;
    children: any;
    collect: unknown;
}
export interface DndAreaState {
    targetItem?: DndTargetItemType;
    prevCollect?: unknown;
}
export interface DndParams {
    e: EventType;
    target: {
        area: HTMLElement;
        item?: DndTargetItemType;
        collect: unknown;
    };
    source: {
        area: HTMLElement;
        item: DndSourceItem;
        collect: unknown;
    };
}
export declare type DragMoveHandle = (params: DndParams) => void | boolean;
export interface DndContextProps {
    onDragStart?: DragMoveHandle;
    onDrag?: DragMoveHandle;
    onDragEnd?: DragMoveHandle;
}
export interface DndContextProviderProps extends DndContextProps {
    children: any;
}
export interface DndAreaContextProps {
    onDragStart?: DndItemHandler;
    onDrag?: DndItemHandler;
    onDragEnd?: DndItemHandler;
    targetItem?: DndTargetItemType;
    dndItems?: DndTargetItemType[];
}
