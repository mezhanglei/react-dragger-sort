import { CSSProperties } from "react";
import { isDom } from "./type";

export interface PositionType {
    width: number;
    height: number;
    x: number;
    y: number;
}
// 比较中心点的位置判断是否重合
export const isOverLay = (tag: PositionType, item: PositionType) => {
    const tagCenter = {
        x: tag?.x + tag?.width / 2,
        y: tag?.y + tag?.height / 2
    }
    const itemCenter = {
        x: item?.x + item?.width / 2,
        y: item?.y + item?.height / 2
    }

    // 水平和竖直方向的阈值设置
    const verticalValue = Math.max(tag?.height, item?.height) / 2;
    const horizontalValue = Math.max(tag?.width, item?.width) / 2

    if (Math.abs(tagCenter?.x - itemCenter?.x) < horizontalValue && Math.abs(tagCenter?.y - itemCenter?.y) < verticalValue) {
        return true;
    } else return false;
}

export const insertAfter = (newElement: HTMLElement, targetElement: HTMLElement) => {
    const parentElement = targetElement.parentNode;
    if (!parentElement) return;
    if ((parentElement as HTMLElement).lastChild == targetElement) {
        (parentElement as HTMLElement).appendChild(newElement);
    } else {
        (parentElement as HTMLElement).insertBefore(newElement, targetElement.nextSibling);
    }
}

// 返回元素或事件对象的可视位置
export interface SizeInterface {
    x: number;
    y: number;
}
export function getClientXY(el: MouseEvent | TouchEvent | HTMLElement): null | SizeInterface {
    let pos = null;
    if ("clientX" in el) {
        pos = {
            x: el.clientX,
            y: el.clientY
        };
    } else if ("touches" in el) {
        if (el?.touches[0]) {
            pos = {
                x: el.touches[0]?.clientX,
                y: el.touches[0]?.clientY
            };
        }
    } else if (isDom(el)) {
        pos = {
            x: el.getBoundingClientRect().left,
            y: el.getBoundingClientRect().top
        };
    }
    return pos;
}

// 获取页面或元素的宽高 = 可视宽高 + 滚动条 + 边框
export interface OffsetInterface {
    width: number;
    height: number;
}
export function getOffsetWH(el: HTMLElement = (document.body || document.documentElement)): undefined | OffsetInterface {
    if (!isDom(el)) {
        return;
    }
    if (el === document.body || el === document.documentElement) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return { width, height };
    } else {
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        return { width, height };
    }
};

/**
 * 获取元素或事件对象的相对于页面的真实位置 = 滚动 + 可视位置
 * @param el 元素或事件对象
 */
 export function getPositionInPage(el: MouseEvent | TouchEvent | HTMLElement): null | SizeInterface {
    const clientXY = getClientXY(el);
    const parentXY = getClientXY(document.body || document.documentElement);
    let pos = null;
    if (clientXY && parentXY) {
        pos = {
            x: clientXY.x - parentXY?.x,
            y: clientXY.y - parentXY?.y
        }
    }
    return pos;
};


/**
 * 返回元素或事件对象相对于父元素的真实位置
 * @param el 元素或事件对象
 * @param parent 父元素
 */
export function getPositionInParent(el: MouseEvent | TouchEvent | HTMLElement, parent: HTMLElement): null | SizeInterface {
    let pos = null;
    if ("clientX" in el) {
        pos = {
            x: el?.clientX - parent.getBoundingClientRect().left,
            y: el?.clientY - parent.getBoundingClientRect().top
        };
    } else if ("touches" in el) {
        if (el?.touches[0]) {
            pos = {
                x: el?.touches[0]?.clientX - parent.getBoundingClientRect().left,
                y: el?.touches[0]?.clientY - parent.getBoundingClientRect().top
            };
        }
    } else if (isDom(el)) {
        pos = {
            x: el.getBoundingClientRect().left - parent.getBoundingClientRect().left,
            y: el.getBoundingClientRect().top - parent.getBoundingClientRect().top
        };
    }

    return pos;
}

/**
 * 返回元素相对于父元素的位置信息
 * @param el 元素或事件对象
 * @param parent 父元素
 */
 export interface RectInParent {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export function getRectInParent(el: HTMLElement, parent: HTMLElement): null | RectInParent {
    let pos = null;
    if (isDom(el)) {
        pos = {
            left: el.getBoundingClientRect().left - parent.getBoundingClientRect().left,
            top: el.getBoundingClientRect().top - parent.getBoundingClientRect().top,
            right: el.getBoundingClientRect().right - parent.getBoundingClientRect().left,
            bottom: el.getBoundingClientRect().bottom - parent.getBoundingClientRect().top
        };
    }

    return pos;
}

/**
 * 给目标节点设置样式,并返回旧样式
 * @param {*} style 样式对象
 * @param {*} node 目标元素
 */
 export function setStyle(style: any, node: HTMLElement = document.body || document.documentElement): CSSProperties {
    const oldStyle: any = {};

    const styleKeys: string[] = Object.keys(style);

    styleKeys.forEach(key => {
        oldStyle[key] = (node.style as any)[key];
    });

    styleKeys.forEach(key => {
        (node.style as any)[key] = (style as any)[key];
    });

    return oldStyle;
}