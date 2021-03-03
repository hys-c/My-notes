# cookie 和 session

https://juejin.cn/post/6844903434366222350

一、cookie

cookie主要是下面这样一种客户端保存的机制

![image-20201213144733145](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201213144733145.png)

包括设置过期时间的持续型cookie和不设置过期时间的会话型cookie

cookie和session的区别：

1. 可以存储的类型：Cookie中只能保管ASCII字符串，假如需求存取Unicode字符或者二进制数据，需求先进行编码。Cookie中也不能直接存取Java对象。若要存储略微复杂的信息，运用Cookie是比拟艰难的。

​       而Session中能够存取任何类型的数据，包括而不限于String、Integer、List、Map等。Session中也能够直接     保管Java Bean乃至任何Java类，对象等，运用起来十分便当。能够把Session看做是一个Java容器类。

2. 隐私策略不同：Cookie存储在客户端阅读器中，对客户端是可见的，客户端的一些程序可能会窥探、复制以至修正Cookie中的内容。而Session存储在服务器上，对客户端是透明的，不存在敏感信息泄露的风险。
3. 有效期不同：使用过Google的人都晓得，假如登录过Google，则Google的登录信息长期有效。用户不用每次访问都重新登录，Google会持久地记载该用户的登录信息。要到达这种效果，运用Cookie会是比较好的选择。只需要设置Cookie的过期时间属性为一个很大很大的数字。

由于Session依赖于名为JSESSIONID的Cookie，而Cookie JSESSIONID的过期时间默许为–1，只需关闭了阅读器该Session就会失效，因而Session不能完成信息永世有效的效果。运用URL地址重写也不能完成。而且假如设置Session的超时时间过长，服务器累计的Session就会越多，越容易招致内存溢出

4. 服务器压力不同：Session是保管在服务器端的，每个用户都会产生一个Session。假如并发访问的用户十分多，会产生十分多的Session，耗费大量的内存

5. 浏览器的支持度不同：在禁用cookie的浏览器上，session还可以使用url重写技术或者隐藏表单域技术等




