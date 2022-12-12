import { DndParams, DropEffect } from "./types";
export declare const isDisabledDrag: (params: DndParams) => boolean | undefined;
export declare const isHiddenFrom: (params: DndParams) => boolean | undefined;
export declare const isDisabledSort: (params: DndParams) => boolean | undefined;
export declare const isDisabledDrop: (params: DndParams) => boolean | undefined;
export declare const setMouseEvent: (e: any, type: 'dragstart' | 'dragover', val?: DropEffect) => void;
