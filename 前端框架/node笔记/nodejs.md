# nodejs

## 一、基础

#### 1. http模块和url模块

```js
const http = require('http')
const url =  require('url')
// url.parse(url, [boolean]),可以解析url为一个js对象，如果第二个参数
// 为true，则可以直接把query解析为一个对象

http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8"}) //设置编码格式
    res.wirte('hello') //返回的内容，可以写多个
    res.end() // 必须有
}).listen(3000)
```
#### 2. node 自启动工具suprevisor

```
// 安装
npm i -g supervisor

// 使用:在命令行用supervisor 代替 node
supervisor app.js
```

#### 3. fs模块

1. fs.stat - 判断是文件还是目录

   ```js
   fs.stat(path, function(err, data) {
   	if(err) {
   	
   	}
   	data.isFile()  // 判断是不是文件
   	data.isDirectory()  判断是不是目录
   })
   ```

   

2. fs.mkdir - 创建目录

   ```
   fs.mkdir(path/name, [mode], (err) => { // 文件存在则报错，不存在则创建
   	if(err) {
   		
   	}
   })
   ```

3. fs.writeFile - 创建并写入文件

   ```js
   fs.writeFile(path/file, 'content', (err) => { // 文件不存在则创建，存在则直接覆盖
       if(err) {
           
       }
   })
   ```
   
4. fs.appendFile - 创建与追加
   
   ```js
   fs.appendFile(path/file, 'content', (err) => { // 文件不存在则创建，存在则追加内容
   	if(err) {
   		
       }
   })
   ```
   
5. fs.readFile - 读文件

   ```js
   fs.readFile(path/file, (err, data) => { // 读取文件，数据为16进制
   	if(err) {
           
       }
       data = data.toString()
   })
   ```
   
6. fs.readdir - 目录下的读文件名和目录名
   
   ```js
   fs.readdir(path, (err, data) => {
   	if(err) {
           
       }
       
   })
   ```
   
7. fs.rename - 重命名 和 移动文件
   
   ```js
   fs.readname(path/name, newPath/newName, (err) => {
       if(err) {
           
       }
   })
   ```
   
8. fs.rmdir - 删除目录
   
   ```js
   fs.rmdir(path, (err) => { // 如果目录里面有文件或目录，则无法删除，报错
   	if(err) {
   	
       }
   })
   ```
   
   
   
9. fs.unlink - 删除文件

   ```js
   fs.unlink(path/name, (err) => {
       
   })
   ```
   
10. fs.createReadStream -以流的方式读取文件

    ```
    const readStream = fs.createReadStream(path/file)
    
    readStream.on('data', data => { // 文件较大时会运行多次该回调
    	console.log(data)
    })
    
    readStream.on('end', () => {
    	
    })
    readStream.on('error', err => {
    	console.log(err)
    })
    ```

11. fs.createWriteStream

    ```js
    const writeStream = fs.createWriteStream()
    
    writeStream.write('content')
    // 完成标志
    writeStream.end()
    
    writeStream.on('finish', () => {
    	console.log('写入完成了')
    })
    ```

    



   


## 二、express.js
## 三、koa.js
