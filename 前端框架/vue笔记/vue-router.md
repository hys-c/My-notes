## vue-router

### 一、起步

安装:

```shell
npm install vue-router
```



使用：

```javascript
//router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    { path: '', component: },
    { path: '', component: },
     
]
const router = new VueRouter({
	routes
})
export default router

//App.vue
const app = new Vue({
	router
}).$mount('#app')
```

### 二、动态路由

1. 响应路由参数的变化

   ```
   //router.js
   const router = new VueRouter({
   	routes: [
   		{ path: '/user:id', components:User}
   	]
   })
   
   //对应路由下
   this.$route.params.id
   ```

   ![image-20201114093858902](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201114093858902.png)

2. 路由优先级

   有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

### 三、嵌套路由

```javascript
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
//要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
```

![image-20201114095146850](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201114095146850.png)

### 四、路由导航的方式

1. 声明式：

   `<router-link :to="...">` 

2. 编程式：

   - router.push()

     ![image-20201114100117211](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201114100117211.png)

   - router.replace()

     
