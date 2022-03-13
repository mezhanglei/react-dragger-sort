import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import DndSortable, { arrayMove, DragMoveHandle } from "../../../src/index";
import { klona } from 'klona';

const Home: React.FC<any> = (props) => {

  const [data, setData] = useState([
    { children: [{ children: [{ children: [1, 2, 3, 4, 5], backgroundColor: 'pink' }], backgroundColor: 'yellow' },], backgroundColor: 'blue' },
    { children: [8, 9, 10, 11, 12, 13, 14], backgroundColor: 'green' },
    { children: [15, 16, 17, 18, 19, 20, 21], backgroundColor: 'green' },
  ]);

  const indexToArray = (pathStr: string) => `${pathStr}`.split('.').map(n => +n);

  const getLastIndex = (pathStr: string) => {
    const array = indexToArray(pathStr);
    return (array.pop()) as number;
  };

  const getItem = (path: string, data: any) => {
    const arr = indexToArray(path);
    // 嵌套节点删除
    let parent: any;
    if (arr.length === 0) {
      return data;
    }
    arr.forEach((item, index) => {
      if (index === 0) {
        parent = data[item];
      } else {
        parent = parent?.children?.[item];
      }
    });
    if (parent.children) return parent.children;
    return parent;
  };

  const setInfo = (pathStr: string, treeData: any, data: any) => {
    const arr = indexToArray(pathStr);
    treeData = klona(treeData);
    let parent: any;
    arr.forEach((item, index) => {
      if (index == 0) {
        parent = treeData[item];
      } else {
        parent = parent.children[item];
      }
    });
    parent.children = data;
    return treeData;
  };

  const onDragEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!sourceItem || !targetItem) return;
    console.log(params, '同区域');
    const preIndex = getLastIndex(sourceItem.path);
    const nextIndex = getLastIndex(targetItem.path);
    const parentPath = source.path;
    let parent = parentPath ? getItem(parentPath, data) : data;
    if (preIndex !== undefined && nextIndex !== undefined) {
      parent = arrayMove(parent, Number(preIndex), Number(nextIndex));
      const newData = parentPath ? setInfo(parentPath, data, parent) : parent;
      setData(newData);
    }
  };

  const onMoveInEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!sourceItem || !targetItem) return;
    console.log(params, '跨区域');
    const sourceData = getItem(source.path, data);
    const targetData = getItem(target.path, data);
    const sourceIndex = getLastIndex(sourceItem.path);
    let targetIndex;
    if(targetItem.path && targetItem.path === target.path) {
      targetIndex = targetData?.length;
    } else {
      targetIndex = getLastIndex(targetItem.path);
    }
    if(sourceIndex >= 0 && targetIndex >= 0) {
      targetData?.splice(targetIndex + 1, 0, sourceData?.[sourceIndex]);
      sourceData?.splice(sourceIndex, 1);
      // add
      const afterAdd = setInfo(target.path, data, targetData);
      // remove
      const newData = setInfo(source.path, afterAdd, sourceData);
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
              style={{ display: 'flex', flexWrap: 'wrap', background: item.backgroundColor, width: '200px', marginTop: '10px' }}
              path={path}
              onDragEnd={onDragEnd}
              onMoveInEnd={onMoveInEnd}
            >
              {loopChildren(item.children, path)}
            </DndSortable>
          </div>
        );
      }
      return (
        <DndSortable style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} path={path}>
          <div>
            {item}
          </div>
        </DndSortable>
      );
    });
  };

  return (
    <DndSortable>
      {loopChildren(data)}
    </DndSortable>
  )
}

export default Home;