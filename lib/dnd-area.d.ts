import React from "react";
import { DndAreaProps } from "./utils/types";
import { DndProps } from "./dnd-item";
export default class DndArea extends React.Component<DndAreaProps> {
    constructor(props: DndAreaProps);
    static Item: React.ForwardRefExoticComponent<DndProps & React.RefAttributes<any>>;
    render(): JSX.Element;
}
