EventEmitter

```js
 class EventEmitter {
            constructor() {
                this.events = {}
            }
            on(event, callback) {
                let callbacks = this.events[event] || []
                callbacks.push(callback)
                this.events[event]= callbacks
                return this
            }
            off(event, callback) {
                let callbacks = this.events[event]
                callbacks = callback ? callbacks.filter(fn => fn !== callback) : []
                this.events[event] = callbacks
                return this
            }
            emit(event, ...args) {
                let callbacks = this.events[event]
                callbacks.forEach(fn => fn.apply(args))
                return this
            }
            once(event, callback) {
                let closure = (...args) => {
                    callback.apply(this, args)
                    this.off(event, callback)
                }
                this.on(event, closure)
                return this
            }
        }
```



