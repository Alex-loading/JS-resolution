const _shallowClone = target => {
  if (typeof target !== 'object' || target === null) return target

  if (/^(Function|RegExp|Date|Map|Set|WeakMap|WeakSet)$/i.test(target.constructor.name)) return target

  const clone = Array.isArray(target) ? [] : {}

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = target[key]
    }
  }

  return clone
}