import { CSSProperties } from "react";
import { getPrefixStyle } from "./cssPrefix";
import { EventType } from "./types";

export function isDom(ele: any) {
  if (typeof HTMLElement === 'object') {
    return ele instanceof HTMLElement;
  } else {
    return ele && typeof ele === 'object' && ele.nodeType === 1 && typeof ele.nodeName === 'string';
  }
}

/**
 * 返回元素的视窗内的位置
 * @param el 
 * @returns 
 */
export function getRect(el: Element) {
  return el.getBoundingClientRect()
}

// 获取当前的window
export const getWindow = (el?: Node) => {
  const ownerDocument = el?.ownerDocument || document?.ownerDocument;
  return ownerDocument ? (ownerDocument.defaultView || window) : window;
};

// 获取当前的document
export const getOwnerDocument = (el?: Node | null) => {
  const ownerDocument = el?.ownerDocument || document?.ownerDocument;
  return ownerDocument;
};

// 目标元素是否匹配选择器
export function matches(el: any, selector: string) {
  if (!selector) return;

  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

/**
 * 判断根元素是不是包含目标元素
 * @param {*} root 根元素
 * @param {*} child 目标元素
 */
export function isContains(root: Node, child: Node): boolean {
  if (!root || root === child) return false;
  return root.contains(child);
};

// 根据选择器返回在父元素内的序号
export function getChildrenIndex(el: any, excluded?: Array<string | Node | undefined>) {
  const children = el?.parentNode?.children;
  if (!children) return -1;
  let index = 0;
  for (let i = 0; i < children?.length; i++) {
    const node = children[i] as Node;
    if (!excluded?.some((item) => typeof item === 'string' ? matches(node, item) : node == item)) {
      // 如果等于就结束循环
      if (el !== node) {
        index++
      } else {
        break;
      }
    }
  }
  return index;
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

// 事件是否在目标内部
export const isMoveIn = (e: EventType, target: HTMLElement) => {
  const eventXY = getClientXY(e);
  const rect = getRect(target);
  if (eventXY && rect) {
    const { x, y } = eventXY;
    const { left, top, right, bottom } = rect;
    return !(x - left < 0 || y - top < 0 || x - right > 0 || y - bottom > 0);
  }
};

// 触发动画
export function _animate(target: HTMLElement & { animated?: any }, prevRect: any, transitionStyle?: CSSProperties) {
  const ms = 160;
  if (ms) {
    // 目标后面的位置
    const currentRect = target.getBoundingClientRect()
    if (prevRect.nodeType === 1) {
      prevRect = prevRect.getBoundingClientRect()
    }

    // 先回到动画起始位置
    css(target, {
      transition: 'none',
      'transform': `translate3d(${prevRect.left - currentRect.left}px, ${prevRect.top - currentRect.top}px,0)`
    });

    // 然后通过重绘展示已经在起始位置
    target.offsetWidth;

    // 确认执行动画
    css(target, {
      'transition': `all ${ms}ms`,
      'transform': 'translate3d(0,0,0)',
      ...transitionStyle
    });

    clearTimeout(target.animated);
    // 时间到了之后清空重置
    target.animated = setTimeout(function () {
      css(target, {
        transition: '',
        transform: ''
      });
      target.animated = false;
    }, ms);
  }
}

// 收集dom，返回可以执行动画的函数
export function createAnimate(doms?: HTMLCollection | HTMLElement[]) {
  const collect: { dom: HTMLElement, rect: DOMRect }[] = [];
  if (doms) {
    for (let i = 0; i < doms?.length; i++) {
      const dom = doms[i] as HTMLElement;
      collect.push({
        dom,
        rect: dom?.getBoundingClientRect()
      })
    }
  }
  return () => {
    for (let i = 0; i < collect?.length; i++) {
      const item = collect[i];
      if (item) {
        _animate(item.dom, item.rect);
      }
    }
  }
}

// 获取或设置目标元素的style值
export function css(el: any, prop?: string | CSSProperties) {
  let style = el && el.style;
  const win = getWindow(el);
  if (style) {
    const ownerStyle = win.getComputedStyle(el, '') || el.currentStyle;
    if (prop === void 0) {
      return ownerStyle;
    } else if (typeof prop === 'string') {
      return ownerStyle[prop];
    } else if (typeof prop === 'object') {
      for (const key in prop) {
        style[getPrefixStyle(key)] = prop[key]
      }
    }
  }
}

export const insertBefore = (newElement: HTMLElement, targetElement: HTMLElement) => {
  const parentElement = targetElement.parentNode;
  if (!parentElement) return;
  return parentElement.insertBefore(newElement, targetElement);
}

export const insertAfter = (newElement: HTMLElement, targetElement: HTMLElement) => {
  const parentElement = targetElement.parentNode;
  if (!parentElement) return;
  if (parentElement.lastChild == targetElement) {
    return parentElement.appendChild(newElement);
  } else {
    return parentElement.insertBefore(newElement, targetElement.nextElementSibling);
  }
}


/**
 * 添加事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
export function addEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: {
  captrue?: boolean,
  once?: boolean,
  passive?: boolean
}): void {
  if (!el) return;
  // captrue: true事件捕获 once: true只调用一次,然后销毁 passive: true不调用preventDefault
  const options = { capture: false, once: false, passive: false, ...inputOptions };
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

/**
 * 移除事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
export function removeEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: {
  captrue?: boolean,
  once?: boolean,
  passive?: boolean
}): void {
  if (!el) return;
  const options = { capture: false, once: false, passive: false, ...inputOptions };
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}
