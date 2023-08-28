# react-dragger-sort

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-5.0.11-green)](https://www.npmjs.com/package/react-dragger-sort)

# Introduction?

Component that provides drag-and-drop container and drag-and-drop capability to listen to target drag-and-drop operations.

# version update
- version5.x
  - `options` parameter adjustment: `hiddenFrom` hide drag source, `disabledDrop` disable drag and drop, `disabledSort` disable dynamic insertion while dragging, `disabledDrag` disable dragging, remove ~~`childDrag`~~ , ~~`allowDrop`~~ , ~~`allowSort`~~, ~~`childOut`~~.
- version4.x
  - main version update, Drag and drop callback parameter change
  - remove the `groupPath` from `options` and add the `collection`
  - 4.1.0 `arraySwap` => `arrayMove`parameter which is used to pass parameters to callback function.
- version3.x
  - Add the `options` configuration attribute `childOut`, which sets the conditions for child elements to be dragged out
  - Adjust the `options` configuration attribute `childDrag`.

# features
- Provide drag-and-drop containers: the child elements of containers can be dragged and dropped, and the child elements can be marked by the `data-id` property.
- Support cross-container drag and drop: different containers support nesting each other, and different containers can be dragged and dropped across domains, and containers can pass parameters to callback listeners through the `collection` property.

# matters
  - It is better not to change the `from` drag source in the `onEnd`, `onAdd` and `onUpdate` events, because the dom change is an asynchronous process.

### install
```
npm install --save react-dragger-sort
# or
yarn add react-dragger-sort
```

### demo
```javascript
import React, { useRef } from 'react';
import DndSortable, { arrayMove, Dndprops, deepClone } from "react-dragger-sort";

const Home: React.FC<any> = (props) => {
  const [part1, setPart1] = useState([1, 2, 3, 4, 5])
  const [part2, setPart2] = useState([6, 7, 8, 9, 10])

  const onUpdate: DndProps['onUpdate'] = (params) => {
    const { from, to } = params;
    const formIndex = from?.index
    const toIndex = to?.index
    console.log(params, 'the same group');
    // do something ...
  }

  const onAdd: DndProps['onAdd'] = (params) => {
    const { from, to } = params;
    const fromGroup = from?.group
    const toGroup = to?.group
    console.log(params, fromGroup, toGroup, 'different group');
    // do something ...
  }

  return (
    <div>
      <p>part1</p>
      <DndSortable
        onUpdate={onUpdate}
        onAdd={onAdd}
        collection={{ group: 'part1' }} // custome props
        style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px', marginTop: '10px' }}
        options={{
          hiddenFrom: true
        }}>
        {
          part1?.map((item, index) => (<div style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={index}>{item}</div>))
        }
      </DndSortable>
      <p>part2</p>
      <DndSortable
        onUpdate={onUpdate}
        onAdd={onAdd}
        collection={{ group: 'part2' }}  // custome props
        style={{ display: 'flex', flexWrap: 'wrap', background: 'gray', width: '200px', marginTop: '10px' }}
        options={{
          hiddenFrom: true
        }}>
        {
          part2?.map((item, index) => (<div style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={index}>{item}</div>))
        }
      </DndSortable>
    </div>
  );
};

export default Home;
```

## attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onStart                      | `({e, from }) => void`            | -                                                  | when drag start                                                                                  |
| onMove                      | `({e, from, to}) => void`            | -                                                  | when drag ging                                                                                 |
| onEnd                      | `({e, from, to}) => void`| -                                                  | when drag end                                                                                 |
| onUpdate                      | `({e, from, to}) => void`            | -                                                  | End of drag and drop trigger in current area                                                                                  |
| onAdd                      | `({e, from, to}) => void`            | -                                                  | End trigger when a new element is added to the current area                                                                                  |
| onHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when an immediate sortable child element is hovered                                                                                  |
| onUnHover                      | `(item: HTMLElement) => void`            | -                                                  | Triggered when the previous hover child element is moved away                                                                                  |
| collection                     | -            | -                                                  |  Collect additional parameters to pass to the drag and drop callback function                                                                                 |
| options                           | -            | -                                                  |  Configuration of drag and drop                                                                                 |

### options
```javascript

export type DndCondition = (params: DndParams) => boolean;
export type UnionCondition = boolean | (HTMLElement | string)[] | DndCondition;
```
- `handle`: `string | HTMLElement` Drag and drop handle `optional`.
- `filter`: `string | HTMLElement` Selector for filtering handles `optional`.
- `hiddenFrom`: `UnionCondition` Whether or not to hide the drag and drop source, `optional`.
- `disabledDrop`: `UnionCondition` Whether to disable drag and drop, `optional`.
- `disabledSort`: `UnionCondition` whether to disable dynamic insertion `optional`.
- `disabledDrag`: `UnionCondition`; Whether to disable drag and drop `Optional`.
- `direction`: [`vertical`, `horizontal`] the axial direction to allow dragging, `optional`.
- `sortPreClass`: `string` The class to add when the element is sorted towards a smaller ordinal number, `optional`.
- `sortNextClass`: `string` The class to add when the element is sorted towards a larger ordinal number, `optional`.
