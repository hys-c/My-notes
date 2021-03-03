# 深入浅出Vue.js

## 一、Object的变化侦测

1. 什么是变化侦测

   - 当应用内部状态不断变化时，此时需要不停的重新渲染，变化侦测就是用来确认状态中发生了什么变化

   - 变化侦测的两种类型：

     + 推（vue.js）

       当状态发生变化时，马上就能发现发生了变化

     + 拉（angular.js、react.js）

       当状态发生变化时，不知道哪个状态发生了变化，然后发送一个信号给框架，然后框架收到信息，

       采用一种比较暴力的方法找对出变化
   
2. 如何追踪变化



采用ES5 中的一个接口：

   ```javascript
   Object.defineProperty(data, key, {
       value:
       enumerable: Boolean,   // 默认为false， 仅当为true时，属性才是可迭代的
       configurable: Boolean, //默认为false，仅当为true的时候，属性描述符才可修改，可以被删除
                              // 为false使，可以将writable右true改为false，但不能有false改为								true
       writable: Boolean,	  //默认为false，仅当为true时，属性的值才能被赋值运算符改变
       get: Funtion,
       set: Funciton
   })
   ```

   通过设置属性的getter和setter来监听数据的变化，读数据时，getter被触发，写数据时，setter被触发。

3. 如何收集依赖 

   在getter中收集依赖，在setter中触发依赖

4. 依赖收集到哪里

   每一个key都有一个数组来存储
   
5. 依赖是谁
   
   
   
    
