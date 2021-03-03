# 深入浅出Node.js

## 一、Node 简介

### 1、Node的特点

- 异步IO

  如文件操作网络请求等

  ```
  准则：Dont call me, I will call you
  ```

- 事件和回调函数

- 单线程

  不用在意多线程中的同步问题

  单线程的缺点：

  + 无法利用多核CPU

  + 错误会引起整个应用退出，健壮性值得考验

  + 大量计算占用CPU导致无法调用异步I/O
  
- 跨平台

## 二、模块机制

### 2.1模块的实现

 1、加载优先级

- 优先从缓存加载

  不同于浏览器缓存的静态文件，node缓存的时编译执行后的对象

- 从核心模块加载

- 从路径形式的模块中加载

- 自定义模块中加载

2、文件定位

- 文件扩展名分析

  默认按照.js、.json、.node分析，一般如果是.js就不写扩展名，其他的可以写上

- 目录和包分析

  没有得到文件，但得到一个目录，按如下方式分析

  + 首先找到目录下的package.json，通过JSON.parse()解析出包描述对象

    取出其中的main属性指定的文件

  + 如果上一步未获取，将默认使用index.js、index.json、index.node文件
  
  + 如果前两步都没有找到，将前往上级目录，如此循环，直到找到，如果到根目录
  
    还没有找到，则抛出查找失败的异常
    

3、模块编译

模块对象:

```javascript
function Module(id, parent) {
    this.id = id
    this.exports= {}
    this.parent = parent
    if(parent && parent.children) {
        parent.children.push(this)
    }
    this.filename = null
    this.loaded = false
    this.children = []
}
```

1. JavaScript模块的编译

   模块中默认存在的三对象：

   ```javascript
   require
   module
   exports
   ```

   默认存在的两个变量

   ```javascript
   __filename
   __dirname
   ```

   编译过程中node对javascript文件的包装：

   ```javascript
   (function (exports, require, mudule, __filename, __dirname) {
   	...content	
       return module.exports
   })
   ```

   每个文件的作用域被隔离，且不会污染全局变量，

### 2.2核心模块

C++...

### 2.3模块调用栈

![image-20201105204541634](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201105204541634.png)



### 2.4包与NPM

#### 2.4.1包结构

- package.json: 包描述文件

- bin:用于存放可执行二进制文件的目录

- lib：存放JavaScript代码的目录

- doc：存放文档的目录

- test：用于存放单元测试的代码

#### 2.4.2包描述文件与NPM

```javascript
name: //包名
description:  //包介绍
version: //版本号
maintainers：//包维护者列表
dependencies：//包依赖
scripts：//脚本说明对象，主要用于安装、编译、测试和卸载包
```

### 2.5 NPM常用功能

1. 查看帮助

   ```shell
   npm -v //查看版本号
   npm help <command> //查看帮助
   ```

2. 安装依赖包

   - 全局安装

     不是指在任何地方都可以require，一般用于安装具有命令行工具的包

     ```shell
     npm install express -g
     ```

   - 从本地安装
   
     对于一些没有发布或者网络原因无法直接下载的包
   
     ```shell
     npm install file
     ```
   
3. npm钩子命令

   ```javascript
   "scripts": {
       "preinstall": "preinstall.js",
       "install": "install.js",
       "uninstall": "uninstall.js",
       "test": "test.js"
   }
   ```

   在以上字段中执行 npm i <package> 时，preinstall 指向的脚本将被先执行， 然后

   install指向的脚本会被执行。在执行npm unstall <package>时，uninstall 指向的脚本

   会清理一些垃圾

4. 发布包

   

## 三、异步I/O

### 3.1、为什么要使用异步I/O

1. 用户体验

   前端的异步消除UI阻塞，后端异步提升响应资源的速度，从M+N+... -> MAX(M, N ...)

2. 资源分配

   - 单线程同步编程的缺点：单线程同步编程模式会因阻塞I/O导致硬件资源得不到更优的使用

   优点：但是这种编程方式逻辑更清晰

   - 多线程的缺点：编程中的死锁状态同步问题。

   优点：但这种方式可以提高多核CPU的利用率

   - 异步I/O可以让I/O的调用不在阻塞后序的计算

### 3.2、异步I/O实现状态

引言：**它的优秀之处并非原创， 它的原创之处并不优秀**

1. 异步I/O 与 非阻塞I/O

   非阻塞I/O与阻塞I/O的区别

   + 非阻塞I/O在调用后立即不带数据返回（然后CPU可以去做其他事务），后面通过文件描述符去取数据

     * 问题：为了获取完整数据，需要重复调用I/O来确定是否完成，通过轮询来查看

     * 实际通过线程池即把主线程计算，调用I/O线程，完成时通过线程之间的通信来发送完成消息

       需要CPU来判断状态，也会造成CPU资源浪费

   + 阻塞I/O在调用后等待数据返回

     造成CPU资源等待浪费

### 3.3、Node的异步I/O

1. 事件循环

   - node自身的执行模式：事件循环

   在进程启动的时候，Node便会创建一个类似while（true）的循环，没执行一次循环，我们称之为一次tick

   

![image-20201106104213011](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201106104213011.png)

2. 观察者

   作用：在每次tick中，判断是否有事件需要处理

   如网络I/O和文件I/O等都会产生一个观察者

3. 请求对象

   在发出调用到执行回调过程中产生的中间产物

   请求对象是异步I/O过程中重要的中间产物，所有状态都保存在这个对象中，包括送入线程池等待

   执行和I/O操作完成后的一些回调处理

4. 执行回调

### 3.4、非I/O的异步API

1. 定时器

   setTimeout 和 setInterval 

   前者只执行一次，后者重复执行

   缺点： 不精确，如果有一次循环十分耗时，会造成比较大的误差
   
2. process.nextTick（）

   用于立即执行，当然也是在下一次tick中，不过比setTimeout（callback， 0）更高效

3. setImmediate（）



## 四、异步编程

### 4.1 函数式编程

1. 高阶函数

   将函数作为参数或者返回值的函数一般称为高阶函数

2. 偏函数
   创建一个函数A，这个函数A调用了另外一个函数B，函数B的参数或者变量已经被预置了
### 4.2 异步编程的优势和难点
1. 优势
   
   - 基于事件驱动的非阻塞I/O模型，可以使CPU和I/O并不相互依赖等待，让资源得到更好的利用，JS线程像一个分配任务和处理结果的大管家，I/O线程负责完成分配过来的任务，两者互不依赖，保持整体的高效率
   
   - 适合处理I/O密集型的任务
   
2. 缺点

   - 不适合处理CPU密集型的任务

   - 异常处理：尝试对异步方法使用try...catch只能捕获本次循环中产生的异常，对回调执行时抛出的异常无能为力

     解决方法：将异常作为回调函数的第一个参数返回（怪不得在node中一般err， 在data前面）

   - 函数嵌套太深：回调地狱
   
   - 阻塞代码：没有sleep函数，（用循环时间减时间会依旧占用CPU，要捞了）
   
### 4.3 异步编程的解决方案

1. 事件发布/订阅模式

   ```javascript
   //订阅
   emitter.on('event', callback)
   //发布
   emitter.emit('emit', params)
   ```

   优势：事件的发布者无需关心监听器如何实现业务逻辑，常常用来做解耦业务逻辑

2. Promise/Deferred模式

   
