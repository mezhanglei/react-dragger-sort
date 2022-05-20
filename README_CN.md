# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-2.1.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖拽能力的组件，拖拽结果需要自己去更改`state`数据。

# 更新

为了更好的支持拖拽中的各种场景，架构设计进行了重新设计，新设计更简单的实现拖拽功能，请使用旧版本的及时更新到`2.x`版本。

# features
- 提供拖拽容器，容器的子元素(直接子元素，不包括孙元素)则据有拖拽能力。
- 不同的容器支持相互嵌套，并且不同容器可进行跨域拖放操作。
- 通过给容器配置属性，可以控制容器的拖放行为。
- 当不同容器嵌套时，注意设置容器的`groupPath`用来标记容器的位置

### 快速安装
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
    if (typeof dropIndex === 'number') {
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
    parent = arraySwap(parent, Number(dragIndex), Number(dropIndex));
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

## 属性

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onStart                      | `({e, drag }) => void`            | -                                                  | 拖拽开始时触发的函数                                                                                  |
| onMove                      | `({e, drag, drop}) => void`            | -                                                  | 拖拽时触发的函数                                                                                  |
| onEnd                      | `({e, drag, drop}) => void`            | -                                                  | 拖拽结束时触发的函数                                                                                  |
| onUpdate                      | `({e, drag, drop}) => void`            | -                                                  | 当前区域内排序结束触发                                                                                  |
| onAdd                      | `({e, drag, drop}) => void`            | -                                                  | 当前区域内添加新元素时结束触发                                                                                  |
| onHover                      | `(item: HTMLElement) => void`            | -                                                  | 直属可排序子元素被hover时触发                                                                                  |
| onUnHover                      | `(item: HTMLElement) => void`            | -                                                  | 上子元素失去hover时触发                                                                                  |
| options                      | -            | -                                                  |  拖放的配置                                                                                 |

### options

- `groupPath`: string 拖拽容器的路径, 用来标记位置 `可选`。
- `handle`: string | HTMLElement 拖拽句柄 `可选`。
- `filter`: string | HTMLElement 过滤句柄的选择器 `可选`。
- `allowDrop`: boolean 是否允许拖放新元素，`必选`。
- `allowSort`: boolean 是否可以动态插入排序，`可选`。
- `childDrag`: boolean | (HTMLElement | string)[]; 子元素是否允许拖拽或者允许拖拽的子元素 `必选`。
- `direction`: [`vertical`, `horizontal`]允许拖拽的轴向，`可选`。
- `sortPreClass`: string 元素往序号小的排序时添加的class，`可选`。
- `sortNextClass`: string 元素往序号大的排序时添加的class，`可选`。
