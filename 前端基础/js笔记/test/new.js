function _new(fn) {
    let args = [].slice.call(arguments, 1)
    let obj = Object.create(fn.prototype)
    let ret = fn.apply(obj, args)
    return ret instanceof Object? ret: obj
}
export default _new

// new 四部曲
// 1. 创建一个对象
// 2. 将这个对象连接到构造函数的原型上
// 3. 以这个对象为this然后调用构造函数
// 4. 判断3中返回值是否是一个对象，如果是一个对象，则返回该对象，否则返回我们创建的对象

