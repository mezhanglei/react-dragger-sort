//是否是移动设备
export const isMobile = function (): boolean {
  let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  return Agents.some((i) => {
    return userAgent.includes(i);
  });
};

// 判断是否为触摸事件
export const isEventTouch = function (e: any): boolean {
  if ("touches" in e || "targetTouches" in e || "changedTouches" in e) {
    return true;
  } else {
    return false;
  }
};
