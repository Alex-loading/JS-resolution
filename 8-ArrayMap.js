Array.prototype._map = function (Fn) {
  const array = this;
  const newArray = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    newArray[i] = Fn(array[i], i, array)
  }
  return newArray;
}

// 测试代码
const arr = [1, 2, 3];
const newArr = arr._map(x => x * 2);
console.log(newArr); // 输出: [2, 4, 6]