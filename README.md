# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-2.2.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

Components that provide drag-and-drop containers and drag-and-drop capabilities, with the drag-and-drop results requiring you to change the `state` data yourself.

# version update
- version2.x
  - change drag and drop callback params

# features
- Drag-and-drop containers are provided, and child elements (direct children, excluding grandchildren) of the containers have drag-and-drop capability.
- Different containers support nesting within each other and cross-domain drag-and-drop operations are possible for different containers.
- The drag and drop behaviour of a container can be controlled by configuring properties to the container.
- When nesting different containers, note that the `groupPath` of the container is set to mark the position of the container.

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import DndSortable, { arraySwap, Dndprops } from "react-dragger-sort";
import { klona } from 'klona';

export const Example = () => {

  const [data, setData] = useState([
    { backgroundColor: 'blue', children: [{ label: 1, backgroundColor: 'green', children: [{ label: 1 }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] },
    { backgroundColor: 'green', children: [{ label: 6 }, { label: 7 }, { label: 8 }, { label: 9 }, { label: 10 }] },
    { backgroundColor: 'green', children: [{ label: 11 }, { label: 12 }, { label: 13 }, { label: 14 }, { label: 15 }] }
  ]);

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
    const { drag, drop } = params;
    console.log(params, '同区域');
    const dragIndex = drag?.index;
    let dropIndex = drop?.index;
    const parentPath = drag?.groupPath;
    const cloneData = klona(data);
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
    setData(newData);
  };

  // 先计算内层的数据再计算外层的数据
  const onAdd: DndProps['onAdd'] = (params) => {
    const { drag, drop } = params;
    console.log(params, '跨区域');
    const cloneData = klona(data);
    // 拖拽区域信息
    const dragGroupPath = drag.groupPath;
    const dragIndex = drag?.index;
    const dragPath = drag?.path;
    const dragItem = getItem(cloneData, dragPath);
    // 拖放区域的信息
    const dropGroupPath = drop.groupPath;
    const dropIndex = drop?.index;
    const dragIndexPathArr = indexToArray(dragGroupPath);
    const dropIndexPathArr = indexToArray(dropGroupPath);
    // 先计算内部的变动，再计算外部的变动
    if (dragIndexPathArr?.length > dropIndexPathArr?.length || !dropIndexPathArr?.length) {
      const removeData = removeDragItem(cloneData, dragIndex, dragGroupPath);
      const addAfterData = addDragItem(removeData, dragItem, dropIndex, dropGroupPath);
      setData(addAfterData);
    } else {
      const addAfterData = addDragItem(cloneData, dragItem, dropIndex, dropGroupPath);
      const newData = removeDragItem(addAfterData, dragIndex, dragGroupPath);
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
| onStart                      | `({e, source }) => void`            | -                                                  | when drag start                                                                                  |
| onMove                      | `({e, drag, drop}) => void`            | -                                                  | when drag ging                                                                                 |
| onEnd                      | `({e, drag, drop}) => void`| -                                                  | when drag end                                                                                 |
| onUpdate                      | `({e, drag, drop}) => void`            | -                                                  | End of drag and drop trigger in current area                                                                                  |
| onAdd                      | `({e, drag, drop}) => void`            | -                                                  | End trigger when a new element is added to the current area                                                                                  |
| onHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when an immediate sortable child element is hovered                                                                                  |
| onUnHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when the previous hover child element is moved away                                                                                  |
| options                           | -            | -                                                  |  Configuration of drag and drop                                                                                 |

### options

- `groupPath`: `string` The path of the drag container, used to mark the position `Optional`.
- `handle`: `string | HTMLElement` Drag and drop handle `optional`.
- `filter`: `string | HTMLElement` Selector for filtering handles `optional`.
- `allowDrop`: `boolean | ((params: DndMoveParams, options: DndProps['options']) => boolean);` Whether to allow dragging and dropping of new elements, `must`.
- `allowSort`: `boolean | ((params: DndMoveParams, options: DndProps['options']) => boolean);` Whether or not dynamic insertion sorting is allowed, `optional`.
- `childDrag`: `boolean | (HTMLElement | string)[] | ((el: HTMLElement, options: DndProps['options']) => boolean)`; Whether child elements are allowed to be dragged or allowed to be dragged `must`.
- `direction`: [`vertical`, `horizontal`] the axial direction to allow dragging, `optional`.
- `sortPreClass`: `string` The class to add when the element is sorted towards a smaller ordinal number, `optional`.
- `sortNextClass`: `string` The class to add when the element is sorted towards a larger ordinal number, `optional`.
