import { CSSProperties, JSXElementConstructor, ReactElement } from 'react';
import { DraggerItemEvent, DraggerItemHandler } from "../dragger-item";
export declare type EventType = MouseEvent | TouchEvent;
export declare type ChildrenType = ReactElement<any, string | JSXElementConstructor<any>>;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd"
}
export interface ChildTypes {
    node: HTMLElement;
    id: string | number;
}
export interface TagInterface extends DraggerItemEvent {
    area?: HTMLElement;
}
export declare type DragMoveHandle = (tag: TagInterface, coverChild?: ChildTypes, e?: EventType) => void | boolean;
export declare type listenEvent = {
    listener: (tag: TagInterface, e: EventType) => void | boolean;
    area: HTMLElement | null;
};
export declare type TriggerFuncHandle<T = TagInterface, E = EventType> = (tag: T, e: E) => boolean;
export declare type ListenFuncHandle = (area: HTMLElement, addEvent: listenEvent['listener']) => void;
export declare type DraggableAreaBuilder = (props?: {
    triggerFunc: TriggerFuncHandle;
    subscribe: ListenFuncHandle;
    unsubscribe: (area?: HTMLElement | null) => void;
    draggerItems: ChildTypes[];
}) => any;
export interface DraggerContextInterface {
    onDragStart?: DraggerItemHandler;
    onDrag?: DraggerItemHandler;
    onDragEnd?: DraggerItemHandler;
    coverChild?: ChildTypes;
    draggerItems?: ChildTypes[];
    zIndexRange?: [number, number];
}
export interface TriggerInfo {
    area?: HTMLElement;
    coverChild?: ChildTypes;
    moveTag: TagInterface;
}
export interface DraggableAreaProps {
    className?: string;
    style?: CSSProperties;
    children: any;
    dataSource: any;
    onDragMove?: DragMoveHandle;
    onDragMoveEnd?: DragMoveHandle;
    onMoveOutChange?: (triggerInfo: TriggerInfo) => void | boolean;
    onMoveInChange?: (triggerInfo: TriggerInfo) => void | boolean;
}
export interface DraggableAreaState {
    coverChild?: ChildTypes;
}
