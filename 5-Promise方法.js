/**
 * Promise.all()
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}


// 设置最大并发数
function promiseAllWithConcurrency(promises, concurrency) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const results = [];
    let completedCount = 0;
    let currentIndex = 0;

    function runNext() {
      if (currentIndex >= promises.length) {
        return;
      }

      const index = currentIndex++;
      Promise.resolve(promises[index])
        .then(value => {
          results[index] = value;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          } else {
            runNext();
          }
        })
        .catch(error => {
          reject(error);
        });
    }

    for (let i = 0; i < concurrency && i < promises.length; i++) {
      runNext();
    }
  });
}

/**
 * promise.allSettled()
 */
function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

/**
 * promise.any()
 */
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const errors = [];
    let rejectedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}


/**
 * promise.race()
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}