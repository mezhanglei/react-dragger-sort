# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-1.2.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖拽能力的组件，包裹目标元素所在区域和目标元素而不影响元素的样式布局，只提供拖拽能力和回调函数，拖拽结果需要自己去实现具体数据更改。

# 更新

为了更好的支持拖拽中的各种场景，架构设计进行了重新设计，新设计更简单的实现拖拽功能，请使用旧版本的及时更新到`1.x`版本。

# features
- 提供回调函数，用来修改拖拽后的状态，注意`path`属性提供位置标记
- 支持相互嵌套，进行跨域拖拽操作。

### 快速安装
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

## 属性

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | 同区域拖拽开始时触发的函数                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | 同区域拖拽时触发的函数                                                                                  |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | 同区域拖拽结束时触发的函数                                                                                  |
| onMoveIn                      | `({e, source, target}) => void`            | -                                                  | 跨区域拖拽时触发的函数                                                                                  |
| onMoveInEnd                      | `({e, source, target}) => void`            | -                                                  | 跨区域拖拽结束时触发的函数                                                                                  |
| path                      | `string`            | -                                                  |  标记目标的路径                                                                                 |
