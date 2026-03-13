class ListNode {
  constructor(key) {
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

class MyDoublyLinkedList {
  constructor() {
    this.head = new ListNode(null); // 虚拟头节点
    this.tail = new ListNode(null); // 虚拟尾节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const tailNode = this.tail.prev;
    if (tailNode === this.head) return null; // 链表为空
    this.removeNode(tailNode);
    return tailNode.key; // 返回被移除节点的键
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map(); // 存储键值对以及链表节点的引用
  // 双向链表，存储键的访问顺序，最近使用的在头部，最久未使用的在尾部
  this.linkedList = new MyDoublyLinkedList();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) {
    return -1;
  }
  this.linkedList.moveToHead(this.cache.get(key).node); // 将访问的节点移动到头部
  return this.cache.get(key).value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.get(key).value = value; // 更新值
    this.linkedList.moveToHead(this.cache.get(key).node); // 移动到头部
  } else {
    if (this.cache.size === this.capacity) {
      const tailKey = this.linkedList.removeTail(); // 移除尾部节点
      this.cache.delete(tailKey); // 从缓存中删除对应的键
    }
    // 添加新节点到头部
    let newNode = new ListNode(key);
    this.linkedList.addToHead(newNode);
    this.cache.set(key, { value, node: newNode }); // 将键值对和节点引用存入缓存
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */