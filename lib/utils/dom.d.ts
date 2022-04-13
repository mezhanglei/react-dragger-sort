import { CSSProperties } from "react";
export declare const getWindow: (el?: any) => any;
export declare function css(el: any, prop?: string | CSSProperties): any;
export declare function _animate(target: any, prevRect: any, transitionStyle?: CSSProperties): void;
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
export declare function matches(el: any, selector: string): any;
export declare function getChildrenIndex(el: any, excluded?: Array<string | HTMLElement>, include?: Array<string | HTMLElement>): number;
export declare const insertBefore: (newElement: HTMLElement, targetElement: HTMLElement) => void;
export declare const insertAfter: (newElement: HTMLElement, targetElement: HTMLElement) => void;
/**
 * 判断根元素是不是包含目标元素
 * @param {*} root 根元素
 * @param {*} child 目标元素
 */
export declare function isContains(root: HTMLElement, child: HTMLElement): boolean;
export declare const getOwnerDocument: (el?: any) => any;