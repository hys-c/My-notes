# ToString和valueOf方法

https://juejin.cn/post/6844903967097356302

1. 常见类型调用toString（）方法

```
{}.toString()      // [object Object]
[1,2,3].toString() // 1,2,3  与[1,2,3].join(',')相同
f.toString()       // 输出整个函数对象
const a = 1
a.toString()       // 1
const flag = false
flag.toString()    // false
//null 和 undefined 没有toString方法
```
2. 常见类型调用valueOf（）方法

   ```js
   // 注意： vlaueOf() 获取的结果不是字符串，而是它的原始值
   let a = 1
   a.valueOf()  // 1
   b = 'hello'
   b.valueOf()  // hello
   flag = false
   flag.valueOf() // flase
   {a: 1}.valueOf() // {a:1}
   f.valueOf()  //函数原始对象
   ```

   ![image-20201211113627195](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201211113627195.png)

2.  对象的转换

   - 转化为Boolean
   
     直接转换为true
   
   - 转换为数字
     
     - 在进行算数运算（包括加法）时，如果有valueOf方法并返回基本数据类型，则将其转换为数字，然后运算，当然转换失败为NaN
     - 在进行算数运算时，如果没有valueOf方法则调用toString返回基本数据类型，则将其转换为数字，然后运算，当然转换失败为NaN
     - 前两者都不满足,typeError
   - 转换为字符串
     - 在转换为字符串时，如果有toString方法并返回基本数据类型（不是基础类型会报类型错误），则将其转换为数字，然后运算，当然转换失败为NaN
     
     - 在进行算数运算时，如果没有toString方法没有则调用valueOf返回基本数据类型（不是基础类型会报类型错误），则将其转换为数字，然后运算，当然转换失败为NaN
     
     - 前两者都不满足,typeError
   
4. 结论：
- 如果有一个是对象，则遵循对象对原始值的转换过程(Date对象直接调用toString完成转换，- - 其他对象通过valueOf转化，如果转换不成功则调用toString)
- 如果两个都是对象，两个对象都遵循步骤1转换到字符串
- 两个数字，进行算数运算
- 两个字符串，直接拼接
- 一个字符串一个数字，直接拼接为字符串

   