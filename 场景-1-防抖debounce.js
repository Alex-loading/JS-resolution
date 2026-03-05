// 防抖
function debounce(func, delay) {
  let timer = null;
  // 返回一个闭包函数，用闭包保存timer确保其不会销毁，重复点击会清理上一次的定时器
  return function (...args) {
    let context = this; // 这里的this是匿名函数的调用者

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(context, args); // 这里也可以直接写func(this， args)，因为箭头函数会捕获外层this
      timer = null;
    }, delay)
  };
}