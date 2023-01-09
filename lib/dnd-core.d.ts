import React, { CSSProperties } from 'react';
import { EventHandler } from "react-free-draggable";
import { DndProps, DndParams, DndHandle, EventType } from "./utils/types";
export default function BuildDndSortable(): {
    new (props: DndProps): {
        parentEl?: HTMLDivElement | undefined;
        dragged?: HTMLElement | undefined;
        cloneDragged?: HTMLElement | undefined;
        over?: HTMLElement | undefined;
        lastDisplay: CSSProperties['display'];
        componentDidMount(): void;
        componentDidUpdate(prevProps: DndProps): void;
        componentWillUnmount(): void;
        initManagerData: (parentEl?: HTMLElement) => void;
        handleMoveStart: (e: any, currentTarget: HTMLElement) => void;
        onStart: EventHandler;
        onMove: EventHandler;
        onEnd: EventHandler;
        onDragStart: (e: any) => void;
        onDragOver: (e: any) => void;
        onDragEnd: (e: any) => void;
        onEndHandle: (e: EventType) => void;
        reset: DndHandle;
        handleDragOverClass: (overInfo: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement;
        }, params: DndParams) => void;
        moveHandle: EventHandler;
        sortInSameArea: (params: DndParams) => void;
        addNewOver: (params: DndParams) => void;
        setDropEndChild: (params: DndParams) => void;
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
