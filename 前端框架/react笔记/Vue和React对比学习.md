# Vue和React对比学习

1. 写法上：

   - vue
      - vue每个组件的方法、数据等全部挂载到Vue.component上然后在每个组件中通过this访问。
      - html写在component中。
	  - {{ variable }} 双大括号写法
      - 组件名为student-info
      - 属性名使用`-`分隔
   - react

      - react 则是用原生JS和JSX相结合的写法。
      - jsx可以赋值给一个元素(不可变)，也可以作为一个函数的返回值作为一个函数组件，也可以作为一个类式组件中render函数的返回值。
      - 组件名必须大写StudentInfo
	  - {variable}  单大括号写法
      - 属性名使用小驼峰命名

   - 即vue帮我们封装的更多一些，react则更接近原生，更灵活。
   
2. 数据

   - 数据的更新方式：react使用state和setState使用数据的动态展示，vue使用拦截或者defineProperty来拦截实现响应式

   - 数据的更新时间：都是在一定时间合并更新。

   - 数据方向：都是单向数据流，在流动过程可以把state作为子组件props向下传递。
   
3. 事件处理
   - 写法：
     - vue : `v-on或者`@click='fn'`
     - react: `onClick={fn}`小顶堆写法
   - 阻止默认行为：
     - vue：使用事件修饰符.prevent或者原生
     - react：只能使用原生
   
4. 条件渲染

   - vue: v-if v-else-if v-else

   - react: 原生条件赋值，三目运算，与或等原生方法
   
5. 数组的渲染

   - vue：v-for + key

   - react： map + key
   
6. DOM diff算法
	
	- 都采用同级比较的方式,将O(n^3) -> O(n)
	
7. 数据绑定
   - vue： v-model实现表单数据双向绑定
   - react：受控组件（onChange + event.target.value）和非受控组件
   
8. 组合方式

   | vue                                                      | react                 |
   | -------------------------------------------------------- | --------------------- |
   | 插槽                                                     | props.children        |
   | 具名插槽（name + tempalte+ v-slot:name）                 | props.name            |
   | 作用域插槽(v-bind:propName + v-slot:default='slotprops') | props.render（state） |

   