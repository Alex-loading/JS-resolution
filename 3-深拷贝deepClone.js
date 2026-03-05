function deepClone(obj, map = new Map()) {
  // deepClone函数用于深拷贝一个对象或数组
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (/^(Function|RegExp|Date|Map|Set)$/i.test(obj.constructor.name)) {
    return new obj.constructor(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};


  if (map.get(obj)) return map.get(obj)//循环引用
  map.set(obj, true)

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 确保是对象自身的属性，而不是继承的属性
      clone[key] = deepClone(obj[key], map);
    }
  }

  return clone;
}