call、apply、bind

1. call

   ```js
   Funtion.prototype._call = function(context, ...args) {
   	context = context === null ? window : context
       context.fn = this
       const res = context.fn(...args)
       delete context.fn
       return res
   }
   ```

2. apply

   ```js
   Function.protype._apply = function(context, argsArr) {
   	context = context === null ? window : context
       context.fn = this
       const res = context.fn(...argsArr)
       delete context.fn
       return res
   }
   ```

3. bind

   ```js
   Function.prototype._bind = function(context, ...args) {
       const self = this
       const bindArgs = args
       var fbind = function(...arr) {
   		const allArr = arr.concat(bindArgs)
           self.apply(this instance of fbind ? this : context, allArr)
       }
       function f() {}
       f.prototype = self.prototype
       fbind.prototype =  new f()
       return fbind
   }
   ```

   