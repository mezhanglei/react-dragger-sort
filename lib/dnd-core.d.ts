import React, { CSSProperties } from 'react';
import { EventHandler, EventType } from "react-free-draggable";
import { DndBaseProps, DndMoveParams, DndProps, DndSortable, SortableItem } from "./utils/types";
export default function BuildDndSortable(): {
    new (props: DndProps): {
        sortArea: any;
        dragged: any;
        cloneDragged: any;
        over: HTMLElement | undefined;
        lastDisplay: CSSProperties['display'];
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: DndProps): void;
        getOptions: (options: DndProps['options']) => DndProps['options'];
        initManagerData: () => void;
        isCanDrag: (drag: HTMLElement, options: DndProps['options']) => boolean | undefined;
        isCanSort: (params: DndMoveParams, options: DndProps['options']) => boolean | undefined;
        isCanDrop: (params: DndMoveParams, options: DndProps['options']) => boolean | undefined;
        onStart: EventHandler;
        onEnd: EventHandler;
        onDragEnd: (e: any) => void;
        sortEnd: () => void;
        handleDragOverClass: (params: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement;
            props: DndBaseProps;
        }) => void;
        onDragStart: (e: any) => void;
        onTouchMoveStart: EventHandler;
        moveStartHandle: (e: any, currentTarget?: any) => void;
        moveHandle: EventHandler;
        onTouchMove: EventHandler;
        onDragOver: (e: any) => void;
        sortInSameArea: (e: any, dragItem: SortableItem, dropItem: SortableItem) => void;
        addNewOver: (e: EventType, dropGroup: DndSortable, sortableItem?: SortableItem | undefined) => void;
        setDropEndChild: (e: EventType, dropGroup: DndSortable, cloneDragged: HTMLElement & {
            animated?: boolean;
        }) => void;
        renderChild(child: any): JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<DndProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<DndProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<DndProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<DndProps>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<DndProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<DndProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<DndProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<DndProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    getDerivedStateFromProps(nextProps: DndProps, prevState: any): any;
    contextType?: React.Context<any> | undefined;
};
