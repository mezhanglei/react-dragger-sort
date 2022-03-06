import React from "react";
import { DndAreaProps, listenEvent, DndTargetItemType } from "./utils/types";
import { DndItemHandler, DndProps } from "./dnd-item";
export default class DndArea extends React.Component<DndAreaProps, {
    targetItem?: DndTargetItemType;
}> {
    parent: HTMLElement | null;
    static Item: React.ForwardRefExoticComponent<DndProps & React.RefAttributes<any>>;
    constructor(props: DndAreaProps);
    static contextType: React.Context<import("./utils/types").DndProviderContextProps>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onDragStart: DndItemHandler;
    onDrag: DndItemHandler;
    onDragEnd: DndItemHandler;
    AddEvent: listenEvent['listener'];
    render(): JSX.Element;
}
