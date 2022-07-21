# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-3.0.7-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

Components that provide drag-and-drop containers and drag-and-drop capabilities, with the drag-and-drop results requiring you to change the `state` data yourself.

# version update
- version3.x
  - Add the `options` configuration attribute `childOut`, which sets the conditions for child elements to be dragged out
  - Adjust the `options` configuration attribute `childDrag`.
  - change drag and drop callback params

# features
- Drag-and-drop containers are provided, and child elements (direct children, excluding grandchildren) of the containers have drag-and-drop capability.
- Different containers support nesting within each other and cross-domain drag-and-drop operations are possible for different containers.
- The drag and drop behaviour of a container can be controlled by configuring properties to the container.
- When different containers, note that the `groupPath` of the container is set to mark the position of the container.
- the child elements are marked by setting `data-id`, the default is the current order number.

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import React, { useRef } from 'react';
import DndSortable, { arraySwap, Dndprops, deepClone } from "react-dragger-sort";

export const Example = () => {

  const [data, setData] = useState([
    { backgroundColor: 'blue', children: [{ label: 1, backgroundColor: 'green', children: [{ label: 1 }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] },
    { backgroundColor: 'green', children: [{ label: 6 }, { label: 7 }, { label: 8 }, { label: 9 }, { label: 10 }] },
    { backgroundColor: 'green', children: [{ label: 11 }, { label: 12 }, { label: 13 }, { label: 14 }, { label: 15 }] }
  ]);
  const dataRef = useRef(data);

  const indexToArray = (pathStr?: string) => pathStr ? `${pathStr}`.split('.').map(n => +n) : [];

  const addDragItem = (data: any[], dragItem: any, dropIndex?: number, groupPath?: string) => {
    const parent = getItem(data, groupPath);
    const childs = groupPath ? parent?.children : data;
    const item = dragItem instanceof Array ? { children: dragItem } : dragItem;
    if (typeof dropIndex === 'number') {
      childs?.splice(dropIndex, 0, item);
    } else {
      childs?.push(item);
    }
    return data;
  };

  const removeDragItem = (data: any[], dragIndex: number, groupPath?: string) => {
    const parent = getItem(data, groupPath);
    const childs = groupPath ? parent?.children : data;
    childs?.splice(dragIndex, 1);
    return data;
  };

  const getItem = (data: any[], path?: string) => {
    const pathArr = indexToArray(path);
    let temp: any = data;
    if (pathArr.length === 0) {
      return temp;
    }
    pathArr.forEach((item, index) => {
      if (index === 0) {
        temp = temp[item];
      } else {
        temp = temp?.children?.[item];
      }
    });
    return temp;
  };

  const onUpdate: DndProps['onUpdate'] = (params) => {
    const { from, to } = params;
    console.log(params, '同区域');
    const dragIndex = from?.index;
    let dropIndex = to?.index;
    const parentPath = from?.groupPath;
    const cloneData = deepClone(dataRef.current);
    const parent = getItem(cloneData, parentPath);
    const childs = parentPath ? parent.children : cloneData;
    dropIndex = typeof dropIndex === 'number' ? dropIndex : childs?.length;
    const swapResult = arraySwap(childs, Number(dragIndex), Number(dropIndex));
    let newData;
    if (parentPath) {
      parent.children = swapResult;
      newData = cloneData;
    } else {
      newData = swapResult;
    }
    dataRef.current = newData;
    setData(newData);
  };

  // 先计算内层的数据再计算外层的数据
  const onAdd: DndProps['onAdd'] = (params) => {
    const { from, to } = params;
    console.log(params, '跨区域');
    const cloneData = deepClone(dataRef.current);
    // 拖拽区域信息
    const dragGroupPath = from.groupPath;
    const dragIndex = from?.index;
    const dragPath = from?.path;
    const dragItem = getItem(cloneData, dragPath);
    // 拖放区域的信息
    const dropGroupPath = to.groupPath;
    const dropIndex = to?.index;
    const dragIndexPathArr = indexToArray(dragGroupPath);
    const dropIndexPathArr = indexToArray(dropGroupPath);
    // 先计算内部的变动，再计算外部的变动
    if (dragIndexPathArr?.length > dropIndexPathArr?.length || !dropIndexPathArr?.length) {
      const removeData = removeDragItem(cloneData, dragIndex, dragGroupPath);
      const addAfterData = addDragItem(removeData, dragItem, dropIndex, dropGroupPath);
      dataRef.current = addAfterData
      setData(addAfterData);
    } else {
      const addAfterData = addDragItem(cloneData, dragItem, dropIndex, dropGroupPath);
      const newData = removeDragItem(addAfterData, dragIndex, dragGroupPath);
      dataRef.current = newData;
      setData(newData);
    }
  };

  const loopChildren = (arr: any[], parent?: string) => {
    return arr.map((item, index) => {
      const path = parent === undefined ? String(index) : `${parent}.${index}`;
      if (item.children) {
        return (
          <div key={index}>
            <DndSortable
              options={{
                groupPath: path,
                childDrag: true,
                allowDrop: true,
                allowSort: true
              }}
              style={{ display: 'flex', flexWrap: 'wrap', background: item.backgroundColor, width: '200px', marginTop: '10px' }}
              onUpdate={onUpdate}
              onAdd={onAdd}
            >
              {loopChildren(item.children, path)}
            </DndSortable>
          </div>
        );
      }
      return (<div style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={path}>{item.label}</div>);
    });
  };

  return (
    <DndSortable
      onUpdate={onUpdate}
      onAdd={onAdd}
      options={{
        childDrag: true,
        allowDrop: true,
        allowSort: true
      }}>
      {loopChildren(data)}
    </DndSortable>
  );
}
```

## attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onStart                      | `({e, from }) => void`            | -                                                  | when drag start                                                                                  |
| onMove                      | `({e, from, to}) => void`            | -                                                  | when drag ging                                                                                 |
| onEnd                      | `({e, from, to}) => void`| -                                                  | when drag end                                                                                 |
| onUpdate                      | `({e, from, to}) => void`            | -                                                  | End of drag and drop trigger in current area                                                                                  |
| onAdd                      | `({e, from, to}) => void`            | -                                                  | End trigger when a new element is added to the current area                                                                                  |
| onHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when an immediate sortable child element is hovered                                                                                  |
| onUnHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when the previous hover child element is moved away                                                                                  |
| options                           | -            | -                                                  |  Configuration of drag and drop                                                                                 |

### options

- `groupPath`: `string` The path of the drag container, used to mark the position `Optional`.
- `handle`: `string | HTMLElement` Drag and drop handle `optional`.
- `filter`: `string | HTMLElement` Selector for filtering handles `optional`.
- `allowDrop`: `boolean | DndCondition` Whether to allow dragging and dropping of new elements, `must`.
- `allowSort`: `boolean | DndCondition` Whether or not dynamic insertion sorting is allowed, `optional`.
- `childOut`: `boolean | (HTMLElement | string)[] | DndCondition;` Whether the child element is allowed to be dragged out or the child element allowed to be dragged out `optional`.
- `childDrag`: `boolean | (HTMLElement | string)[] | ((fromItem: DragItem, options: DndProps['options']) => boolean)`; Whether child elements are allowed to be dragged or the child element allowed to be dragged `must`.
- `direction`: [`vertical`, `horizontal`] the axial direction to allow dragging, `optional`.
- `sortPreClass`: `string` The class to add when the element is sorted towards a smaller ordinal number, `optional`.
- `sortNextClass`: `string` The class to add when the element is sorted towards a larger ordinal number, `optional`.

```javascript
type DndCondition = (params: DndParams, options: DndProps['options']) => boolean;
```