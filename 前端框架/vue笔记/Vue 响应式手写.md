# Vue 响应式手写

```
class Observe {
    constructor(obj) {
        this.obj = obj
        this.reactive(obj)
    }
    reactive() {
        if(!Array.isArray(this.obj)) {
            let keys = Object.keys(this.obj)
            for(let i = 0;i < keys.length;i++) {
                defineReactive(this.obj, keys[i], this.obj[keys[i]])
            }
        }
    }
}
class Watcher {
    constructor(vm, exp, callback) {
        this.vm = vm
        this.getter = parsePath(exp)
        this.callback = callback
        this.value = this.get()
    }
    get() {
        window.target = this
        console.log('xx')
        let value = this.getter(this.vm, this.vm)
        window.target = undefined
        return value

    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.callback.call(this.vm, this.value, oldValue)
    }
}
function parsePath(path) {
    let segments = path.split('.')
    return function(obj) {
        for(let i = 0;i < segments.length;i++) {
            obj = obj[segments[i]]
        }
        return obj
    }
    
}
class Dep {
    constructor() {
        this.subs = []
    }
    notify() {
        for(let i = 0;i < this.subs.length;i++) {
            this.subs[i].update()
            this.subs.splice(i, 1)
        }
    }
    depend() {
        if(window.target) {
            console.log('已经收集依赖:', window.target)
            this.subs.push(window.target)
        }
    }
}
function defineReactive(obj, key, val) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set(newValue) {
            if(newValue !== val) {
                val = newValue
                dep.notify()
            }
        },
        get() {
            dep.depend()
            return val
        }
    })
}

let vm = {
    data: 1
}
new Observe(vm)
new Watcher(vm, 'data', function(oldVal, newVal) {
    console.log(oldVal, newVal)
})

```



