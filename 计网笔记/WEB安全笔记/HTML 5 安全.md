# HTML 5 安全

## 一、HTML 5 的新标签

1. 新标签的XSS

   网站的XSS filter 建立的黑名单可能不会覆盖新增的HTML5 标签， 所以有一些标签

   可能会绕过XSS filter
   
2. iframe 的 sandbox

   <ifname>标签一直被诟病，因为他在XSS、点击劫持等中都被经常使用，而HTML

   给iframe定义了一个新的sandbox属性，iframe将被视为一个独立的源，其中的脚本

   将被禁止执行，表单被禁止提交，插件被禁止加载，指向其他浏览器的标签也会被禁止

3. noreferrer

   HTML为<a>标签和<area>标签定义了一个新的link types：noreferrer,这种设计是处于

   保护敏感信息和隐私的考虑，但是也会带来我们前面CSRF通过referer监听将丧失

4.  Canvas的妙用

   canvas破解验证码，大大降低了攻击的门槛

## 二、其他安全问题

1. Cross-Origin Resource Sharing（CORS）

   允许浏览器向跨源服务器发送请求

   ```javascript
   服务器端配置
   CORS常用的配置项有以下几个：
   
   
   Access-Control-Allow-Origin（必含） – 允许的域名，只能填 *（通配符）或者单域名。
   
   
   Access-Control-Allow-Methods（必含） – 这允许跨域请求的 http 方法（常见有 POST、GET、OPTIONS）。
   
   
   Access-Control-Allow-Headers（当预请求中包含 Access-Control-Request-Headers 时必须包含） – 这是对预请求当中 Access-Control-Request-Headers 的回复，和上面一样是以逗号分隔的列表，可以返回所有支持的头部。
   
   
   Access-Control-Allow-Credentials（可选） – 表示是否允许发送Cookie，只有一个可选值：true（必为小写）。如果不包含cookies，请略去该项，而不是填写false。这一项与 XmlHttpRequest 对象当中的 withCredentials 属性应保持一致，即 withCredentials 为true时该项也为true；withCredentials 为false时，省略该项不写。反之则导致请求失败。
   
   
   Access-Control-Max-Age（可选） – 以秒为单位的缓存时间。在有效时间内，浏览器无须为同一请求再次发起预检请求。
   
   CORS 跨域的判定流程
   
   
   浏览器先根据同源策略对前端页面和后台交互地址做匹配，若同源，则直接发送数据请求；若不同源，则发送跨域请求。
   
   
   服务器收到浏览器跨域请求后，根据自身配置返回对应文件头。若未配置过任何允许跨域，则文件头里不包含 Access-Control-Allow-origin 字段，若配置过域名，则返回 Access-Control-Allow-origin + 对应配置规则里的域名的方式。
   
   
   浏览器根据接受到的 响应头里的 Access-Control-Allow-origin 字段做匹配，若无该字段，说明不允许跨域，从而抛出一个错误；若有该字段，则对字段内容和当前域名做比对，如果同源，则说明可以跨域，浏览器接受该响应；若不同源，则说明该域名不可跨域，浏览器不接受该响应，并抛出一个错误。
   
   ```

   

   