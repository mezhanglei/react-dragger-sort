import { CSSProperties } from "react";
import { DndParams, DropEffect, EventType } from "../types";
export declare const isDisabledDrag: (params: DndParams) => boolean | undefined;
export declare const isHiddenFrom: (params: DndParams) => boolean | undefined;
export declare const isDisabledSort: (params: DndParams) => boolean | undefined;
export declare const isDisabledDrop: (params: DndParams) => boolean | undefined;
export declare const setMouseEvent: (e: any, type: 'dragstart' | 'dragover', val?: DropEffect) => void;
export declare const isMoveIn: (e: EventType, target: HTMLElement) => boolean | undefined;
export declare function _animate(target: HTMLElement & {
    animated?: any;
}, prevRect: any, transitionStyle?: CSSProperties): void;
export declare function createAnimate(doms?: HTMLCollection | HTMLElement[]): () => void;
