import { CSSProperties } from "react";
import { isDom } from "./type";

export interface BoundingRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
// 判断是否碰撞
export const isOverLay = (move: BoundingRect, other: BoundingRect) => {
  let l1 = move?.left
  let t1 = move?.top
  let r1 = move?.right
  let b1 = move?.bottom

  let l2 = other?.left
  let t2 = other?.top
  let r2 = other?.right
  let b2 = other?.bottom

  const otherW = other.right - other?.left;
  const otherH = other.bottom - other?.top;

  const maxX = Math.min(15, otherW / 4);
  const maxY = Math.min(15, otherH / 4);

  return !(r1 - l2 < maxX || b1 - t2 < maxY || r2 - l1 < maxX || b2 - t1 < maxY)
}

// 求两点之间的距离
export function getDistance(move: BoundingRect, other: BoundingRect) {
  const moveCenter = {
    x: move?.left + (move.right - move?.left) / 2,
    y: move?.top + (move.bottom - move?.top) / 2
  }
  const otherCenter = {
    x: other?.left + (other.right - other?.left) / 2,
    y: other?.top + (other.bottom - other?.top) / 2
  }

  const x = moveCenter.x - otherCenter.x;
  const y = moveCenter.y - otherCenter.y;
  return Math.sqrt(x * x + y * y)
}

// 拖拽元素在另一元素的方位
export const getDirection = (move: BoundingRect, other: BoundingRect) => {
  let l1 = move?.left
  let t1 = move?.top
  let r1 = move?.right
  let b1 = move?.bottom

  let l2 = other?.left
  let t2 = other?.top
  let otherXcenter = other?.left + (other.right - other?.left) / 2;
  let otherYcenter = other?.top + (other.bottom - other?.top) / 2;

  const direction = [];
  if (r1 < otherXcenter || l1 < l2) {
    direction.push('left');
  } else {
    direction.push('right');
  }
  if (b1 < otherYcenter || t1 < t2) {
    direction.push('top');
  } else {
    direction.push('bottom');
  }
  return direction;
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

/**
* 返回元素的视窗内的位置
* @param el 
* @returns 
*/
export function getRect(el: HTMLElement) {
  return el.getBoundingClientRect()
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