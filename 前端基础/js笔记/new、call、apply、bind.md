# new、call、apply、bind

### 一、new

一、一个对象执行了哪些操作
	
   1. 创建一个对象
	
   2. 将该对象的连接到构造函数的原型上
	
   3. 将步骤1创建的对象最为上下文执行构造函数
	
   4. 如果三中没有返回对象，则返回该1中创建的对象

二、 自己实现一个new



```javascript
function _new(fn) {
    let obj = Object.create(fn.prototype)
    let args = [].silce.call(arguments)
    args.shift()
    let ret = fn.apply(obj, args)
    return ret instanceof Object? ret: obj
}
```



### 二、call、apply

相同点：

- 都可以改变this的指向
- 调用后都是立即执行
- 都是Function原型上的方法，所以在每个函数实例上都可以直接调用

不同点：

- apply传入两个参数，第二个参数是一个数组，数组中的元素作为函数的参数
- call传入多个参数，第二个即后面的参数作为函数的参数



### 三、bind

思想：

通过一个闭包，保存上下文对象，和原函数，返回一个函数，调用时使用

原函数 + 上下文对象 + 新的参数 

第一版：

```
Function.prototype._bind = function(context) {
	const self = this
	return function() {
		self.call(context)
	}
}
```

缺陷：bind是可以传入参数的，在绑定和调用的时候都可以

第二版：

```javascript
Function.prototype._bind = function(context) {
    const self = this
    const bind_args = [].slice.call(arguments, 1)
    return function() {
		const args = [].slice.call(arguments)
        self.apply(context, args.concat(bind_args))
    }
}
```

缺陷：当bind的函数作为构造函数时，this会指向对应的上下文对象，而new中call，apply的优先级又没有bind高，导致this没有指向new 中第一步创建的对象.也不是bind优先级高，只是bind中也call，apply覆盖了原来的

第三版：

```javascript
Function.prototype._bind = function(context) {
	const self = this
    const bind_args = [].slice.call(arguments, 1)
    const fbind = function() {
        const allArgs = bind_args.concat(arguments)
        self.apply(this instanceof fbind? this: context, allArgs)
    } 
    fbind.prototype = this.prototype
    return fbind
}
```

缺点：修改绑定返回函数的原型的时候会修改被绑定的函数的原型

方法：使用一个函数中转一下

第四版

```javascript
Function.prototype._bind = function(context) {
	const self = this
    const bind_args = [].slice.call(arguments, 1)
    const f = function(){}
    const fbind = function () {
		const allArgs = bindArgs.concat(arguments)
        self.apply(this instanceof fbind? this: context, allArgs)
    }
    f.prototype = self.prototype
    fbind.prototype = new f()
    return fbind
}
```







