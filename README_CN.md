# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖拽能力的组件，包裹目标元素所在区域和目标元素而不影响元素的样式布局，可以通过组件提供的方法获取当前拖拽元素的位置和被覆盖的目标元素元素位置，改变`state`数据从而改变元素位置。

# 更新

为了更好的支持拖拽中的各种场景，架构设计进行了重新设计，新设计更简单的实现拖拽功能，请使用旧版本的及时更新到`1.0.0`版本。

# features
组件包括三个部分：`DndContextProvider`组件, `DndArea`组件和`DndArea.Item`组件。
- `DndContextProvider`组件：提供三个拖拽的回调函数，用来修改拖拽后的状态, 根据拖拽回调函数参数中的`source`(拖拽源)和`target`(放置目标)来判断是否是同一区域内的拖拽。
- `DndArea`组件：提供可拖放的区域，拖拽行为在里面进行。支持不同的`DndArea`之间相互跨域拖拽
- `DndArea.Item`组件：包裹需要拖拽的元素，使其可被拖放。注意此组件必须赋予唯一`id`;

### 快速安装
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import DndArea, { DndContextProvider, arrayMove, isObjectEqual, DragMoveHandle } from "react-dragger-sort";

export const Example = () => {

  const [arr1, setArr1] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [arr2, setArr2] = useState([8, 9, 10, 11, 12, 13, 14]);

  const onDragEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    if (!source.area || !target.area) return;
    const sourceItem = source.item;
    const targetItem = target.item;
    const list = [{ data: arr1, setData: setArr1 }, { data: arr2, setData: setArr2 }];
    // Drag and drop within the same area
    if (source.area === target.area) {
      list?.map((listItem) => {
        const { data, setData } = listItem;
        if (isObjectEqual(data, source.collect)) {
          const preIndex = data?.findIndex((item) => item === sourceItem.id);
          const nextIndex = targetItem ? data?.findIndex((item) => item === targetItem?.id) : data.length;
          if (preIndex >= 0 && nextIndex >= 0) {
            const newArr = arrayMove(data, preIndex, nextIndex);
            setData(newArr);
          }
        }
      });
      // Drag and drop within the diffrent area
    } else {
      list?.map((listItem) => {
        const { data, setData } = listItem;
        // remove
        if (isObjectEqual(data, source.collect)) {
          const cloneData = [...data];
          const index = data?.findIndex((item) => item === sourceItem?.id);
          cloneData?.splice(index, 1);
          setData(cloneData);
        }
        // add
        if (isObjectEqual(data, target.collect)) {
          const cloneData = [...data];
          const sourceData = source.collect as any[];
          const sourceIndex = sourceData?.findIndex((item) => item === sourceItem?.id);
          const nextIndex = targetItem ? data?.findIndex((item) => item === targetItem?.id) : data?.length;
          if (sourceIndex >= 0 && nextIndex >= 0) {
            cloneData?.splice(nextIndex + 1, 0, sourceData?.[sourceIndex]);
            setData(cloneData);
          }
        }
      });
    }
  };

    return (
      <DndContextProvider onDragEnd={onDragEnd}>
        <DndArea collect={arr1} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }}>
          {
            arr1?.map((item, index) => {
              return (
                <DndArea.Item style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} id={item}>
                  <div>
                    {item}
                  </div>
                </DndArea.Item>
              );
            })
          }
        </DndArea>
        <div style={{ marginTop: '10px' }}>
          <DndArea collect={arr2} style={{ display: 'flex', flexWrap: 'wrap', background: 'green', width: '200px' }}>
            {
              arr2?.map((item, index) => {
                return (
                  <DndArea.Item style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} id={item}>
                    <div>
                      {item}
                    </div>
                  </DndArea.Item>
                );
              })
            }
          </DndArea>
        </div>
      </DndContextProvider>
    )
}
```

## DndContextProvider

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | 拖拽开始时触发的函数                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | 拖拽时触发的函数                                                                                  |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | 拖拽结束时触发的函数                                                                                  |

## DndArea

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| collect                      | `unknown`            | -                                                  | 拖传递给拖拽区域内部的参数                                                                                  |

## DndArea.Item

来自[react-free-draggable](https://github.com/mezhanglei/react-free-draggable)
