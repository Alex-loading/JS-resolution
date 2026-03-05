const myInstanceof = (left, right) => {
  let proto = Object.getPrototypeOf(left); // 获取实例对象的隐式原型
  let prototype = right.prototype; // 获取构造函数的显式原型

  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}