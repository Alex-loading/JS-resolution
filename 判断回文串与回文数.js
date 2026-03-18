// 这里涉及到两种题型，一种是判断回文串（string），另一种是判断回文数（number）

// 判断回文串
var isPalindrome = function (s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

// 使用reverse方法
var isPalindrome = function (s) {
  return s === s.split('').reverse().join('');
}

// 测试代码
console.log(isPalindrome("abccba")); // 输出: true
console.log(isPalindrome("abc")); // 输出: false


console.log("-----------------------------");




// 判断回文数，要求不能将整数转换为字符串
// 不考虑数字的正负，即“-121”也是回文数
var isPalindromeNumber = function (x) {
  if (x < 0) {
    x = -x; // 将负数转换为正数
  }

  
  // let reversed = 0;
  // let original = x;
  // while (x > 0) {
  //   reversed = reversed * 10 + x % 10; // 获取最后一位并构建反转数
  //   x = Math.floor(x / 10); // 去掉最后一位
  // }
  // return original === reversed; // 比较原数和反转数是否相等


  // 优化：只需要比较前半部分和后半部分即可
  if (x % 10 === 0 && x !== 0) {
    return false; // 以0结尾的数（除0本身）不是回文数
  }
  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + x % 10; // 获取最后一位并构建反转数
    x = Math.floor(x / 10); // 去掉最后一位
  }
  return x === reversed || x === Math.floor(reversed / 10); // 比较前半部分和反转数的前半部分
}

// 测试代码
console.log(isPalindromeNumber(12)); // 输出: true
console.log(isPalindromeNumber(-121)); // 输出: true
console.log(isPalindromeNumber(10)); // 输出: false