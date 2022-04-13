import React, { CSSProperties } from 'react';
import { EventHandler } from "react-free-draggable";
import { DndProps, DndSortable, SortableItem } from "./utils/types";
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
        isCanDrag: (el: HTMLElement, options: DndProps['options']) => boolean | undefined;
        onStartHandle: EventHandler;
        onEndHandle: EventHandler;
        onDragStartHandle: (e: any) => void;
        onDragEndHandle: (e: any) => void;
        resetData: () => void;
        handleDragOverClass: (params: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement;
            options: DndProps['options'];
        }) => void;
        sortInSameArea: (newOver?: (HTMLElement & {
            animated?: boolean | undefined;
        }) | undefined) => void;
        insertNewOver: (dropItem: DndSortable, sortableItem: SortableItem) => void;
        appendNewOver: (dropItem: DndSortable) => void;
        onDragOverHandle: (e: any) => void;
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