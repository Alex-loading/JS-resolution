class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(event, listner) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listner)
    }
    emit(event, ...args) {
        if (!this.events[event]) {
            return
        }
        this.events[event].forEach(fn => fn(...args))
    }
    off(event, listner) {
        if (!this.events[event]) {
            return
        }
        this.events[event] = this.events[event].filter(fn => fn !== listner)
    }
    // 进阶：once方法，监听一次事件后自动移除
    once(event, listner) {
        // 创建一个包装函数，调用原始监听器并在调用后移除自己
        const onceListner = (...args) => {
            listner(...args)
            this.off(event, onceListner)
        }
        this.on(event, onceListner)
    }
}

// 测试代码
const emitter = new EventEmitter()
// 正确的做法是先定义一个函数变量，然后传入on和off
const greetListener1 = () => console.log('Hello, World!')
const greetListener2 = () => console.log('Welcome to the EventEmitter!')

emitter.on('greet', greetListener1)
emitter.on('greet', greetListener2)
emitter.emit('greet')
emitter.off('greet', greetListener1)
emitter.emit('greet')
emitter.off('greet', greetListener2)
emitter.emit('greet')
console.log('--- Testing once method ---')
const onceListener = () => console.log('This will only be logged once.')
emitter.once('onceEvent', onceListener)
emitter.emit('onceEvent')
emitter.emit('onceEvent')


// 进阶：group，批量管理和移除事件监听器
// 进阶：priority，用来控制同一事件的监听器执行顺序，优先级高的先执行

class UpdateEventEmitter {
    constructor() {
        this.events = {}
    }
    on(event, listner, priority = 0, groupName = null) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push({ listner, priority, group: groupName })
        // 按优先级排序，优先级高的先执行
        this.events[event].sort((a, b) => b.priority - a.priority)
    }
    emit(event, ...args) {
        if (!this.events[event]) {
            return
        }
        this.events[event].forEach(({ listner }) => listner(...args))
    }
    off(event, listner) {
        if (!this.events[event]) {
            return
        }
        this.events[event] = this.events[event].filter(fn => fn.listner !== listner)
    }
    once(event, listner, priority = 0) {
        const onceListner = (...args) => {
            listner(...args)
            this.off(event, onceListner)
        }
        this.on(event, onceListner, priority)
    }
    group(groupName) {
        const emitter = this
        return {
            on(event, listner, priority = 0) {
                emitter.on(event, listner, priority, groupName)
            },
            off(event, listner) {
                emitter.off(event, listner)
            },
            removeGroup() {
                for (const event in emitter.events) {
                    emitter.events[event] = emitter.events[event].filter(fn => fn.group !== groupName)
                }
            }
        }
    }
}

// 测试代码
const updateEmitter = new UpdateEventEmitter()
const groupA = updateEmitter.group('groupA')
const groupB = updateEmitter.group('groupB')

groupA.on('event', () => console.log('Group A - Event 1'), 1)
groupA.on('event', () => console.log('Group A - Event 1 with lower priority'), 0)
groupB.on('event', () => console.log('Group B - Event 1'), 2)

console.log('--- Emitting event ---')
updateEmitter.emit('event')

console.log('--- Removing Group A ---')
groupA.removeGroup()
updateEmitter.emit('event')

console.log('--- Removing Group B ---')
groupB.removeGroup()
updateEmitter.emit('event')