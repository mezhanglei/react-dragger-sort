import produce from 'immer';
export const arrayMove = (arr: any[], preIndex: number, nextIndex: number) => {
    //如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
    //我们再把数组之前的那个拖动的元素删除掉，所以要len+1
    const newArr = produce(arr, draft => {
        if (preIndex > nextIndex) {
            draft.splice(nextIndex, 0, arr[preIndex]);
            draft.splice(preIndex + 1, 1)
        }
        else if (preIndex < nextIndex) {
            //如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
            //这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
            draft.splice(nextIndex + 1, 0, arr[preIndex]);
            draft.splice(preIndex, 1)
        }
    })
    return newArr;
}