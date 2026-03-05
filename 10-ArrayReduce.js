Array.prototype._reduce = function (Fn, initialValue = 0) {
  let array = this;
  let sum = initialValue;
  for (let i = 0; i < array.length; i++) {
    sum = Fn(sum, array[i]);
  }
  return sum;
}

// 测试代码
const arr = [1, 2, 3, 4];
const result = arr._reduce((acc, curr) => acc + curr, 0);
console.log(result); // 输出: 10