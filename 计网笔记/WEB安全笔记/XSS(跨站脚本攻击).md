# XSS(跨站脚本攻击)

## 一： 分类

- 反射型XSS

- 存储型XSS

- DOM Based XSS

## 二：XSS Payload(通过对页面执行恶意脚本)
1. cookie劫持
2. 构造get 和 post请求
	- 插入图片请求
	- 使用表单
3. XSS钓鱼
	- 伪造界面
# 三、危害

cookie劫持

流量劫持

破坏界面

对服务器大量请求

## 四、XSS 防御
一、HttpOnly
	静止页面访问带有httponly的cookie （解决cookie劫持）
二、输入检查（给输入设置白名单）
	同时在客户端和服务器设置输入检查
三、输出检查
	使用安全的编码函数，如HTMLEncode、JavascriptEncode等

四、CSP安全策略