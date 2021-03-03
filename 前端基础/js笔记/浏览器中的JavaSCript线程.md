# 浏览器中的JavaSCript线程

一、JS和UI渲染是互斥的，使用页面渲染和JS执行是不会同步的，同一个时刻只能完成一件事（因为JS会操作DOM，所以必须互斥进行）

二、Web worker

web worker 也不能操作DOM，window对象，一般用于计算web workers可使用的特性

- 由于web workers的多线程性质、他只能使用JavaScript的特性的

  一个子集

  。下面是它可以使用的特性列表：

  - navigator对象
  - location对象(只可读)
  - XMLHttpRequest
  - setTimeout()/clearTimeout() 和 setInterval()/clearInterval()
  - 应用缓存([Application Cache](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.html5rocks.com%2Fen%2Ftutorials%2Fappcache%2Fbeginner%2F))
  - 通过`importScripts()`函数引入额外的JavaScript代码
  - 创建其他的web workers

##### web workers的局限性

- 遗憾的是，worker无法使用一些重要的JavaScript特性：
  - DOM(会造成线程不安全)
  
  - window对象
  
  - document对象
  
  - parent对象(浏览器中就是等于window对象)
  

啊






