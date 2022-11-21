# react-dragger-sort

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-4.1.1-green)](https://www.npmjs.com/package/react-dragger-sort)

# 适用场景

提供拖拽容器和拖放能力的组件，可监听目标拖放操作。

# version

- version4.x
  - 主要更新，拖拽回调参数全部更改。使用需要删除旧版本重新下载。
  - 移除`options`中的`groupPath`并增加`collection`参数, 用来向回调函数传递参数
  - 4.1.0 `arraySwap` => `arrayMove`
- version3.x
  - 增加`options`配置属性`childOut`, 设置子元素拖出的条件
  - 调整`options`配置属性`childDrag`.

# features
- 提供拖放容器：容器的子元素（直接子元素）则可被拖拽，子元素可以通过`data-id`属性设置标记。
- 支持跨容器拖放：不同的容器支持相互嵌套，并且不同容器可进行跨域拖放操作，容器可通过`collection`属性给回调监听函数传递参数

### 快速安装
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
          childDrag: true,
          allowDrop: true,
          allowSort: true
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
          childDrag: true,
          allowDrop: true,
          allowSort: true
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

## 属性

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| onStart                      | `({e, from }) => void`            | -                                                  | 拖拽开始时触发的函数                                                                                  |
| onMove                      | `({e, from, to}) => void`            | -                                                  | 拖拽时触发的函数                                                                                  |
| onEnd                      | `({e, from, to}) => void`            | -                                                  | 拖拽结束时触发的函数                                                                                  |
| onUpdate                      | `({e, from, to}) => void`            | -                                                  | 当同域内拖放结束时会触发                                                                                  |
| onAdd                      | `({e, from, to}) => void`            | -                                                  | 当前区域内添加新元素时结束触发                                                                                  |
| onHover                      | `(item: HTMLElement) => void`            | -                                                  | 子元素被hover时触发                                                                                  |
| onUnHover                      | `(item: HTMLElement) => void`            | -                                                  | 子元素失去hover时触发                                                                                  |
| collection                      | -            | -                                                  |  收集额外参数传递给拖拽回调函数                                                                                 |
| options                      | -            | -                                                  |  拖放的配置                                                                                 |

### options
- `handle`: `string | HTMLElement` 拖拽句柄 `可选`。
- `filter`: `string | HTMLElement` 过滤句柄的选择器 `可选`。
- `allowDrop`: `boolean | DndCondition;` 是否允许拖放新元素，`必选`。
- `allowSort`: `boolean | DndCondition` 是否可以动态插入排序，`可选`。
- `childOut`: `boolean | (HTMLElement | string)[] | DndCondition;` 子元素是否允许拖出或者允许拖出的子元素 `可选`。
- `childDrag`: `boolean | (HTMLElement | string)[] | ((fromItem: DragItem, options: DndProps['options']) => boolean)`; 子元素是否允许拖拽或者允许拖拽的子元素 `必选`。
- `direction`: [`vertical`, `horizontal`]允许拖拽的轴向，`可选`。
- `sortPreClass`: `string` 元素往序号小的排序时添加的class，`可选`。
- `sortNextClass`: `string` 元素往序号大的排序时添加的class，`可选`。

```javascript
type DndCondition = (params: DndParams, options: DndProps['options']) => boolean;
```
