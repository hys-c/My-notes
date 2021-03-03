# Webpack学习

## 第一章： 入门

#### 一、安装webpack

1. 进入项目根目录下调用npm init初始化一个简单的模块化项目
2. 在本地安装webpack :`npm i -D webpack webpack-cli`(4.x版本的webpack移除了CLI，作为一个独立的webpack-cli包，需要安装一下这个包就可以了)

3. webpack的运行，在package.json文件中配置`"script": "webpack --config webpack.config.js"`