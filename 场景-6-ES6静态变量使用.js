/**
 * JavaScript实现一个构造函数Foo,该函数的每个实例为一个对象,形如{id:N}
 * 其中N表示该实例是第N次调用Foo得到的,不能使用全局变量。
 * 满足条件: 1.id是私有属性 2.禁止非new 调用 3.不用闭包如何实现，是否了解类的静态变量
 */

class Foo {
  static count = 0; // 静态变量，用于计数实例的数量

  constructor() {
    if (!(this instanceof Foo)) {
      throw new Error("必须使用new关键字调用");
    }
    Foo.count++; // 每次创建实例时，计数器加1
    this.id = Foo.count; // 将当前计数器的值赋给实例的id属性
  }
}


// 如果不使用ES6的class和静态变量
// 方法一：可以通过原型对象来实现计数器
// Foo.prototype.count = 0; // 在原型对象上定义计数器

// function Foo() {
//   if (!(this instanceof Foo)) {
//     throw new Error("必须使用new关键字调用");
//   }
//   Foo.prototype.count++; // 每次创建实例时，计数器加1
//   this.id = Foo.prototype.count; // 将当前计数器的值赋给实例的id属性
// }


// 方法二：可以通过闭包来实现计数器
// 用 IIFE 创建外层作用域，count 在所有实例间共享，相当于静态变量
// IIFE：立即调用函数表达式，创建一个独立的作用域，避免污染全局作用域
/**
 * (function () {
 *   // 代码
 * })();
 */
// const Foo = (function () {
//   let count = 0; // 使用IIFE创建一个私有变量count，所有实例共享这个变量

//   return function Foo() { // IIFE执行后返回一个构造函数Foo
//     if (!(this instanceof Foo)) {
//       throw new Error("必须使用new关键字调用");
//     }
//     count++; // 每次创建实例时，计数器加1
//     this.id = count; // 将当前计数器的值赋给实例的id属性
//   };
// })();


// 测试代码
const foo1 = new Foo();
console.log(foo1.id); // 输出: 1

const foo2 = new Foo();
console.log(foo2.id); // 输出: 2
console.log(foo1.id); // 输出: 1，确保foo1的id没有被修改

try {
  const foo3 = Foo(); // 错误调用
} catch (e) {
  console.log(e.message); // 输出: 必须使用new关键字调用
}