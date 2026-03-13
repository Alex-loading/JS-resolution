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

function throttleByRaf(fn) {
  let rafId = null

  return function (...args) {
    if (rafId) return   // 当前帧已经安排过了

    rafId = requestAnimationFrame(() => {
      fn.apply(this, args)
      rafId = null      // 执行完释放
    })
  }
}