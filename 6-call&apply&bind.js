Function.prototype.myCall = function (context, ...args) {
  context = context || window; // 防止 null/undefined

  const key = Symbol(); // 防止覆盖属性
  context[key] = this;  // this 就是调用的函数

  const result = context[key](...args);

  delete context[key];

  return result;
};


Function.prototype.myApply = function (context, args) {
  context = context || window; // 防止 null/undefined

  const key = Symbol(); // 防止覆盖属性
  context[key] = this;  // this 就是调用的函数

  const result = args ? context[key](...args) : context[key]();

  delete context[key];

  return result;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this; // this 就是调用的函数
  // 返回一个新的函数，该函数将传入的参数与新函数的参数合并，并在新的上下文中使用 apply 调用原始函数
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};