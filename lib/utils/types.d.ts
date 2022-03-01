import { CSSProperties, JSXElementConstructor, ReactElement } from 'react';
import { DraggerItemEvent, DraggerItemHandler } from "../dragger-item";
export declare type EventType = MouseEvent | TouchEvent;
export declare type ChildrenType = ReactElement<any, string | JSXElementConstructor<any>>;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd"
}
export interface DraggerItemType {
    node: HTMLElement;
    id: string | number;
}
export interface MoveChild extends DraggerItemEvent {
    area?: HTMLElement;
}
export declare enum CollisionDirection {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right"
}
export interface DragParams {
    e: EventType;
    target: MoveChild;
    area?: HTMLElement;
    collision?: DraggerItemType;
}
export declare type DragMoveHandle = (params: DragParams) => void | boolean;
export declare type listenEvent = {
    listener: (moveChild: MoveChild, e: EventType) => void | boolean;
    area: HTMLElement | null;
};
export declare type TriggerFuncHandle<T = MoveChild, E = EventType> = (moveChild: T, e: E) => boolean;
export declare type ListenFuncHandle = (area: HTMLElement, addEvent: listenEvent['listener']) => void;
export declare type DraggableAreaBuilder = (props?: {
    triggerFunc: TriggerFuncHandle;
    subscribe: ListenFuncHandle;
    unsubscribe: (area?: HTMLElement | null) => void;
    draggerItems: DraggerItemType[];
}) => any;
export interface DraggerContextInterface {
    onDragStart?: DraggerItemHandler;
    onDrag?: DraggerItemHandler;
    onDragEnd?: DraggerItemHandler;
    collision?: DraggerItemType;
    draggerItems?: DraggerItemType[];
}
export interface DraggableAreaProps {
    className?: string;
    style?: CSSProperties;
    children: any;
    dataSource: any;
    onDragMoveStart?: DragMoveHandle;
    onDragMove?: DragMoveHandle;
    onDragMoveEnd?: DragMoveHandle;
    onMoveOutChange?: DragMoveHandle;
    onMoveInChange?: DragMoveHandle;
}
export interface DraggableAreaState {
    collision?: DraggerItemType;
}
