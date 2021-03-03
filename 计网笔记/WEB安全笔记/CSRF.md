# CSRF
## CSRF攻击

### 一、攻击方式

![image-20201216191637270](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201216191637270.png)

获取cookie->诱使用户访问->伪造成功

### 二、浏览器的cookie策略
一些浏览器会禁止入img、iframe、script、link等标签发送第三方的cookie
### 三、P3P头的副作用
- 由于一些广告等的需求，使用当带有网站返回给浏览器带有P3Pheader的http头时，网站将
  允许二中的标签发送第三方cookie

- 由于二、三CSRF不能依赖浏览器对第三方cookie进行拦截

### 四、不仅get，还有post
不仅get，攻击者还可以构造form表单提交post构造CSRF攻击

## CSRF 防御

### 一、验证码

强制用户必须与网站交互，才能发送请求，但是由于用户体验，不可能每个请求都有验证码操作

，所以只能用作辅助手段

### 二、Referer check

- referer是浏览器向服务器发送请求时，保存时哪里页面请求的连接

- 可以靠这种手段监测是否是CSRF

- 但是有些时候用户处于隐私保护，不会发送referer

- 故只可以作为一种监测手段，辅以使用

### 三、URL 加密

- CSRF的本质：重要操作的所有参数可以被攻击者发现或者猜测到

所以加密URL，使攻击者难以发现

- 但URL将变得难读，对用户不友好

- 还有如果加密的参数动态改变，一些URL将无法被用户收藏

### 四、Anti CSRF Token

- 给URL加一个token，用一个安全的随机算法生成，使攻击者无法构造一个完整的URL实施CSRF攻击

- 用法：token存放在session和表单中，然后提交时判断session中的token和表单提交的token是否

  一致

  + token需要使用安全的随机生成器
  + token可以存在cookie中，但多个页面也可以生成多个token

