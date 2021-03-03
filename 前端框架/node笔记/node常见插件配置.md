## 一、express的使用
下载：
```shell
cnpm i express --save
```
配置：
```javascript
const express = require('express')
```
使用：
```javascript
const app = express()
....
app.listen(port,callback)
```
## 二、使用art-tempalte
安装：
```shell
cnpm i art-template --save
```
配置： 
```javascript
const template = require('art-template')
```
使用：
```javascript
const htmlStr = tempalte.render(data, obj)
```
## 三、使用路由
router.js:
```javascript
const router = express.Router()
//将路由挂载到router上
module.exports = router
```
app.js:
```javascript
const router = require('path/router.js')
app.use(router)
```
## 四、配置post请求的数据
安装：
```javascript
cnpm i body-parser --save
```
配置：
```javascript
bodyParser = require('body-parser')
```
使用：
```javascript
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```

## 五、配置express-art-template
安装：
```javascript
cnpm i express-art-template --save
```
配置：
```javascript
app.engine('html', require('express-art-template'))
```
使用：
```javascript
//注意x.html必须在views目录下
res.render('x.html', obj)
```
## 六、express开放文件配置
```javascript
app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))
```
##  七、node中使用session

下载：

```javascript
cnpm i express-session --save
```

配置：

```javascript
const session = require('express-session')
//在路由之前配置
app.use(session({
	secret: 'keyboard cat',
    resave: false,
    saveUninitiallized: true
}))
```

使用：

```javascript
添加：req.session.obj = 
访问: req.session.obj
```

## 八、Mongodb in Node

### 一、基本使用

基本操作：

```shell
mongo //连接当前开启的数据库

db //显示当前数据库对象

show dbs //显示数据列表

use dbname //连接指定数据库
```



###  二、使用moogoose

安装：

```javascript
cnpm i mongoose --save
```

引入：

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema
```

使用：

```javascript
moogoose.connect('mongodb://localhost:27017/test')
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userage: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: false
    }
})
const User = mongoose.model('User', userSchema)
```

### 三、crud in mongoose

- 插入数据（create）：

```javascript
const user1 = new User({
    username: 'xiaoming3',
    userage: '18',
    useremail: '992492733@qq.com'
})
user1.save(function(err, res) {
    if(err) {
        return console.log('save err')
    }
    console.log(res)
})
```

- 查找数据（read）： 

```javascript
//findall
User.find(function(err, data) {
    if(err) {
        return console.log(err)
    } 
    console.log(data)
})
//findall by condition
User.find({
    userage: '18'
}, function(err, data) {
    if(err) {
        return console.log(err)
    }
    console.log(data)
})
//findone
User.findOne(function(err, data) {
    if(err) {
        return console.log(err)
    } 
    console.log(data)
})
//findone by condition
User.findOne({
    userage: '18'
}, function(err, data) {
    if(err) {
        return console.log(err)
    }
    console.log(data)
})
```

- 删除数据（remove）

  ```javascript
  User.remove({
  username: 'xiaoming'}, function(err, data) {
  	if(err) {
  		return console.log(err)
      }
  		console.log(data)
  })	
  ```

  

- 更新数据（update）

  ```javascript
  User.findByIdAndUpdate('"5f9e2e810ed60b29a4c67bcf', {
      username: 'xiaohong'
  }, function(err, data) {
      if (err) {
  	return console.log(err)
      }
      console.log(data)
  })
  ```

## 