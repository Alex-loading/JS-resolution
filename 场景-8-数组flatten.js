function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// 测试代码
const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
const flatArray = flatten(nestedArray);
console.log(flatArray); // 输出: [1, 2, 3, 4, 5, 6, 7]