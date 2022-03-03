import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import DndArea, { DndContextProvider, arrayMove, isObjectEqual, DragMoveHandle } from "../../../src/index";

const Home: React.FC<any> = (props) => {

  const [arr1, setArr1] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [arr2, setArr2] = useState([8, 9, 10, 11, 12, 13, 14]);

  const onDragStart: DragMoveHandle = (params) => {
  };
  const onDragMove: DragMoveHandle = (params) => {
  };
  const onDragEnd: DragMoveHandle = (params) => {
    const { source, target } = params;
    if (!source.area || !target.area) return;
    const sourceItem = source.item;
    const targetItem = target.item;
    const list = [{ data: arr1, setData: setArr1 }, { data: arr2, setData: setArr2 }];
    // 同区域内拖拽
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
      // 跨区域拖拽
    } else {
      list?.map((listItem) => {
        const { data, setData } = listItem;
        // 移除
        if (isObjectEqual(data, source.collect)) {
          const cloneData = [...data];
          const index = data?.findIndex((item) => item === sourceItem?.id);
          cloneData?.splice(index, 1);
          setData(cloneData);
        }
        // 增加
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
    <>
      <DndContextProvider onDragStart={onDragStart} onDrag={onDragMove} onDragEnd={onDragEnd}>
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
    </>
  );
}

export default Home;