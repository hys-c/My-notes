# react

## 一、入门

1. 流程

   - 创建虚拟DOM

   - 渲染虚拟DOM `ReactDOM.render(vdom, dom)`

2. 遍历数组

   react 展示数组时直接把所有项便利直接展示

   ```react
   const ul = (
   	<ul> {
       nums.map((value, index) => {
           return <li key={index}>{value}</li>
       })
   }
   )
   ```

3. 概念简介

   - 模块

     + 功能：向外提供特定的js的程序，一般就是一个js文件

     + 为什么：方便维护，代码耦合低，方便复用

   - 组件

     + 功能： 用来实现特定功能（一般是界面功能）效果的代码集合

     + 为什么：方便复用维护，简化代码
   
   

## 二、React 面向组件编程

1. 步骤
   - 定义组件
   - 渲染组件标签
2. 定义组件
   - 工厂函数组件: 没有状态的组件
   ```react
   //创建
   function MyComponent(props) {
   	return <h2>工厂函数组件</h2>
   }
   //渲染
   ReactDOM.render(<MyComponent/>, root)
   ```
   - ES6类组件
   ```react
   //创建
   class MyComponent extends React.Component{
		render() {
			return <h2>ES6类组件</g2>
		}
	}
	//渲染
	ReactDOM.render(<MyComponent/>, root)
   ```
3. 三大组件属性
   - state
   对象类型
   ```react
   class MyComponent extends React.Component{
   		//初始化状态
   	constructor(props) {
			super(props)
			this.state = {
				isLike: false
			}
		}
		//更新状态
   	handleClick() {
	            //这
			this.setState(
				{
	           		 isLike: !this.state.isLike
	       		}
			)
	        // 将新增的方法中的this强制绑定为组件对象
	        this.handleClick = this.handleClick.bind(this)
		}
	    
	    //重写组件内的方法
	    //在回调赋值时有类似callback = this.handleClick 导致丢失this
		render() {
			//读取状态
			const isLike = this.state.isLike
   		return 
   		(
   		<h2 onClick={this.handleClick}>
   			{isLike? '你喜欢我': '我喜欢你'}
   		</h2>
   		)
   	}
   }
   
   ```
   
   ​	为什么react中要绑定this：https://juejin.cn/post/6844903605984559118
   
   - props
   
     ```react
     //定义
     function MyComponent(props) {
     	return (
         	<ul>
                 <li>姓名： {props.name}</li>
                 <li>姓名： {props.age}</li>
                 <li>姓名： {props.sex}</li>
             </ul>
         )
     }
     //设置默认属性值
     MyComponent.defaultProps = {
     	age: 18,
         sex: '男'
     }
     //设置类型和必要性
     MyComponent.PropTypes = {
     	name: PropTypes.string.isRequired,
         age: ProTypes.number
     }
     const p1 = {
         name: 'hys',
         age: 20,
         sex: '女'
     }
     
     //渲染
     ReactDOM.render(<MyComponent {...p1}/>,root)
     ```
   
   - refs
   
     ```react
     class MyComponent extends React.Component {
     	constructor() {
     		
         }
         show() {
     		const input = this.refs.inputid
             const inputf = this.input
         }
         render() {
     		return (
             	<div> 
                     <input ref='inputid' type='text'/>
                     <input ref={input => this.input = input} type='text'/>
                 </div>
             )
         }
     }
     ReactDOM.render(<MyComponent>, root)
             
     // 三种使用方法
     // 1. 使用字符串类型的
     // 2. 使用箭头函数
     // 3. 使用函数绑定到class上
     // 4. 使用createRef // 每一个只能存一个 
     ```
     
     为什么官方推荐使用箭头函数的refs：https://zhuanlan.zhihu.com/p/3359637
     
     ```
     ref箭头函数形式，挂载的时候会执行一次，更新则两次，第一次为null，第二次Dom对象。每一次是一个函数实例，所以用null清空前一次渲染
     render调用的次数是1+n（n是更新次数）
     ```
     
      
   
4. 组件的组合使用

   - 功能化组件的编码过程

     + 拆分组件：拆分界面，抽取组件

     + 实现静态组件：使用组件的静态页面效果

     + 实现动态组件

       1. 动态显示初始化数据

       2. 交互功能（从绑定事件监听开始）

   - 组件的组合使用
   
  + 每个组件只能有一个根标签
     + 父传子通过props
     + 数据放在需要用到数据的组件的公共父组件（或祖先）内
     + 子组件中不能直接改变父组件的状态
     + 状态在哪个组件，更新状态的方法就应该在哪个组件
     + 改变状态必须调用this.setState（）
     + 父传子传引用类型，其实是传引用类型的引用
5. 收集表单数据
   
   - 受控组件：表单项的输入数据能自动收集（与数据双向绑定 ）
   - 非受控组件：需要时才手动去读取的数据 （现用现取）
   
   ```react
   class LoginForm extends React.Component {
   	constructor() {
           this.state = {
   			username: ''
           }
   		this.handleSubmit = this.handleSubmit.bind(this)
       }
       handleSubmit(event) {
   		const pwd = this.pwd.value
           alert()
       }
       handleChange(event) {
           
   		this.setState = {
   			username: event.target.value
           }
          event.preventDefault()
       }
       render() {
           //原生onChange是在失去焦点时触发
           //react是一改变就触发
   		return (
           	<form action='/test' onSubmit={this.handleSubmit}>
               用户名：<input onChange={this.handleChange} 
                        value = {this.state.username} />
               密码：<input ref={pwd => this.pwd = pwd}/>
               </form>
           )
       }
   }
   ```
   
6. 注意点

   - **组件名称必须以大写字母开头**

   - **所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**

   - **State 的更新可能是异步的**

     出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

     因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
     
     解决this.setState((state, props) => {}) 该函数用上一次的state和props作为参数
   
7. 组合与继承

   - 包含关系

   ```
   // 一、只预留一个插槽
   
   //子组件
   function Child(props) {
   	return (
   		<div>
   			{props.children}
   		</div>
   	)
   }
   
   父组件
   ...
   <Child>other content</Child>
   
   // 2. 预留多个插槽
   
   // 子组件
   function Child(props) {
   	return (
   		<div>
   			{props.left}
   			{props.right}
   		</div>
   	)
   }
   
   // 父组件
   ...
   <Child left={other content} right={other content}></Child>
   ```

8. state用法

   ![image-20210125150115027](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20210125150115027.png)
   
   

## 三、React事件处理

1. 通过onXxx(e)属性指定事件处理函数（小驼峰命名）
   
2. 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

3. React使用自定义事件，而不是原生的DOM事件 （为了更好的兼容性）

4. React事件是通过事件委托方式处理的 （有更高的效率）

3. 通过event.target 得到发生事件的DOM元素对象（减少ref的使用，一般是数据和事件在同一源上使用）

## 四、组件的生命周期

1. 旧的组件生命周期.

   ![image-20201221163258835](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201221163258835.png)

   - componentDidMount() 

     组件挂载完毕调用
   
   - componentWillUnmount()
   
     组件将要被卸载时调用
   
   - shouComponentUpdate()
   
     不写默认返回true，如果返回false，将不会向下执行，返回true则向下执行
   
   - componentWillUpdate()
   
     组件将要更新
   
   - compoenntDidUpdate(preProps, oldState,snapshotValue) 
   
     组件更新完毕
     
   - componentWillReceiveProps(props)
   
     组件**再次**传值才会调用

​           总结：图左边是挂载时，右边是父组件或者子组件更新时

![image-20201221205348017](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201221205348017.png)

2. 新的生命周期组件

   ![image-20201222151452816](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201222151452816.png)

   - getDerivedStateFromProps(props, state)

     前面要加static，要给class调用，而且必须有返回一个状态对象或者null，返回对象可能会覆盖state，场景**让state取决于props**

   - getSnapshotBeforeUpdate()

     必须返回快照值或者一个null

     总结：

     ![image-20201222161804663](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201222161804663.png)

3. 新旧生命周期组件对比

   - 准备弃三滥用增二不常用

## 五、React DOM diff算法

1. 对比的最小粒度：标签

2. key的作用

   ![image-20201222171618100](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201222171618100.png)

## 六、React 脚手架

1. 入门

   - 安装

     ```
     cnpm i -g create-react-app // 全局创建
     ```

   - 使用
   
     ```
     create-react-app project_name
     ```
   
2. 项目目录结构

   **public**

   - noscript 标签

     浏览器不支持js运行时显示的内容

   - manifest.json文件

     应用加壳配置
   
   - robots.txt
   
     爬虫规则文件
   
   **src**
   
   - app.js、app.css等
   - app.test.js 测试文件
   - index.css 通用的样式
   - index.js入口文件
   - React.StrictMode  检查代码中的不合理
   - reportWebVitals 记录页面的性能
   - setupTests.js 测试

## 七、组件化编码的流程

![image-20201223092447031](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223092447031.png)

## 八、React ajax

1. 建议使用axios （轻量、返回promise、可以再node环境和浏览器环境使用）

2. 配置代理：

   ![image-20201223102757848](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223102757848.png)

   方法一

   > 在package.json中追加如下配置

   ```json
   "proxy":"http://localhost:5000"
   ```

   说明：

   1. 优点：配置简单，前端请求资源时可以不加任何前缀。
   2. 缺点：不能配置多个代理。
   3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

   

   方法二

   1. 第一步：创建代理配置文件

      ```
      在src下创建配置文件：src/setupProxy.js
      ```

   2. 编写setupProxy.js配置具体代理规则：

      ```js
      const proxy = require('http-proxy-middleware')
      
      module.exports = function(app) {
        app.use(
          proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
            target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true, //控制服务器接收到的请求头中host字段的值
            /*
            	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
            	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
            	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
            */
            pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
          }),
          proxy('/api2', { 
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
          })
        )
      }
      ```

   说明：

   1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
   
   2. 缺点：配置繁琐，前端请求资源时必须加前缀。
   
## 九、组件之间的通信 

一、父子组件：

父传子：props

子传父：父传子传方法，调用父组件的方法添加数据

二、兄弟组件之间的通信

![image-20201223110853232](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223110853232.png)

## 十、React 路由

#### 一、SPA的理解

![image-20201223155932709](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223155932709.png)

#### 二、路由分类

![image-20201223161438194](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223161438194.png)

#### 三、前端路由原理

1. 通过h5 history

2.  用`<a href='#about'>`

#### 四、react路由

1. 安装

   ```
   cnpm i react-router-dom
   ```

2. 内置组件

   

   ```
   // 导入
   // NavLink 默认点谁给谁加了active 类，设置activeClassName，改变点击增加类名
   // Link 则是正常连接
   // BrowerRouter, HashRouter 为路由方式
   // Route为路由组件
   // Switch组件 包裹路由，每个路由只匹配一次
   import { Link, BrowerRouter, HashRouter,Route } from 'react-router-dom'
   
   // 使用
   <BrowerRouter>
   	<Link to='/about'></Link> {// 最后转换为a标签}
   // 注册路由
   	<Switch>
   		<Route path='/about' components={ About }/> // /about只匹配一次
   		<Route path='/about' components={ a }/>
   		<Route path='/about' components={ b }/>
   	</Switch>
   </BrowerRouter>
   ```

   

   //  整个应用只能用一个路由器包裹

3. 路由的基本使用

   ![image-20201223172106534](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201223172106534.png)

4. 标签体内容也是一个特殊的props,key为children

5. 多级路径刷新样式丢失

   解决：

   - 把路径的./写成/

   - %PUBLIC_URL%

   - 使用hashRouter

6. 路由的模糊匹配和严格匹配

   ![image-20201224154256710](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201224154256710.png)

7. Redirect

   ![image-20201224154929526](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201224154929526.png)

   谁都无法匹配，跳转到redirect 对应的路由

8. 二级路由

   ![image-20201225084256537](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201225084256537.png)

9. 由路由组件传参

   ![image-20201225092651969](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201225092651969.png)

10. 路由切换的两种模式

- push（默认）
- replace（在声明路由时加上该属性）
11. 编程式路由导航
	
	this.props.history.push()
	
	this.props.history.replace()
	
	this.props.history.goBack()
	
	this.props.history.goForward()
	
12. withRouter

    一般组件有路由组件的API 

    `export default withRouter`

13. hashRouter/browerRouter

    ![image-20201225101651531](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201225101651531.png)
## 四、Redux

​	

## 五、扩展

### 1. setState

#### setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



### 2. lazyLoad

#### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



### 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
(5). setXxx()当传入一个对象时，修改时完全覆盖原有对象，而不是局部覆盖
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



### 4. Fragment

#### 使用

	<Fragment><Fragment>
	<></>

#### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

### 5. Context

#### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

#### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	import xxxContext ...
	<xxxContext.Provider value={数据}>
		子组件
        </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  import xxxContext ...
		
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  import xxxContext ...
	
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

#### 注意

	在应用开发中一般不用context, 一般都用它的封装react插件
#### API
     1. React.createContext('defaultValue')
     创建context容器，默认值为defaultValue
     2. Context.Provider
     包裹子组件，将context传入子组件，有一个props  value，初始化值
     3. Context.Consumer
     可将context传递给类组件和函数组件，里面是一个函数，第一个参数是context的value
     4. Class.contextType
     将context注入类组件


<hr/>


### 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

#### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

#### 原因

>  Component中的shouldComponentUpdate()总是返回true

#### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>


### 7. render props

#### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

#### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果A组件需要B组件内的数据, ==> 做不到 

#### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

### 8. 错误边界

##### 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

##### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

### 9. 组件通信方式总结

#### 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

#### 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

#### 比较好的搭配方式：

		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

### 10.高阶组件

