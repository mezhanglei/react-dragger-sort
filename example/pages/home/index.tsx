import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import DndSortable, { arraySwap, DndProps } from "../../../src/index";
import { klona } from 'klona';
import { addDragItem, getItem, indexToArray, removeDragItem } from './utils';

const Home: React.FC<any> = (props) => {

  const [data, setData] = useState([
    { backgroundColor: 'blue', children: [{ label: 1, backgroundColor: 'green', children: [{ label: 1 }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] }, { label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }] },
    { backgroundColor: 'green', children: [{ label: 6 }, { label: 7 }, { label: 8 }, { label: 9 }, { label: 10 }] },
    { backgroundColor: 'green', children: [{ label: 11 }, { label: 12 }, { label: 13 }, { label: 14 }, { label: 15 }] }
  ]);

  const onUpdate: DndProps['onUpdate'] = (params) => {
    const { drag, drop } = params;
    console.log(params, '同区域');
    const dragIndex = drag?.index;
    const dropIndex = drop?.dropIndex;
    const parentPath = drag?.groupPath;
    const cloneData = klona(data);
    const parent = getItem(cloneData, parentPath);
    const childs = parentPath ? parent.children : cloneData;
    const swapResult = arraySwap(childs, Number(dragIndex), Number(dropIndex));
    let newData;
    if (parentPath) {
      parent.children = swapResult;
      newData = cloneData;
    } else {
      newData = swapResult;
    }
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
    const dragIndexPathArr = indexToArray(dragGroupPath);
    const dropIndexPathArr = indexToArray(dropGroupPath);
    // 先计算内部的变动，再计算外部的变动
    if (dragIndexPathArr?.length > dropIndexPathArr?.length || !dropIndexPathArr?.length) {
      const removeData = removeDragItem(cloneData, dragIndex, dragGroupPath);
      const addAfterData = addDragItem(removeData, dragItem, dropIndex, dropGroupPath);
      setData(addAfterData);
    } else {
      const addAfterData = addDragItem(cloneData, dragItem, dropIndex, dropGroupPath);
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
};

export default Home;
