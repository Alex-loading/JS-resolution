// 实现倒计时最简单的方式是使用 setInterval 每秒递减一次时间
let seconds = 60
const timer = setInterval(() => {
  seconds--
  console.log(seconds)

  if (seconds <= 0) {
    clearInterval(timer)
  }
}, 1000)


// 但这种写法在实际项目里是不严谨的，因为 setInterval 并不精确
// 可能会因为主线程阻塞、页面切换、浏览器节流等原因导致时间不准。
// 所以更推荐的做法是：基于时间差计算，而不是每秒递减。

function startCountdown(duration) {
  const endTime = Date.now() + duration
  const timer = setInterval(() => {
    const remaining = endTime - Date.now()

    if (remaining <= 0) {
      console.log('倒计时结束')
      clearInterval(timer)
      return
    }

    const seconds = Math.floor(remaining / 1000)
    console.log(seconds)
  }, 1000)
}
startCountdown(10000) // 10秒


// 如果是更高精度场景，比如动画或毫秒级倒计时
// 可以用 requestAnimationFrame，因为它跟随浏览器刷新频率，更平滑。
function startCountdown(duration) {
  // 用 performance.now() 而不是 Date.now()。精度更高，而且不受系统时间修改影响
  const endTime = performance.now() + duration
  let lastShown = null // 记录上一次输出的秒数，避免一秒内输出60个

  function tick(now) {
    const remaining = endTime - now
    const shown = Math.max(0, Math.ceil(remaining / 1000)) // 当前应该显示的秒数

    if (shown !== lastShown) {
      console.log(shown)        // ✅ 只会每秒输出一次
      lastShown = shown
    }
    if (remaining <= 0) {
      console.log('倒计时结束')
      return
    }

    // rAF不会自动循环执行，需要在回调里再次调用 requestAnimationFrame
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
startCountdown(10000) // 10秒