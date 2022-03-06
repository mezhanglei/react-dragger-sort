import { CSSProperties, JSXElementConstructor, ReactElement } from 'react';
import { DndSourceItem, DndItemHandler } from "../dnd-item";
import { DndStore } from '../dnd-store';
export declare type EventType = MouseEvent | TouchEvent;
export declare type ChildrenType = ReactElement<any, string | JSXElementConstructor<any>>;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd"
}
export interface DndTargetItemType {
    node: HTMLElement;
    path: string;
}
export interface SubscribeTargetParams {
    area: HTMLElement;
    collect: unknown;
    path: string;
}
export interface TargetParams extends SubscribeTargetParams {
    item?: DndTargetItemType;
}
export interface SourceParams {
    e: EventType;
    source: {
        area: HTMLElement;
        item: DndSourceItem;
        collect: unknown;
        path: string;
    };
}
export interface ListenParams extends SourceParams {
    target: SubscribeTargetParams;
}
export declare type listenEvent = {
    listener: (params: ListenParams) => SubscribeTargetParams | void;
    target: SubscribeTargetParams;
};
export declare type NotifyEventHandle = (sourceParams: SourceParams) => SubscribeTargetParams | void;
export declare type SubscribeHandle = (target: SubscribeTargetParams, addEvent: listenEvent['listener']) => void;
export declare type DndAreaBuilder = () => any;
export interface DndAreaProps {
    className?: string;
    style?: CSSProperties;
    children: any;
    collect: unknown;
    id: any;
    path?: string;
}
export interface DndParams extends SourceParams {
    target: TargetParams;
}
export declare type DragMoveHandle = (params: DndParams) => void | boolean;
export interface DndProviderProps {
    children?: any;
    onDragStart?: DragMoveHandle;
    onDrag?: DragMoveHandle;
    onDragEnd?: DragMoveHandle;
    onAreaDropping?: DragMoveHandle;
    onAreaDropEnd?: DragMoveHandle;
}
export interface DndProviderContextProps extends DndProviderProps {
    store: DndStore;
}
export interface DndAreaContextProps {
    onDragStart?: DndItemHandler;
    onDrag?: DndItemHandler;
    onDragEnd?: DndItemHandler;
    targetItem?: DndTargetItemType;
    path: string;
}
