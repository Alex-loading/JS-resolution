Array.prototype._filter = function (Fn) {
  let array = this;
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Fn(array[i], i, array)) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

// 测试代码
const arr = [1, 2, 3, 4, 5];
const newArr = arr._filter(x => x % 2 === 0);
console.log(newArr); // 输出: [2, 4]