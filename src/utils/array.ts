import deepCopy from "fast-copy";
export const arrayMove = (arr: any[], preIndex: number, nextIndex: number) => {
    const clone = deepCopy(arr);
    if (preIndex > nextIndex) {
        clone.splice(nextIndex, 0, arr[preIndex]);
        clone.splice(preIndex + 1, 1)
    }
    else if (preIndex < nextIndex) {
        clone.splice(nextIndex + 1, 0, arr[preIndex]);
        clone.splice(preIndex, 1)
    }
    return clone;
}