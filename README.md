# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.3.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

A component that provides a drag container and drag capability and no affect for `style`, wrapping the area where the target element is located and the target element, can get the position of the current drag element and the position of the element of the target element being covered by the methods provided by the component, changing the `state` data and thus the position of the element.

# featrues

- The `DraggableArea` component creates the drag and drop area and the `DraggerItem` component gives the child element the ability to drag and drop without changing the original style of the element
- The `DraggableAreaGroup` class component makes it possible to create multiple `DraggableArea`, and drag and drop between different areas, making cross-area dragging simple.
- The drag and drop sort implementation results in a complete dependency on the external `state` data source.

# Matters

1. The child element cannot be an inline element because transform does not work on inline elements!
2. The `DraggerItem` component must be given a unique `id`

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### Example for Drag-and-drop sorting the same area
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";

export const Example = () => {

   const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);

   const onDragMoveEnd1: DragMoveHandle = ({ target, collision }) => {
      if (target && collision) {
        const preIndex = arr?.findIndex((item) => item === target?.id);
        const nextIndex = arr?.findIndex((item) => item === collision?.id)
        const newArr = arrayMove(arr, preIndex, nextIndex);
        setArr(newArr);
      }
    };

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
### Example for Drag-and-drop sorting across different regions
```javascript
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "react-dragger-sort";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

export const Example = () => {

   const [arr1, setArr1] = useState([1, 2, 3, 4, 5, 6, 7]);
   const [arr2, setArr2] = useState([8, 9, 10, 11, 12, 13, 14]);

   const onDragMoveEnd1: DragMoveHandle = ({ target, collision }) => {
      if (target && collision) {
        const preIndex = arr1?.findIndex((item) => item === target?.id);
        const nextIndex = arr1?.findIndex((item) => item === collision?.id)
        const newArr = arrayMove(arr1, preIndex, nextIndex);
        setArr1(newArr);
      }
    };

    const onDragMoveEnd2: DragMoveHandle = ({ target, collision }) => {
       if (target && collision) {
         const preIndex = arr2?.findIndex((item) => item === target?.id);
         const nextIndex = arr2?.findIndex((item) => item === collision?.id)
         const newArr = arrayMove(arr2, preIndex, nextIndex);
         setArr2(newArr);
       }
    };

    const onMoveOutChange1 = (data) => {
       if (data) {
         const newArr1 = [...arr1];
         const index = arr1?.findIndex((item) => item === data?.target?.id);
         newArr1?.splice(index, 1)
         setArr1(newArr1);
       }
    };

    const onMoveInChange1 = (data) => {
       if (data) {
         const newArr1 = [...arr1];
         const preIndex = arr2?.findIndex((item) => item === data?.target?.id);
         const nextIndex = newArr1?.findIndex((item) => item === data?.collision?.id);
         newArr1?.splice(nextIndex + 1, 0, arr2?.[preIndex]);
         setArr1(newArr1);
       }
    };

    const onMoveInChange2 = (data) => {
       if (data) {
         const newArr2 = [...arr2];
         const index = arr1?.findIndex((item) => item === data?.target?.id);
         const nextIndex = newArr2?.findIndex((item) => item === data?.collision?.id);
         newArr2?.splice(nextIndex + 1, 0, arr1?.[index]);
         setArr2(newArr2);
       }
    };

    const onMoveOutChange2 = (data) => {
       if (data) {
         const newArr2 = [...arr2];
         const index = arr2?.findIndex((item) => item === data?.target?.id);
         newArr2?.splice(index, 1)
         setArr2(newArr2);
       }
    };

    return (
        <>
            <DraggableArea1 onMoveInChange={onMoveInChange1} onMoveOutChange={onMoveOutChange1} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd1}>
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
              <DraggableArea2 onMoveInChange={onMoveInChange2} onMoveOutChange={onMoveOutChange2} style={{ display: 'flex', flexWrap: 'wrap', background: 'green', width: '200px' }} onDragMoveEnd=      {onDragMoveEnd2}>
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

## DraggableArea Component Attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragMoveStart                      | `({e,area,target, collision}) => void`            | -                                                  | when drag start in `DraggableArea`                                                                                  |
| onDragMove                      | `({e,area,target, collision}) => void`            | -                                                  | when draggring in `DraggableArea`                                                                                  |
| onDragMoveEnd                      | `({e,area,target, collision}) => void`            | -                                                  | when drag end in `DraggableArea`                                                                                  |
| onMoveOutChange                      | `({e,area,target, collision}) => void`            | -                                                  | A function triggered by dragging a child element across a container to another container, used to drag across regions                                                                                  |
| onMoveInChange                      | `({e,area,target, collision}) => void`            | -                                                  | Cross-container drag-and-drop function triggered by another container into the current container, used for cross-region drag-and-drop                                                                                  |
## DraggerItem Component Attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| dragAxis                      | `['x', 'y']`            | -                                                  | drag axis                                                                                  |
| handle                      | `string / HTMLElement`            | -                                                  | Drag handles                                                                                  |
| id                      | `string / number`            | -                                                  | Currently identified as unique                                                                                  |
| onDragStart                   | `function`                        | -                                                  | drag start                                                                                           |
| onDrag                        | `function`                        | -                                                  | draging                      |
| onDragEnd                    | `function`                        | -                                                  | drag end                                                                                  |