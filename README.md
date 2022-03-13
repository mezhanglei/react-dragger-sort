# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.2.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

A component that provides a drag container and drag capability and no affect for `style`, wrapping the area where the target element is located and the target element, Only drag and drop capability and callback functions are provided, the drag and drop results need to be implemented by yourself for specific data changes.

# version update

The architecture design has been redesigned to better support various scenarios in drag and drop. The new design is simpler to implement the drag and drop function, please update to `1.x` version in time with the old version.

# features
- Provide callback functions to modify the state after dragging and dropping, note that the `path` attribute provides a location marker
- Supports inter-nesting for cross-domain drag-and-drop operations.

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import DndSortable, { arrayMove, DragMoveHandle } from "react-dragger-sort";
import { klona } from 'klona';

export const Example = () => {

  const [data, setData] = useState([
    { children: [{ children: [{ children: [1, 2, 3, 4, 5], backgroundColor: 'pink' }], backgroundColor: 'yellow' },], backgroundColor: 'blue' },
    { children: [8, 9, 10, 11, 12, 13, 14], backgroundColor: 'green' },
    { children: [15, 16, 17, 18, 19, 20, 21], backgroundColor: 'green' },
  ]);

  const indexToArray = (pathStr: string) => `${pathStr}`.split('.').map(n => +n);

  const getLastIndex = (pathStr: string) => {
    const array = indexToArray(pathStr);
    return (array.pop()) as number;
  };

  const getItem = (path: string, data: any) => {
    const arr = indexToArray(path);
    // 嵌套节点删除
    let parent: any;
    if (arr.length === 0) {
      return data;
    }
    arr.forEach((item, index) => {
      if (index === 0) {
        parent = data[item];
      } else {
        parent = parent?.children?.[item];
      }
    });
    if (parent.children) return parent.children;
    return parent;
  };

  const setInfo = (pathStr: string, treeData: any, data: any) => {
    const arr = indexToArray(pathStr);
    treeData = klona(treeData);
    let parent: any;
    arr.forEach((item, index) => {
      if (index == 0) {
        parent = treeData[item];
      } else {
        parent = parent.children[item];
      }
    });
    parent.children = data;
    return treeData;
  };

  const onDragEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!sourceItem || !targetItem) return;
    console.log(params, '同区域');
    const preIndex = getLastIndex(sourceItem.path);
    const nextIndex = getLastIndex(targetItem.path);
    const parentPath = source.path;
    let parent = parentPath ? getItem(parentPath, data) : data;
    if (preIndex !== undefined && nextIndex !== undefined) {
      parent = arrayMove(parent, Number(preIndex), Number(nextIndex));
      const newData = parentPath ? setInfo(parentPath, data, parent) : parent;
      setData(newData);
    }
  };

  const onMoveInEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!sourceItem || !targetItem) return;
    console.log(params, '跨区域');
    const sourceData = getItem(source.path, data);
    const targetData = getItem(target.path, data);
    const sourceIndex = getLastIndex(sourceItem.path);
    let targetIndex;
    if(targetItem.path && targetItem.path === target.path) {
      targetIndex = targetData?.length;
    } else {
      targetIndex = getLastIndex(targetItem.path);
    }
    if(sourceIndex >= 0 && targetIndex >= 0) {
      targetData?.splice(targetIndex + 1, 0, sourceData?.[sourceIndex]);
      sourceData?.splice(sourceIndex, 1);
      // add
      const afterAdd = setInfo(target.path, data, targetData);
      // remove
      const newData = setInfo(source.path, afterAdd, sourceData);
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
              style={{ display: 'flex', flexWrap: 'wrap', background: item.backgroundColor, width: '200px', marginTop: '10px' }}
              path={path}
              onDragEnd={onDragEnd}
              onMoveInEnd={onMoveInEnd}
            >
              {loopChildren(item.children, path)}
            </DndSortable>
          </div>
        );
      }
      return (
        <DndSortable style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} path={path}>
          <div>
            {item}
          </div>
        </DndSortable>
      );
    });
  };

  return (
    <DndSortable>
      {loopChildren(data)}
    </DndSortable>
  )
}
```

## attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | when drag start in the same area                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | when drag ging in the same area                                                                                 |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | when drag end in the same area                                                                                 |
| onMoveIn                      | `({e, source, target}) => void`            | -                                                  | triggered on cross-region dropping                                                                                  |
| onMoveInEnd                      | `({e, source, target}) => void`            | -                                                  | triggered on cross-region drog end                                                                                  |
| path                      | `string`            | -                                                  |  Marking the path of the target                                                                                 |