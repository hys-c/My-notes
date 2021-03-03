# for of 和 for in

https://juejin.im/post/6844903601261772808

一、为什么要有for of 和 for in

​		但是使用foreach遍历数组的话，使用break不能中断循环，使用return也不能返回到外层函数。

二、for in 

作用于数组，输出数组索引以及原型上的属性和方法名

作用于对象，先输出对象的属性名、方法名，在输出原型上的属性名，方法名

**先遍历出整数属性（integer properties，按照升序），然后其他属性按照创建时候的顺序遍历出来**

如果不想输出原型上的，可以使用Object.hasOwnProperty()

for in 的问题：

1. index索引为字符串型数字，不能直接进行几何运算

2. 遍历顺序有可能不是按照实际数组的内部顺序

3. 使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性

三、for of

作用于数组，便利的是数组的是数组值

一般用于便利iteration对象

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象
三、 引出iteration对象
带有[Symbol.iterator]的对象
