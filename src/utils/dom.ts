import { CSSProperties } from "react";
import { isDom } from "./type";

export interface BoundingRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
// 事件对象是否在目标范围内
export const isMoveIn = (event: { x: number, y: number }, other: BoundingRect) => {

  const eventX = event?.x;
  const eventY = event?.y;

  return !(eventX - other?.left < 0 || eventY - other?.top < 0 || eventX - other?.right > 0 || eventY - other?.bottom > 0);
};

// 点距离目标内的四条边的最短距离
export function getMinDistance(event: { x: number, y: number }, other: BoundingRect) {
  const distances = [Math.floor(event.x - other.left), Math.floor(event.y - other?.top), Math.floor(other?.bottom - event?.y), Math.floor(other?.right - event.x)];
  const minDistance = Math.min.apply(Math, distances);
  return minDistance;
};

/**
 * 返回元素的视窗内的位置
 * @param el 
 * @returns 
 */
 export function getRect(el: HTMLElement) {
  return el.getBoundingClientRect();
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

/**
 * 返回事件对象相对于父元素的真实位置
 * @param el 事件对象
 * @param parent 父元素
 */
 export function getEventPosition(el: MouseEvent | TouchEvent, parent: HTMLElement = document.body || document.documentElement): null | {
  x: number;
  y: number;
} {
  let pos = null;
  if ("clientX" in el) {
    pos = {
      x: el?.clientX - getRect(parent).left,
      y: el?.clientY - getRect(parent).top,
    };
  } else if ("touches" in el) {
    if (el?.touches[0]) {
      pos = {
        x: el?.touches[0]?.clientX - getRect(parent).left,
        y: el?.touches[0]?.clientY - getRect(parent).top
      };
    }
  }

  return pos;
}

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
    const borderLeftWidth = parseFloat(getComputedStyle(parent)?.borderLeftWidth) || 0;
    const borderTopWidth = parseFloat(getComputedStyle(parent)?.borderTopWidth) || 0;

    const top = getRect(el).top - getRect(parent).top - borderTopWidth;
    const left = getRect(el).left - getRect(parent).left - borderLeftWidth;

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

