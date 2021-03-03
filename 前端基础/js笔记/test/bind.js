// Function.prototype._bind(context) {
//   const self = this
//   const oldArgs = [].slice.call(arguments, 1)
//   function fbind() {
//     const newArgs = [].slice.call(arguments)
//     const allArgs = newArgs.concat(oldArgs)
//     self.apply(this instanceof fbind ? this: context, allArgs)
//   }
//   function f() {}
//   f.prototype = self.prototype
//   fbind.prototype = new f()
//   return fbind
// }

// 1. 判断实例是否是函数，如果不是，抛出类型错误
// 2. 实现一个返回原函数调用的闭包，绑定参数和上下文
// 3. 通过判断是否作为构造函数调用来确定this指向
// 4. 让一个函数作为媒介，修改原型