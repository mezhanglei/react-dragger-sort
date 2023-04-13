/// <reference types="react" />
import BuildDndSortable from './core';
import { arrayMove } from './utils/array';
import { deepClone } from './utils/object';
declare const DndSortable: {
    new (props: import("./utils/types").DndSortableProps): {
        parentElRef?: import("react").RefObject<HTMLDivElement> | undefined;
        dragged?: HTMLElement | undefined;
        cloneDragged?: HTMLElement | undefined;
        over?: HTMLElement | undefined;
        lastDisplay: import("csstype").Property.Display | undefined;
        componentDidMount(): void;
        componentDidUpdate(prevProps: import("./utils/types").DndSortableProps): void;
        componentWillUnmount(): void;
        initManagerData: (parentEl?: HTMLElement | null | undefined) => void;
        handleMoveStart: (e: any, currentTarget: HTMLElement) => void;
        onStart: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").DragEventData>;
        onMove: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").DragEventData>;
        onEnd: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").DragEventData>;
        onDragStart: (e: any) => void;
        onDragOver: (e: any) => void;
        onDragEnd: (e: any) => void;
        onEndHandle: (e: import("./utils/types").EventType) => void;
        reset: import("./utils/types").DndHandle;
        handleDragOverClass: (overInfo: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement | undefined;
        }, params: import("./utils/types").DndParams) => void;
        handleDisabledSort(params: import("./utils/types").DndParams): void;
        moveHandle: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").DragEventData>;
        sortInSameArea: (params: import("./utils/types").DndParams) => void;
        addNewOver: (params: import("./utils/types").DndParams) => void;
        setDropEndChild: (params: import("./utils/types").DndParams) => void;
        renderChild(child: any): JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("./utils/types").DndSortableProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("./utils/types").DndSortableProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("./utils/types").DndSortableProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("./utils/types").DndSortableProps>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("./utils/types").DndSortableProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("./utils/types").DndSortableProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("./utils/types").DndSortableProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("./utils/types").DndSortableProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    getDerivedStateFromProps(nextProps: import("./utils/types").DndSortableProps, prevState: any): any;
    contextType?: import("react").Context<any> | undefined;
};
export default DndSortable;
export { BuildDndSortable, arrayMove, deepClone };
export * from './utils/types';
