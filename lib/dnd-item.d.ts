import React, { CSSProperties } from 'react';
import { ChildrenType, DragTypes } from "./utils/types";
export declare type EventType = MouseEvent | TouchEvent;
export declare type DndItemHandler<E = EventType, T = DndSourceItem> = (e: E, data: T) => void | boolean;
export interface DndSourceItem {
    width: number;
    height: number;
    x: number;
    y: number;
    translateX?: number;
    translateY?: number;
    node: HTMLElement;
    dragType?: DragTypes;
    path: string;
}
export interface DndProps {
    children: ChildrenType;
    className?: string;
    style?: CSSProperties;
    onDragStart?: DndItemHandler;
    onDrag?: DndItemHandler;
    onDragEnd?: DndItemHandler;
    dragAxis?: string[];
    id: any;
    path?: string;
}
declare const DndItem: React.ForwardRefExoticComponent<DndProps & React.RefAttributes<any>>;
export default DndItem;
