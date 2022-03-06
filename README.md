# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.1.1-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

A component that provides a drag container and drag capability and no affect for `style`, wrapping the area where the target element is located and the target element, Only drag and drop capability and callback functions are provided, the drag and drop results need to be implemented by yourself for specific data changes.

# version update

The architecture design has been redesigned to better support various scenarios in drag and drop. The new design is simpler to implement the drag and drop function, please update to `1.x` version in time with the old version.

# features
The component consists of three parts: the `DndContextProvider` component, the `DndArea` component and the `DndArea.Item` component.
- `DndContextProvider` component: provides three callback functions to modify the state after dragging and dropping. Determine if the drag is within the same area based on the `source` (source of the drag) and `target` (target of the placement) in the drag callback function parameters.
- `DndArea` component: provides the draggable area in which the dragging and dropping behaviour takes place.Support for cross-domain drag and drop between different `DndArea`, Different `DndArea` nesting is also supported. Note that this component must be given `id`;
- `DndArea.Item` component: wraps the element to be dragged and dropped so that it can be dragged and dropped. Note that this component must be given `id`;

### install
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

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onDragStart                      | `({e, source }) => void`            | -                                                  | when drag start in the same area                                                                                  |
| onDrag                      | `({e, source, target}) => void`            | -                                                  | when drag ging in the same area                                                                                 |
| onDragEnd                      | `({e, source, target}) => void`            | -                                                  | when drag end in the same area                                                                                 |
| onAreaDropping                      | `({e, source, target}) => void`            | -                                                  | triggered on cross-region dropping                                                                                  |
| onAreaDropEnd                      | `({e, source, target}) => void`            | -                                                  | triggered on cross-region drog end                                                                                  |

## DndArea

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| collect                      | `unknown`            | -                                                  | Parameters passed by drag to the inside of the drag area                                                                                  |

## DndArea.Item

- base：from [react-free-draggable](https://github.com/mezhanglei/react-free-draggable)
- `id`：required, Node markers;