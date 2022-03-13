import React, { CSSProperties } from 'react';
import { DragMoveHandle, DragTypes, SourceParams } from "./utils/types";
export declare type EventType = MouseEvent | TouchEvent;
export declare type DndItemHandler<E = EventType, T = DndSourceItem> = (e: E, data: T) => void | boolean;
export interface DndSourceItem {
    width: number;
    height: number;
    x: number;
    y: number;
    node: HTMLElement;
    dragType?: DragTypes;
    path: string;
}
export interface DndProps {
    children: any;
    className?: string;
    style?: CSSProperties;
    onDragStart?: (params: SourceParams) => void | boolean;
    onDrag?: DragMoveHandle;
    onDragEnd?: DragMoveHandle;
    onMoveIn?: DragMoveHandle;
    onMoveInEnd?: DragMoveHandle;
    dragAxis?: string[];
    path?: string;
}
export default function BuildDndSortable(): React.ForwardRefExoticComponent<DndProps & React.RefAttributes<any>>;
