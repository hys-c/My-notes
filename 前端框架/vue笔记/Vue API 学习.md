# Vue API 学习

$watch

- 第一种用法

  ```
  vm.$watch('someObj', function(newVal, oldVal), {
  	immediate: Boolean, // 是否立即触发一次
  	deep: Boolean  // 是否深度监听
  })
  ```

  