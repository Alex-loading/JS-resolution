// 数组转树结构的函数
function arrayToTree(arr, parentId = null) {
  const tree = [];
  for (const item of arr) {
    if (item.parentId === parentId) {
      const children = arrayToTree(arr, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
}

// 测试代码
const arr = [
  { id: 1, parentId: null, name: 'Node 1' },
  { id: 2, parentId: 1, name: 'Node 1.1' },
  { id: 3, parentId: 1, name: 'Node 1.2' },
  { id: 4, parentId: null, name: 'Node 2' },
  { id: 5, parentId: 4, name: 'Node 2.1' }
];

const tree = arrayToTree(arr);
console.log(JSON.stringify(tree, null, 2));