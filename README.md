# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

A component that provides a drag container and drag capability and no affect for `style`, wrapping the area where the target element is located and the target element, can get the position of the current drag element and the position of the element of the target element being covered by the methods provided by the component, changing the `state` data and thus the position of the element.

# version update

The architecture design has been redesigned to better support various scenarios in drag and drop. The new design is simpler to implement the drag and drop function, please update to `1.0.0` version in time with the old version.

# features
The component consists of three parts: the `DndContextProvider` component, the `DndArea` component and the `DndArea.Item` component.
- `DndContextProvider` component: provides three callback functions to modify the state after dragging and dropping. Determine if the drag is within the same area based on the `source` (source of the drag) and `target` (target of the placement) in the drag callback function parameters.
- `DndArea` component: provides the draggable area in which the dragging and dropping behaviour takes place.Support for cross-domain drag and drop between different `DndArea`
- `DndArea.Item` component: wraps the element to be dragged and dropped so that it can be dragged and dropped. Note that this component must be given a unique `id`;

### install
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

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | when drag start                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | when drag ging                                                                                  |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | when drag end                                                                                  |

## DndArea

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| collect                      | `unknown`            | -                                                  | Parameters passed by drag to the inside of the drag area                                                                                  |

## DndArea.Item

from [react-free-draggable](https://github.com/mezhanglei/react-free-draggable)