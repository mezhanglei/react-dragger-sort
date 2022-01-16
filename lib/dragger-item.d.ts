import React, { CSSProperties } from 'react';
import { ChildrenType, DraggerContextInterface, DragTypes } from "./utils/types";
export declare type EventType = MouseEvent | TouchEvent;
export declare type DraggerItemHandler<E = EventType, T = DraggerItemEvent> = (e: E, data: T) => void | boolean;
export interface DraggerItemEvent {
    width: number;
    height: number;
    x: number;
    y: number;
    translateX?: number;
    translateY?: number;
    node: HTMLElement;
    dragType?: DragTypes;
    id: string | number;
}
export interface DraggerProps extends DraggerContextInterface {
    children: ChildrenType;
    className?: string;
    style?: CSSProperties;
    onDragStart?: DraggerItemHandler;
    onDrag?: DraggerItemHandler;
    onDragEnd?: DraggerItemHandler;
    onResizeStart?: DraggerItemHandler;
    onResizing?: DraggerItemHandler;
    onResizeEnd?: DraggerItemHandler;
    dragAxis?: string[];
    resizeAxis?: string[];
    handle?: string | HTMLElement;
    id: string | number;
}
declare const DraggerItem: React.ForwardRefExoticComponent<DraggerProps & React.RefAttributes<any>>;
export default DraggerItem;
