import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "../../../src/index";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

const Home: React.FC<any> = (props) => {

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
        <DraggableArea2 onMoveInChange={onMoveInChange2} onMoveOutChange={onMoveOutChange2} style={{ display: 'flex', flexWrap: 'wrap', background: 'green', width: '200px' }} onDragMoveEnd={onDragMoveEnd2}>
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

export default Home;