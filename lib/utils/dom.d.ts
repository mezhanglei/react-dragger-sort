import { CSSProperties } from "react";
/**
 * 返回元素的视窗内的位置
 * @param el
 * @returns
 */
export declare function getRect(el: HTMLElement): DOMRect;
export interface PositionType {
    width: number;
    height: number;
    x: number;
    y: number;
}
export declare const isOverLay: (tag: PositionType, item: PositionType) => boolean;
export declare const insertAfter: (newElement: HTMLElement, targetElement: HTMLElement) => void;
export declare function getClientXY(el: MouseEvent | TouchEvent | HTMLElement): null | {
    x: number;
    y: number;
};
export declare function getOffsetWH(el: HTMLElement): undefined | {
    width: number;
    height: number;
};
export declare function getInsidePosition(el: HTMLElement, parent?: HTMLElement): null | {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
/**
 * 给目标节点设置样式,并返回旧样式
 * @param {*} style 样式对象
 * @param {*} node 目标元素
 */
export declare function setStyle(style: any, node?: HTMLElement): CSSProperties;
