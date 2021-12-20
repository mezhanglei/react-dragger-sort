import { CSSProperties } from "react";
import { isDom } from "./type";

/**
 * 返回元素的视窗内的位置
 * @param el 
 * @returns 
 */
 export function getRect(el: HTMLElement) {
    return el.getBoundingClientRect()
}

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

// 返回元素或事件对象的视口位置
export function getClientXY(el: MouseEvent | TouchEvent | HTMLElement): null | {
    x: number;
    y: number;
} {
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
        if ([document.documentElement, document.body].includes(el)) {
            pos = {
                x: 0,
                y: 0
            }
        } else {
            pos = {
                x: getRect(el)?.left,
                y: getRect(el).top
            };
        }
    }
    return pos;
}

// 获取页面或元素的宽高 = 可视宽高 + 滚动条 + 边框
export function getOffsetWH(el: HTMLElement): undefined | {
    width: number;
    height: number;
} {
    if (!isDom(el)) {
        return;
    }
    if ([document.documentElement, document.body].includes(el)) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return { width, height };
    } else {
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        return { width, height };
    }
};

// 目标在父元素内的四条边位置信息
export function getInsidePosition(el: HTMLElement, parent: HTMLElement = document.body || document.documentElement): null | {
    left: number;
    top: number;
    right: number;
    bottom: number;
} {
    let pos = null;
    if (isDom(el)) {
        const nodeOffset = getOffsetWH(el);
        if (!nodeOffset) return null;
        const parentBorderWidth = parseFloat(getComputedStyle(parent)?.borderLeftWidth);

        const top = getRect(el).top - getRect(parent).top - parentBorderWidth;
        const left = getRect(el).left - getRect(parent).left - parentBorderWidth;

        return {
            left,
            top,
            right: left + nodeOffset?.width,
            bottom: top + nodeOffset?.height
        }
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