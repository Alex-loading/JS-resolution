// 节流
function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    let context = this;
    let now = new Date.now();

    if (now - lastTime >= delay) {
      func.apply(context, args); // 这里也可以直接写func(this， args)
      lastTime = now;
    }
  };
}