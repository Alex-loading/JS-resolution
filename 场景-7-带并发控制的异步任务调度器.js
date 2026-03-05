class Scheduler {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.queue = []
    this.activeCount = 0
  }
  add(promiseCreator) { // 接受一个返回 Promise 的函数作为参数
    return new Promise((resolve) => {
      const run = () => {
        this.activeCount++
        promiseCreator().then((result) => {
          resolve(result)
          this.activeCount--
          if (this.queue.length > 0) {
            let next = this.queue.shift()
            next()
          }
        })
      }

      if (this.activeCount < this.concurrency) {
        run()
      } else {
        this.queue.push(run)
      }
    })
  }
}


// 工具函数：返回一个在指定时间后resolve的Promise
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)
/**
 * () => timeout(time) 是一个任务工厂函数（返回 Promise 的函数），传给调度器
 * scheduler.add(...) 返回一个 Promise，当该任务执行完毕后 resolve
 * .then(() => console.log(order)) 任务完成后打印编号
 */
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// 打印顺序是：2 3 1 4