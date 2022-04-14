# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-2.0.1-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

Components that provide drag-and-drop containers and drag-and-drop capabilities, with the drag-and-drop results requiring you to change the `state` data yourself.

# version update

The architecture design has been redesigned to better support various scenarios in drag and drop. The new design is simpler to implement the drag and drop function, please update to `2.x` version in time with the old version.

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
import DndSortable, { arrayMove, Dndprops } from "react-dragger-sort";
import { klona } from 'klona';

export const Example = () => {

  const [data, setData] = useState([
    { backgroundColor: 'blue', children: [{ label: 1, backgroundColor: 'green', children: [{ label: 1 }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] },
    { backgroundColor: 'green', children: [{ label: 6 }, { label: 7 }, { label: 8 }, { label: 9 }, { label: 10 }] },
    { backgroundColor: 'green', children: [{ label: 11 }, { label: 12 }, { label: 13 }, { label: 14 }, { label: 15 }] }
  ]);

  const indexToArray = (pathStr?: string) => pathStr ? `${pathStr}`.split('.').map(n => +n) : [];

  const setChildren = (treeData: any, data: any, pathStr?: string) => {
    const pathArr = indexToArray(pathStr);
    treeData = klona(treeData);
    let parent: any;
    pathArr.forEach((item, index) => {
      if (index == 0) {
        parent = treeData[item];
      } else {
        parent = parent.children[item];
      }
    });
    parent.children = data;
    return treeData;
  };

  // 添加新元素(有副作用，会改变传入的data数据)
  const addDragItem = (data: any[], dragItem: any, dropIndex?: number, groupPath?: string) => {
    const dropContainer = groupPath ? getItem(data, groupPath) : data;
    const item = dragItem instanceof Array ? { children: dragItem } : dragItem;
    // 插入
    if (dropIndex) {
      dropContainer?.splice(dropIndex, 0, item);
      // 末尾添加
    } else {
      dropContainer?.push(item);
    }
    return data;
  };

  // 移除拖拽元素(有副作用, 会改变传入的data数据)
  const removeDragItem = (data: any[], dragIndex: number, groupPath?: string) => {
    const dragContainer = groupPath ? getItem(data, groupPath) : data;
    dragContainer?.splice(dragIndex, 1);
    return data;
  };

  // 根据路径获取指定路径的元素
  const getItem = (data: any[], path?: string) => {
    const pathArr = indexToArray(path);
    // 嵌套节点删除
    let temp: any;
    if (pathArr.length === 0) {
      return data;
    }
    pathArr.forEach((item, index) => {
      if (index === 0) {
        temp = data[item];
      } else {
        temp = temp?.children?.[item];
      }
    });
    if (temp.children) return temp.children;
    return temp;
  };

  const onUpdate: DndProps['onUpdate'] = (params) => {
    const { drag, drop } = params;
    console.log(params, '同区域');
    const dragIndex = drag?.index;
    const dropIndex = drop?.dropIndex;
    const parentPath = drag?.groupPath;
    let parent = parentPath ? getItem(data, parentPath) : data;
    parent = arrayMove(parent, Number(dragIndex), Number(dropIndex));
    const newData = parentPath ? setChildren(data, parent, parentPath) : parent;
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
    const dropIndex = drop?.dropIndex;
    const dropPath = drop?.path;
    const dragIndexPathArr = indexToArray(dragPath);
    const dropIndexPathArr = indexToArray(dropPath || dropGroupPath);
    // 先计算内部的变动，再计算外部的变动
    if (dragIndexPathArr?.length > dropIndexPathArr?.length || !dropIndexPathArr?.length) {
      // 减去拖拽的元素
      const removeData = removeDragItem(cloneData, dragIndex, dragGroupPath);
      // 添加新元素
      const addAfterData = addDragItem(removeData, dragItem, dropIndex, dropGroupPath);
      setData(addAfterData);
    } else {
      // 添加新元素
      const addAfterData = addDragItem(cloneData, dragItem, dropIndex, dropGroupPath);
      // 减去拖拽的元素
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
| options                           | -            | -                                                  |  Configuration of drag and drop                                                                                 |

### options

- `groupPath`: string The path of the drag container, used to mark the position `Optional`.
- `handle`: string | HTMLElement Drag and drop handle `optional`.
- `filter`: string | HTMLElement Selector for filtering handles `optional`.
- `allowDrop`: boolean Whether to allow dragging and dropping of new elements, `must`.
- `allowSort`: boolean Whether or not dynamic insertion sorting is allowed, `optional`.
- `childDrag`: boolean | (HTMLElement | string)[]; Whether child elements are allowed to be dragged or allowed to be dragged `must`.
- `direction`: [`vertical`, `horizontal`] the axial direction to allow dragging, `optional`.
- `sortSmallClass`: string The class to add when the element is sorted towards a smaller ordinal number, `optional`.
- `sortBigClass`: string The class to add when the element is sorted towards a larger ordinal number, `optional`.
