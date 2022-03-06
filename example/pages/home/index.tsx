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
    let sourceData = sourceCollect?.list;
    const sourceAreaPath = sourceCollect?.path;
    const preIndex = sourceItem.index;
    const nextIndex = targetItem?.index;
    if (preIndex >= 0 && nextIndex >= 0) {
      const newItem = arrayMove(sourceData, preIndex, nextIndex);
      const newData = deepSet(data, `${sourceAreaPath}.list`, newItem);
      setData(newData);
    }
  };

  const onAreaDropEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    const sourceItem = source.item;
    const targetItem = target?.item;
    if (!source.area || !target?.area) return;
    let sourceCollect = source?.collect as any;
    let sourceData = sourceCollect?.list;
    let targetCollect = target?.collect as any;
    let targetData = targetCollect?.list;
    const sourceAreaPath = sourceCollect?.path;
    const targetAreaPath = targetCollect?.path;

    const sourceIndex = sourceItem.index;
    const targetIndex = targetItem ? targetItem?.index : targetData?.length;
    if (sourceIndex >= 0 && targetIndex >= 0) {
      targetData?.splice(targetIndex + 1, 0, sourceData?.[sourceIndex]);
      sourceData?.splice(sourceIndex, 1);
      // remove
      const tmp = deepSet(data, `${sourceAreaPath}.list`, sourceData);
      // add
      const newData = deepSet(tmp, `${targetAreaPath}.list`, targetData);
      setData(newData);
    }
  }

  const renderChildren = (list: any[]) => {
    return list?.map((areaItem, areaIndex) => {
      return (
        <DndArea key={areaIndex} collect={{ path: `${areaIndex}`, list: areaItem?.list }} style={{ display: 'flex', flexWrap: 'wrap', background: areaItem.backgroundColor, width: '200px', marginTop: '10px' }}>
          {
            areaItem?.list?.map((item, index) => {
              return (
                <DndArea.Item style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={item} index={index}>
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