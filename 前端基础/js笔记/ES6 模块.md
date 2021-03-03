ES6 模块

import  {} + export

import x + export default

import * as + export

1. 严格模式
2. 静态解析（无法使用表达式变量及条件加载）
3. 浏览器加载ES6模块`<script type="module" src="./foo.js"></script>`,异步加载，不会造成堵塞浏览器等同于打开了`<script>`标签的`defer`属性。
4. 可以条件在家的import（）异步加载，返回promise require是同步加载，主要用于条件在家、按需加载、动态路径加载



ES6模块与commonJS 的区别

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。