import { DndManager } from "./manager";

export type EventType = MouseEvent | TouchEvent;

export enum DropEffect {
  None = 'none', // 不能把元素拖放至此
  Move = 'move', // 移动到目标
  Copy = 'copy', // 复制到目标
  Link = 'link' // 目标打开拖动元素（拖动元素必须是链接并有URL）
}

// 拖放所在区域的信息
export interface SortableGroup extends DndSortableProps {
  node: HTMLElement
}

// 可排序项
export interface SortableItem {
  node?: HTMLElement & { animated?: boolean }; // 拖拽元素
  id?: string | number; // data-id设置的属性
  index?: number; // 位置序号
  group?: SortableGroup; // 拖放所在区域的信息
}

// 拖拽项
export interface DragItem extends SortableItem {
  clone?: HTMLElement; // 拖拽元素的克隆体
}

// 拖拽触发的函数的参数
export interface DndParams<T = {}> {
  e: EventType;
  from: DragItem & T;
  to?: SortableItem & T;
}

// 拖拽触发的函数
export type DndHandle<T = {}> = (params: DndParams<T>) => void;

// 拖拽条件函数
export type DndCondition<T = {}> = (params: DndParams<T>) => boolean | undefined;
export type UnionCondition = boolean | (HTMLElement | string)[] | DndCondition;

export interface DndSortableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  dndManager?: DndManager;
  forwardedRef?: any;
  onStart?: DndHandle; // 拖拽开始触发的函数
  onMove?: DndHandle; // 拖拽进行中触发的函数
  onEnd?: DndHandle; // 拖拽结束函数
  onAdd?: DndHandle; // 当前容器添加新元素触发的函数
  onUpdate?: DndHandle; // 当前容器排序触发的函数
  onHover?: (over: HTMLElement) => void; // 被hover的子元素触发的事件
  onUnHover?: (over: HTMLElement) => void; // 元素失去hover状态时触发的事件
  collection?: any; // 收集额外信息字段
  // 拖拽相关的配置
  options?: {
    handle?: string; // 拖拽句柄
    filter?: string; // 过滤句柄的选择器
    hiddenFrom?: UnionCondition; // 拖拽时隐藏拖拽源
    disabledDrop?: UnionCondition; // 是否允许拖放新元素
    disabledSort?: UnionCondition; // 是否允许动态插入
    disabledDrag?: UnionCondition; // 是否禁止拖拽
    direction?: string[]; // 允许拖拽的轴向
    sortPreClass?: string; // 元素往序号小的排序时添加的class
    sortNextClass?: string; // 元素往序号大的排序时添加的class
  }
}
