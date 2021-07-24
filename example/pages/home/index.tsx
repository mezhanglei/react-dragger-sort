import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import { DraggableAreaGroup, DraggerItem, DragMoveHandle, arrayMove } from "../../../src/index";
import produce from "immer";

const DraggableAreaGroups = new DraggableAreaGroup();
const DraggableArea1 = DraggableAreaGroups.create()
const DraggableArea2 = DraggableAreaGroups.create()

const Home: React.FC<any> = (props) => {

    const [state, setState] = useState({ arr1: [1, 2, 3, 4, 5, 6, 7], arr2: [8, 9, 10, 11, 12, 13, 14] })

    const onDragMoveEnd1: DragMoveHandle = (tag, coverChild) => {
        if (tag && coverChild) {
            setState(state => {
                const preIndex = state?.arr1?.findIndex((item) => item === tag?.id);
                const nextIndex = state?.arr1?.findIndex((item) => item === coverChild?.id)
                const newArr = arrayMove(state?.arr1, preIndex, nextIndex);
                return {
                    ...state,
                    arr1: newArr
                }
            });
        }
    }

    const onDragMoveEnd2: DragMoveHandle = (tag, coverChild, e) => {

    }

    const onMoveOutChange = (data) => {
        if (data) {
            setState(state => {
                const newArr = produce(state?.arr1, draft => {
                    const index = draft?.findIndex((item) => item === data?.moveTag?.id)
                    draft?.splice(index, 1)
                });
                return {
                    ...state,
                    arr1: newArr
                }
            })
        }
    }

    const onMoveInChange = (data) => {
        if (data) {
            setState(state => {
                const newArr = produce(state?.arr2, draft => {
                    const index = state?.arr1?.findIndex((item) => item === data?.moveTag?.id);
                    const nextIndex = draft?.findIndex((item) => item === data?.coverChild?.id);
                    draft?.splice(nextIndex, 0, state?.arr1?.[index]);
                });
                return {
                    ...state,
                    arr2: newArr
                }
            })
        }
    }

    return (
        <>
            <DraggableArea1 dataSource={state?.arr1} onMoveOutChange={onMoveOutChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd1}>
                {
                    state?.arr1?.map((item, index) => {
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
                <DraggableArea2 dataSource={state?.arr2} onMoveInChange={onMoveInChange} style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px' }} onDragMoveEnd={onDragMoveEnd2}>
                    {
                        state?.arr2?.map((item, index) => {
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