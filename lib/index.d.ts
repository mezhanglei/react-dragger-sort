/// <reference types="react" />
import BuildDndSortable from './dnd-core';
import { arraySwap } from './utils/array';
import { deepClone } from './utils/object';
declare const DndSortable: {
    new (props: import("./utils/types").DndProps): {
        sortArea: any;
        dragged: any;
        cloneDragged: any;
        over: HTMLElement | undefined;
        lastDisplay: import("csstype").Property.Display | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: import("./utils/types").DndProps): void;
        getOptions: (options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        }) => {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        };
        initManagerData: () => void;
        isChildDrag: (item: import("./utils/types").DragItem, options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        }) => boolean | undefined;
        isChildOut: (params: import("./utils/types").DndParams, options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        }) => boolean | undefined;
        isCanSort: (params: import("./utils/types").DndParams, options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        }) => boolean | undefined;
        isCanDrop: (params: import("./utils/types").DndParams, options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean | import("./utils/types").DndCondition;
            allowSort?: boolean | import("./utils/types").DndCondition | undefined;
            childOut?: boolean | import("./utils/types").DndCondition | (string | HTMLElement)[] | undefined;
            childDrag: boolean | (string | HTMLElement)[] | ((from: import("./utils/types").DragItem, options: any) => boolean);
            direction?: string[] | undefined;
            sortPreClass?: string | undefined;
            sortNextClass?: string | undefined;
        }) => boolean | undefined;
        onStart: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onEnd: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onDragEnd: (e: any) => void;
        sortEnd: () => void;
        handleDragOverClass: (params: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement | undefined;
            props: import("./utils/types").DndBaseProps;
        }) => void;
        onDragStart: (e: any) => void;
        onTouchMoveStart: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        moveStartHandle: (e: any, currentTarget?: any) => void;
        moveHandle: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onTouchMove: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onDragOver: (e: any) => void;
        sortInSameArea: (e: any, dragItem: import("./utils/types").SortableItem, dropItem: import("./utils/types").SortableItem) => void;
        addNewOver: (e: import("react-free-draggable").EventType, dropGroup: import("./utils/types").DndSortable, sortableItem?: import("./utils/types").SortableItem | undefined) => void;
        setDropEndChild: (e: import("react-free-draggable").EventType, dropGroup: import("./utils/types").DndSortable, cloneDragged: HTMLElement & {
            animated?: boolean | undefined;
        }) => void;
        renderChild(child: any): JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("./utils/types").DndProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("./utils/types").DndProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("./utils/types").DndProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("./utils/types").DndProps>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("./utils/types").DndProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("./utils/types").DndProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("./utils/types").DndProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("./utils/types").DndProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    getDerivedStateFromProps(nextProps: import("./utils/types").DndProps, prevState: any): any;
    contextType?: import("react").Context<any> | undefined;
};
export default DndSortable;
export { BuildDndSortable, arraySwap, deepClone };
export * from './utils/types';
