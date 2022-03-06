# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-1.1.1-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖拽能力的组件，包裹目标元素所在区域和目标元素而不影响元素的样式布局，只提供拖拽能力和回调函数，拖拽结果需要自己去实现具体数据更改。

# 更新

为了更好的支持拖拽中的各种场景，架构设计进行了重新设计，新设计更简单的实现拖拽功能，请使用旧版本的及时更新到`1.x`版本。

# features
组件包括三个部分：`DndContextProvider`组件, `DndArea`组件和`DndArea.Item`组件。
- `DndContextProvider`组件：提供三个拖拽的回调函数，用来修改拖拽后的状态, 根据拖拽回调函数参数中的`source`(拖拽源)和`target`(放置目标)来判断是否是同一区域内的拖拽。
- `DndArea`组件：提供可拖放的区域，拖拽行为在里面进行。支持不同的`DndArea`之间相互跨域拖拽，同时也支持不同的`DndArea`嵌套。注意此组件必须赋予`id`;
- `DndArea.Item`组件：包裹需要拖拽的元素，使其可被拖放。注意此组件必须赋予`id`;

### 快速安装
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import DndArea, { DndContextProvider, arrayMove, deepSet, DragMoveHandle } from "react-dragger-sort";

export const Example = () => {

  const [data, setData] = useState([
    { list: [1, 2, 3, 4, 5, 6, 7], backgroundColor: 'blue' },
    { list: [8, 9, 10, 11, 12, 13, 14], backgroundColor: 'green' }
  ]);

  const onDragEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!source.area || !target?.area || !targetItem) return;
    let sourceCollect = source?.collect as any;
    const preIndex = sourceItem.path?.split('.')?.pop();
    const nextIndex = targetItem.path?.split('.')?.pop();
    const sourceDataPath = source.path;
    if (preIndex !== undefined && nextIndex !== undefined) {
      const newItem = arrayMove(sourceCollect, Number(preIndex), Number(nextIndex));
      const newData = deepSet(data, sourceDataPath, newItem);
      setData(newData);
    }
  };

  const onAreaDropEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!source.area || !target?.area) return;
    let sourceCollect = source?.collect as any;
    let targetCollect = target?.collect as any;
    const sourceIndex = sourceItem.path && Number(sourceItem.path?.split('.')?.pop());
    const sourceDataPath = source.path;
    const targetIndex = targetItem ? targetItem.path && Number(targetItem?.path?.split('.')?.pop()) : targetCollect?.length;
    const targetDataPath = target.path;
    if (sourceIndex >= 0 && targetIndex >= 0) {
      targetCollect?.splice(targetIndex + 1, 0, sourceCollect?.[sourceIndex]);
      sourceCollect?.splice(sourceIndex, 1);
      // remove
      const tmp = deepSet(data, sourceDataPath, sourceCollect);
      // add
      const newData = deepSet(tmp, targetDataPath, targetCollect);
      setData(newData);
    }
  }

  const renderChildren = (list: any[]) => {
    return list?.map((areaItem, areaIndex) => {
      return (
        <DndArea key={areaIndex} collect={areaItem?.list} id={`${areaIndex}.list`} style={{ display: 'flex', flexWrap: 'wrap', background: areaItem.backgroundColor, width: '200px', marginTop: '10px' }}>
          {
            areaItem?.list?.map((item, index) => {
              return (
                <DndArea.Item style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} id={index}>
                  <div>
                    {item}
                  </div>
                </DndArea.Item>
              );
            })
          }
        </DndArea>
      )
    })
  }

    return (
      <DndContextProvider onDragEnd={onDragEnd} onAreaDropEnd={onAreaDropEnd}>
        {renderChildren(data)}
      </DndContextProvider>
    )
}
```

## DndContextProvider

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | 同区域拖拽开始时触发的函数                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | 同区域拖拽时触发的函数                                                                                  |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | 同区域拖拽结束时触发的函数                                                                                  |
| onAreaDropping                      | `({e, source, target}) => void`            | -                                                  | 跨区域拖拽时触发的函数                                                                                  |
| onAreaDropEnd                      | `({e, source, target}) => void`            | -                                                  | 跨区域拖拽结束时触发的函数                                                                                  |

## DndArea

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| collect                      | `unknown`            | -                                                  | 拖传递给拖拽区域内部的参数                                                                                  |

## DndArea.Item

- 基本属性：来自[react-free-draggable](https://github.com/mezhanglei/react-free-draggable)
- `id`：必填参数，标记节点。
