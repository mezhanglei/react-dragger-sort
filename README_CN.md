# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-0.1.3-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖拽能力的组件，包裹目标元素所在区域和目标元素而不影响元素的样式布局，可以通过组件提供的方法获取当前拖拽元素的位置和被覆盖的目标元素元素位置，改变`state`数据从而改变元素位置。

# features

- [x] 通过`DraggableArea`组件创建拖拽区域，`DraggerItem`组件赋予子元素拖拽能力，不改变元素的原有样式
- [x] 通过`DraggableAreaGroup`类组件可以创建多个`DraggableArea`组件，不同的区域之间也可以进行拖拽，实现跨区域拖拽很简单。
- [x] 拖拽排序实现结果完全依赖外部的`state`数据源。
- [x] 提供了`onDragMove`事件，可以依赖这个事件来对特定场景进行定制的dom操作动画.

# 注意事项

1. 子元素不能为行内(inline)类型元素,因为transform对行内元素无效!
2. `DraggerItem`组件必须赋予唯一`id`;

### 快速安装
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### 同区域内的拖拽排序示例
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";

export const Example = () => {

  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);

   const onDragMoveEnd: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            const preIndex = arr?.findIndex((item) => item === tag?.id);
            const nextIndex = arr?.findIndex((item) => item === coverChild?.id)
            const newArr = arrayMove(arr, preIndex, nextIndex);
            setArr(newArr);
        }
    }

    return (<DraggableArea className="flex-box" onDragMoveEnd={onDragMoveEnd}>
        {
            arr?.map((item, index) => {
                return (
                    <DraggerItem className="drag-a" key={item} id={item}>
                        <div>
                            DraggerItem{item}
                        </div>
                    </DraggerItem>
                )
            })
        }
    </DraggableArea>)
}
```
### 不同区域跨区域的拖拽排序示例
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

export const Example = () => {

   const [arr1, setArr1] = useState([1, 2, 3, 4, 5, 6, 7]);
   const [arr2, setArr2] = useState([8, 9, 10, 11, 12, 13, 14]);

    const onDragMoveEnd1: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            const preIndex = arr1?.findIndex((item) => item === tag?.id);
            const nextIndex = arr1?.findIndex((item) => item === coverChild?.id)
            const newArr = arrayMove(arr1, preIndex, nextIndex);
            setArr1(newArr);
        }
    }

    const onDragMoveEnd2: DragMoveHandle = (tag, coverChild, e) => {
        if (tag && coverChild) {
            const preIndex = arr2?.findIndex((item) => item === tag?.id);
            const nextIndex = arr2?.findIndex((item) => item === coverChild?.id)
            const newArr = arrayMove(arr2, preIndex, nextIndex);
            setArr2(newArr);
        }
    }

    const onMoveOutChange = (data) => {
        if (data) {
            const newArr1 = [...arr1];
            const index = arr1?.findIndex((item) => item === data?.moveTag?.id)
            newArr1?.splice(index, 1)
            setArr1(newArr1);
        }
    }

    const onMoveInChange = (data) => {
        if (data) {
            const newArr2 = [...arr2];
            const index = arr1?.findIndex((item) => item === data?.moveTag?.id);
            const nextIndex = newArr2?.findIndex((item) => item === data?.coverChild?.id);
            newArr2?.splice(nextIndex, 0, arr1?.[index]);
            setArr2(newArr2);
        }
    }

    return (
        <>
            <DraggableArea1 onMoveOutChange={onMoveOutChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd1}>
                {
                    arr1?.map((item, index) => {
                        return (
                            <DraggerItem style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} id={item}>
                                <div>
                                    大小拖放{item}
                                </div>
                            </DraggerItem>
                        )
                    })
                }
            </DraggableArea1>
            <div style={{ marginTop: '10px' }}>
                <DraggableArea2 onMoveInChange={onMoveInChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd2}>
                    {
                        arr2?.map((item, index) => {
                            return (
                                <DraggerItem style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} id={item}>
                                    <div>
                                        大小拖放{item}
                                    </div>
                                </DraggerItem>
                            )
                        })
                    }
                </DraggableArea2>
            </div>
        </>
    );
}
```

## DraggableArea组件属性说明

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragMove                      | `(tag: TagInterface, coverChild?: ChildTypes, e?: EventType) => void`            | -                                                  | 容器内拖拽时触发的函数                                                                                  |
| onDragMoveEnd                      | `(tag: TagInterface, coverChild?: ChildTypes, e?: EventType) => void`            | -                                                  | 容器内拖拽结束时触发的函数                                                                                  |
| onMoveOutChange                      | `(triggerInfo: TriggerInfo) => void`            | -                                                  | 跨容器拖出子元素到另外一个容器触发的函数，用来跨区域拖拽                                                                                  |
| onMoveInChange                      | `(triggerInfo: TriggerInfo) => void`            | -                                                  | 跨容器别的容器拖拽进当前容器触发的函数，用来跨区域拖拽                                                                                  |
## DraggerItem组件属性说明

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| dragAxis                      | `['x', 'y']`            | -                                                  | 拖拽轴向                                                                                  |
| resizeAxis                      | `['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']`            | `[]`                                                  | 拖拽缩放方位                                                                                  |
| handle                      | `string / HTMLElement`            | -                                                  | 拖拽句柄                                                                                  |
| id                      | `string / number`            | -                                                  | 当前确定的唯一身份                                                                                  |
| onDragStart                   | `function`                        | -                                                  | 拖拽开始事件                                                                                           |
| onDrag                        | `function`                        | -                                                  | 拖拽进行事件                      |
| onDragEnd                    | `function`                        | -                                                  | 拖拽结束事件                                                                                  |
| onResizeStart                 | `function`                        | -                                                  | 拖拽缩放开始事件,renturn `false` 可以阻止该事件;                                                                                          |
| onResizing                | `function`                        | -                                                  | 拖拽缩放进行事件,renturn `false` 可以阻止该事件;                      |
| onResizeEnd                   | `function`                        | -                                                  | 拖拽缩放结束事件,renturn `false` 可以阻止该事件;                                                                                  |






