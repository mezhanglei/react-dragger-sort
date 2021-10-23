import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "../../../src/index";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

const Home: React.FC<any> = (props) => {

    const [arr1, setArr1] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [arr2, setArr2] = useState([8, 9, 10, 11, 12, 13, 14]);

    const onDragMoveEnd1: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            const preIndex = arr1?.findIndex((item) => item === tag?.id);
            const nextIndex = arr1?.findIndex((item) => item === coverChild?.id)
            const newArr = arrayMove(arr1, preIndex, nextIndex);
            setArr1(newArr);
        }
    }

    const onDragMoveEnd2: DragMoveHandle = (tag, coverChild, e) => {
        if (tag && coverChild) {
            const preIndex = arr2?.findIndex((item) => item === tag?.id);
            const nextIndex = arr2?.findIndex((item) => item === coverChild?.id)
            const newArr = arrayMove(arr2, preIndex, nextIndex);
            setArr2(newArr);
        }
    }

    const onMoveOutChange = (data) => {
        if (data) {
            const newArr1 = [...arr1];
            const index = arr1?.findIndex((item) => item === data?.moveTag?.id)
            newArr1?.splice(index, 1)
            setArr1(newArr1);
        }
    }

    const onMoveInChange = (data) => {
        if (data) {
            const newArr2 = [...arr2];
            const index = arr1?.findIndex((item) => item === data?.moveTag?.id);
            const nextIndex = newArr2?.findIndex((item) => item === data?.coverChild?.id);
            newArr2?.splice(nextIndex, 0, arr1?.[index]);
            setArr2(newArr2);
        }
    }

    return (
        <>
            <DraggableArea1 onMoveOutChange={onMoveOutChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd1}>
                {
                    arr1?.map((item, index) => {
                        return (
                            <DraggerItem style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} resizeAxis='auto' key={item} id={item}>
                                <div>
                                    大小拖放{item}
                                </div>
                            </DraggerItem>
                        )
                    })
                }
            </DraggableArea1>
            <div style={{ marginTop: '10px' }}>
                <DraggableArea2 onMoveInChange={onMoveInChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd2}>
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