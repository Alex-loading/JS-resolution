/***
 * 实现一个HardMan，支持链式调用，按照顺序输出日志
 * 例如
 * HardMan('Hank') 输出 I am Hank
 * HardMan('Hank').rest(1000).learn('computer') 输出 I am Hank, 等待1000ms, learnig conputer
 * HardMan('Hank').restFirst(1000).learn('computer') 输出 等待1000ms, I am Hank, learnig conputer
 */

function HardMan(name) {
  return new _HardMan(name); // 返回一个实例对象，支持链式调用
}

class _HardMan {
  constructor(name) {
    this.tasks = [];

    this.tasks.push(async () => {
      console.log(`I am ${name}`);
    });

    Promise.resolve().then(() => this.run());
  }

  async run() {
    while (this.tasks.length) {
      const task = this.tasks.shift();
      await task();
    }
  }

  learn(subject) {
    this.tasks.push(async () => {
      console.log("learning " + subject);
    });
    return this;
  }

  rest(time) {
    this.tasks.push(async () => {
      console.log("等待" + time + "ms");
      await this.sleep(time);
    });
    return this;
  }

  restFirst(time) {
    this.tasks.unshift(async () => {
      console.log("等待" + time + "ms");
      await this.sleep(time);
    });
    return this;
  }

  sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
}


// 测试代码
// HardMan('Hank');
// HardMan('Hank').rest(1000).learn('computer');
HardMan('Hank').restFirst(1000).learn('computer');