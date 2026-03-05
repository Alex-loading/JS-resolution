/**
 * 实现new操作符
 */
function myNew(constructor, ...args) {
  // 创建一个新对象，并将其原型指向构造函数的原型
  const obj = Object.create(constructor.prototype);
  // 使用apply调用构造函数，传入新对象作为this和剩余参数
  const result = constructor.apply(obj, args);
  // 如果构造函数返回一个对象，则使用该对象，否则使用新创建的对象
  const isObject = typeof result === 'object' && result !== null;
  const isFunction = typeof result === 'function';
  
  return isObject || isFunction ? result : obj;
}