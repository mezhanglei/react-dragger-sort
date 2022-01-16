import React from "react";
import { DraggableAreaBuilder, DraggerContextInterface } from "./utils/types";
export declare const DraggerContext: React.Context<DraggerContextInterface | null>;
declare const buildDraggableArea: DraggableAreaBuilder;
export default buildDraggableArea;
