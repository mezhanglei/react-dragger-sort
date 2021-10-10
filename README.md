# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.0.4-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

A component that provides a drag container and drag capability, wrapping the area where the target element is located and the target element, can get the position of the current drag element and the position of the element of the target element being covered by the methods provided by the component, changing the `state` data and thus the position of the element.

# featrues

- [x] The `DraggableArea` component creates the drag and drop area and the `DraggerItem` component gives the child element the ability to drag and drop without changing the original style of the element
- [x] The `DraggableAreaGroup` class component makes it possible to create multiple `DraggableArea`, and drag and drop between different areas, making cross-area dragging simple.
- [x] The drag and drop sort implementation results in a complete dependency on the external `state` data source.
- [x] The `onDragMove` event is provided and can be relied upon to animate custom dom operations for specific scenes, no automatic sorting animation is provided at this time.

# Matters

1. The child element cannot be an inline element because transform does not work on inline elements!
2. For the reason of maximum freedom of design, it is temporarily impossible to achieve automatic sorting animation during dragging and dropping, if there is a relevant algorithm please provide it (support for lists, tree lists and other layout structures)
3. The `DraggerItem` component must be given a unique `id`

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### Example for Drag-and-drop sorting the same area
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";
import produce from "immer";

export const Example = () => {

   const [state, setState] = useState({ arr: [1, 2, 3, 4, 5, 6, 7] })

   const onDragMoveEnd: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            setState(state => {
                const preIndex = state?.arr?.findIndex((item) => item === tag?.id);
                const nextIndex = state?.arr?.findIndex((item) => item === coverChild?.id)
                const newArr = arrayMove(state?.arr, preIndex, nextIndex);
                return {
                    ...state,
                    arr: newArr
                }
            });
        }
    }

    return (<DraggableArea dataSource={state?.arr} className="flex-box" onDragMoveEnd={onDragMoveEnd}>
        {
            state?.arr?.map((item, index) => {
                return (
                    <DraggerItem resizeAxis='auto' className="drag-a" key={item} id={item}>
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
### Example for Drag-and-drop sorting across different regions
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";
import produce from "immer";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

export const Example = () => {

   const [state, setState] = useState({ arr1: [1, 2, 3, 4, 5, 6, 7], arr2: [8, 9, 10, 11, 12, 13, 14] })

    const onDragMoveEnd1: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            setState(state => {
                const preIndex = state?.arr1?.findIndex((item) => item === tag?.id);
                const nextIndex = state?.arr1?.findIndex((item) => item === coverChild?.id)
                const newArr = arrayMove(state?.arr1, preIndex, nextIndex);
                return {
                    ...state,
                    arr1: newArr
                }
            });
        }
    }

    const onDragMoveEnd2: DragMoveHandle = (tag, coverChild, e) => {

    }

    const onMoveOutChange = (data) => {
        if (data) {
            setState(state => {
                const newArr = produce(state?.arr1, draft => {
                    const index = draft?.findIndex((item) => item === data?.moveTag?.id)
                    draft?.splice(index, 1)
                });
                return {
                    ...state,
                    arr1: newArr
                }
            })
        }
    }

    const onMoveInChange = (data) => {
        if (data) {
            setState(state => {
                const newArr = produce(state?.arr2, draft => {
                    const index = state?.arr1?.findIndex((item) => item === data?.moveTag?.id);
                    const nextIndex = draft?.findIndex((item) => item === data?.coverChild?.id);
                    draft?.splice(nextIndex, 0, state?.arr1?.[index]);
                });
                return {
                    ...state,
                    arr2: newArr
                }
            })
        }
    }

    return (
        <>
            <DraggableArea1 dataSource={state?.arr1} onMoveOutChange={onMoveOutChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd1}>
                {
                    state?.arr1?.map((item, index) => {
                        return (
                            <DraggerItem style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} resizeAxis='auto' key={item} id={item}>
                                <div>
                                    大小拖放{item}
                                </div>
                            </DraggerItem>
                        )
                    })
                }
            </DraggableArea1>
            <div style={{ marginTop: '10px' }}>
                <DraggableArea2 dataSource={state?.arr2} onMoveInChange={onMoveInChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd2}>
                    {
                        state?.arr2?.map((item, index) => {
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

## DraggableArea Component Attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| dataSource                      | `any[]`            | -                                                  | data source                                                                                  |
| mounted                      | `(dataSource: any[]) => void`            | -                                                  | after mounted trigger                                                                                 |
| onDragMove                      | `(tag: TagInterface, coverChild?: ChildTypes, e?: EventType) => void`            | -                                                  | when draggring in `DraggableArea`                                                                                  |
| onDragMoveEnd                      | `(tag: TagInterface, coverChild?: ChildTypes, e?: EventType) => void`            | -                                                  | when drag end in `DraggableArea`                                                                                  |
| onMoveOutChange                      | `(triggerInfo: TriggerInfo) => void`            | -                                                  | A function triggered by dragging a child element across a container to another container, used to drag across regions                                                                                  |
| onMoveInChange                      | `(triggerInfo: TriggerInfo) => void`            | -                                                  | Cross-container drag-and-drop function triggered by another container into the current container, used for cross-region drag-and-drop                                                                                  |
## DraggerItem Component Attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| dragAxis                      | `x / y / both / none`            | `both`                                                  | drag axis                                                                                  |
| resizeAxis                      | `auto / x / y / angle / none`            | `none`                                                  | drag scaling position                                                                                  |
| dragNode                      | `string / HTMLElement`            | -                                                  | Drag handles                                                                                  |
| id                      | `string / number`            | -                                                  | Currently identified as unique                                                                                  |
| onDragStart                   | `function`                        | -                                                  | drag start                                                                                           |
| onDrag                        | `function`                        | -                                                  | draging                      |
| onDragEnd                    | `function`                        | -                                                  | drag end                                                                                  |
| onResizeStart                 | `function`                        | -                                                  | Drag scaling the start event,renturn `false` can stop it;                                                                                         |
| onResizing                | `function`                        | -                                                  | Drag scaling events, renturn `false` can stop it;                      |
| onResizeEnd                   | `function`                        | -                                                  | Drag scaling end the event,renturn `false` can stop it;                                                                                  |



