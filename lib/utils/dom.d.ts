import { CSSProperties } from "react";
import { EventType } from "./types";
export declare function isDom(ele: any): any;
/**
 * 返回元素的视窗内的位置
 * @param el
 * @returns
 */
export declare function getRect(el: Element): DOMRect;
export declare const getWindow: (el?: Node) => Window & typeof globalThis;
export declare const getOwnerDocument: (el?: Node | null) => Document | null;
export declare function matches(el: any, selector: string): any;
/**
 * 判断根元素是不是包含目标元素
 * @param {*} root 根元素
 * @param {*} child 目标元素
 */
export declare function isContains(root: Node, child: Node): boolean;
export declare function getChildrenIndex(el: any, excluded?: Array<string | Node | undefined>): number;
export declare function getClientXY(el: MouseEvent | TouchEvent | HTMLElement): null | {
    x: number;
    y: number;
};
export declare const isMoveIn: (e: EventType, target: HTMLElement) => boolean | undefined;
export declare function _animate(target: HTMLElement & {
    animated?: any;
}, prevRect: any, transitionStyle?: CSSProperties): void;
export declare function createAnimate(doms?: HTMLCollection | HTMLElement[]): () => void;
export declare function css(el: any, prop?: string | CSSProperties): any;
export declare const insertBefore: (newElement: HTMLElement, targetElement: HTMLElement) => HTMLElement | undefined;
export declare const insertAfter: (newElement: HTMLElement, targetElement: HTMLElement) => HTMLElement | undefined;
/**
 * 添加事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
export declare function addEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: {
    captrue?: boolean;
    once?: boolean;
    passive?: boolean;
}): void;
/**
 * 移除事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
export declare function removeEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: {
    captrue?: boolean;
    once?: boolean;
    passive?: boolean;
}): void;
