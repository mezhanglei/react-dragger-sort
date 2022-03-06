import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import DndArea, { DndContextProvider, arrayMove, deepSet, DragMoveHandle } from "../../../src/index";

const Home: React.FC<any> = (props) => {

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
    <>
      <DndContextProvider onDragEnd={onDragEnd} onAreaDropEnd={onAreaDropEnd}>
        {renderChildren(data)}
      </DndContextProvider>
    </>
  );
}

export default Home;