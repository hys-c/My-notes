# DNS域名解析协议



- IP地址不方便记忆，人们通常使用域名来代替IP，最后要通过ARP协议将IP变为MAC对应到对应的主机，而ARP不能解析域名，的标识，所以DNS将域名解析为IP地址

- DNS缓存机制，然后从浏览器缓存 => 系统缓存 => 路由器缓存 => ISP DNS 缓存 =>三级域名服务器=>次级域名服务器=>顶级域名服务器=>根域名服务器

- 一个域名对应多个IP ->负载均衡，在DNS服务器中为一个主机分配多个IP地址，查询时，返回不同的IP，客户端访问时就访问了不同的服务器，实现了负载均衡

- 应用层使用的是UDP协议

- 前端优化之：

  DNS预解析：https://cloud.tencent.com/developer/article/1174791

![image-20201121102950439](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201121102950439.png)

浏览器会对a标签的href自动启用DNS Prefetching

![image-20201121103056419](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20201121103056419.png)