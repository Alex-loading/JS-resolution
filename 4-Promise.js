class SimplePromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // 存储成功回调函数的数组
    this.onRejectedCallbacks = [];  // 存储失败回调函数的数组

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn()); // 依次执行成功回调函数
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn()); // 依次执行失败回调函数
      }
    };

    try {
      // 执行executor函数，并传入resolve和reject函数
      executor(resolve, reject);
    } catch (error) {
      // 如果executor函数执行过程中抛出错误，直接调用reject函数
      reject(error);
    }
  }

  // 此实现不支持链式调用
  // then(onFulfilled, onRejected) {
  //   if (this.status === 'fulfilled') {
  //     onFulfilled(this.value);
  //   } else if (this.status === 'rejected') {
  //     onRejected(this.reason);
  //   } else {
  //     this.onFulfilledCallbacks.push(() => onFulfilled(this.value));
  //     this.onRejectedCallbacks.push(() => onRejected(this.reason));
  //   }
  // }

  // 支持链式调用的then方法
  then(onFulfilled, onRejected) {
    // 链式调用中then返回一个promise，这时候我们需要考虑这个promise何时调用resolve和reject
    return new SimplePromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          const result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = () => {
        try {
          const result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.status === 'fulfilled') {
        handleFulfilled();
      } else if (this.status === 'rejected') {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(() => {
          handleFulfilled();
        });
        this.onRejectedCallbacks.push(() => {
          handleRejected();
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }
}

// 测试代码
const promise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
    // reject('失败');
  }, 1000);
});

promise.then(value => {
  console.log('成功回调:', value);
}).catch(reason => {
  console.log('失败回调:', reason);
}).finally(() => {
  console.log('无论成功还是失败都会执行的回调');
});