## async

1. 简介

   async函数其实就是将Generator函数的星号(*)替换成ascnc, 将yield替换成await

2. 相比Generator的改进

   - 内置执行器，也就是说，执行async函数，和普通函数一样只需要一行
   - 更好的语意
   - 返回值是Promise
   
3. 基本用法

   当函数执行的时候，一旦遇到await就会先返回，等到异步操作执行完，在继续

4. 语法

   1. 返回Promise对象

   ​	   return返回的值，会成为then方法回调的参数,函数内部抛出错误，会被catch方法回调函数

   2. Promise对象的状态变化

      async函数返回的Promise对象，只有所有await命令后面的对象执行完，才会发生状态改变

   3. await命令

      await命令后面是一个promise对象，如果不是，直接返回其值

      await命令后面是一个thenable对象，await会将其等同于Promise对象

      

      *任意一个await后面的Promise对象变为reject状态，那么整个async都将中断执行*

      解决办法：

      1、将await放在try catch中

      2、 在await后面的Promise对象后跟一个catch方法

   4. 错误处理

      使用try..catch包裹

   5. 使用注意点

      - 前面已经说过，`await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中

      - 多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

        ```javascript
        //写法一
        let [foo, bar] = await Promise.all([promise1, promise2])
        
        //写法二
        let fooPromise = getFoo();
        let barPromise = getBar();
        let foo = await fooPromise;
        let bar = await barPromise;
        ```

      - `await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。
      
      - async 函数可以保留运行堆栈。

5. 与其他异步方式的比较

   

   