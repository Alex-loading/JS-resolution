class Stack {
  constructor() {
    this.items = []
  }

  // 入栈
  push(value) {
    this.items.push(value)
    return this.size()
  }

  // 出栈
  pop() {
    return this.items.pop()
  }

  // 查看栈顶
  peek() {
    return this.items[this.items.length - 1]
  }

  // 栈大小
  size() {
    return this.items.length
  }

  // 是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 清空
  clear() {
    this.items.length = 0
  }
}


// 使用两个栈实现一个队列
class Queue {
  constructor() {
    this.inStack = new Stack()
    this.outStack = new Stack()
  }

  // 入队
  enqueue(value) {
    this.inStack.push(value)
  }

  // 出队
  dequeue() {
    if (this.outStack.isEmpty()) {
      while (!this.inStack.isEmpty()) {
        this.outStack.push(this.inStack.pop())
      }
    }
    return this.outStack.pop()
  }

  // 查看队首
  peek() {
    if (this.outStack.isEmpty()) {
      while (!this.inStack.isEmpty()) {
        this.outStack.push(this.inStack.pop())
      }
    }
    return this.outStack.peek()
  }

  // 队列大小
  size() {
    return this.inStack.size() + this.outStack.size()
  }

  // 是否为空
  isEmpty() {
    return this.size() === 0
  }
}