function omit(obj, keys) {
  if (obj == null || typeof obj !== 'object') return obj
  const keySet = new Set(keys)
  const res = {}
  for (const k of Object.keys(obj)) {
    if (!keySet.has(k)) res[k] = obj[k]
  }
  return res
}

// 测试代码
const obj = { a: 1, b: 2, c: 3 }
const result = omit(obj, ['b'])
console.log(result) // 输出: { a: 1, c: 3 }


// 完全版
// function omitFull(obj, keys) {
//   if (obj == null || typeof obj !== 'object') return obj
//   const keySet = new Set(keys)
//   const res = Object.create(Object.getPrototypeOf(obj))

//   for (const k of Reflect.ownKeys(obj)) {
//     if (keySet.has(k)) continue
//     const desc = Object.getOwnPropertyDescriptor(obj, k)
//     if (desc) Object.defineProperty(res, k, desc)
//   }
//   return res
// }