import { klona } from "klona";

// 给对象目标属性添加值
export function deepSet(obj: any, path: string | string[], value: any, arraySetPath?: Array<string>) {
  if (typeof obj !== 'object') return obj;
  let temp = klona(obj);
  const root = temp;
  const parts = !Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path;
  const length = parts.length

  for (let i = 0; i < length; i++) {
    const p = parts[i];
    // 该字段是否设置为数组
    const isSetArray = arraySetPath?.some((path) => {
      const end = path?.split('.')?.pop();
      return end === p;
    });
    if (i === length - 1) {
      if (value === undefined) {
        delete temp[p];
      } else {
        temp[p] = value;
      }
    } else if (typeof temp[p] !== 'object' && isSetArray) {
      temp[p] = [];
    } else if (typeof temp[p] !== 'object') {
      temp[p] = {};
    }
    temp = temp[p]
  }
  return root;
}