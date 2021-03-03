# Vuex 

## state： 

保存状态 通过this.$store.state.attr 访问，且响应式

## getter:

 一些类似计算属性的函数，对state属性的加工this.$store.getter.attr访问

## 

## mutations：

 对state修改的一些函数，函数的第一个参数是state，第二个参数为payload对象，通过this.$store.commit(methodName, payload) payload一般为一个对象，方便传入多个值

### 1. Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用[对象展开运算符 (opens new window)](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

### 2. Mutation 必须是同步函数

因为devtools 通过mutation中函数的调用生成记录，如果异步，就难以实现

## actions

一般用于进行异步操作，

接收一个与store具有相同属性的对象，通过dispatch触发，在actions内部通过commit提交给mutations