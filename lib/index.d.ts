/// <reference types="react" />
import BuildDndSortable from './dnd-core';
import { arrayMove } from './utils/array';
declare const DndSortable: {
    new (props: import("./utils/types").DndProps): {
        sortArea: any;
        dragged: any;
        cloneDragged: any;
        over: HTMLElement | undefined;
        lastDisplay: "none" | "inherit" | "ruby" | "table" | (string & {}) | "-moz-initial" | "initial" | "revert" | "unset" | "contents" | "block" | "inline" | "run-in" | "-ms-flexbox" | "-ms-grid" | "-webkit-flex" | "flex" | "flow" | "flow-root" | "grid" | "ruby-base" | "ruby-base-container" | "ruby-text" | "ruby-text-container" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group" | "-ms-inline-flexbox" | "-ms-inline-grid" | "-webkit-inline-flex" | "inline-block" | "inline-flex" | "inline-grid" | "inline-list-item" | "inline-table" | "list-item" | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: import("./utils/types").DndProps): void;
        getOptions: (options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean;
            allowSort?: boolean | undefined;
            childDrag: boolean | (string | HTMLElement)[];
            direction?: string[] | undefined;
            sortSmallClass?: string | undefined;
            sortBigClass?: string | undefined;
        }) => {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean;
            allowSort?: boolean | undefined;
            childDrag: boolean | (string | HTMLElement)[];
            direction?: string[] | undefined;
            sortSmallClass?: string | undefined;
            sortBigClass?: string | undefined;
        };
        initManagerData: () => void;
        isCanDrag: (el: HTMLElement, options: {
            groupPath?: string | undefined;
            handle?: string | undefined;
            filter?: string | undefined;
            allowDrop: boolean;
            allowSort?: boolean | undefined;
            childDrag: boolean | (string | HTMLElement)[];
            direction?: string[] | undefined;
            sortSmallClass?: string | undefined;
            sortBigClass?: string | undefined;
        }) => boolean | undefined;
        onStartHandle: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onEndHandle: import("react-free-draggable").EventHandler<import("react-free-draggable").EventType, import("react-free-draggable").EventData>;
        onDragStartHandle: (e: any) => void;
        onDragEndHandle: (e: any) => void;
        resetData: () => void;
        handleDragOverClass: (params: {
            draggedIndex: number;
            newOverIndex: number;
            oldOverIndex: number;
            newOver: HTMLElement;
            oldOver?: HTMLElement | undefined;
            options: {
                groupPath?: string | undefined;
                handle?: string | undefined;
                filter?: string | undefined;
                allowDrop: boolean;
                allowSort?: boolean | undefined;
                childDrag: boolean | (string | HTMLElement)[];
                direction?: string[] | undefined;
                sortSmallClass?: string | undefined;
                sortBigClass?: string | undefined;
            };
        }) => void;
        sortInSameArea: (newOver?: (HTMLElement & {
            animated?: boolean | undefined;
        }) | undefined) => void;
        insertNewOver: (dropItem: import("./utils/types").DndSortable, sortableItem: import("./utils/types").SortableItem) => void;
        appendNewOver: (dropItem: import("./utils/types").DndSortable) => void;
        onDragOverHandle: (e: any) => void;
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
export { BuildDndSortable, arrayMove };
export * from './utils/types';
