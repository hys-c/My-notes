### Eletronc

1. 安装

   ```
   npm init -y
   npm install electron -D
   ```

   

2. 使用

   ```
   const electron = require('electron')
   const app = electron.app
   const BrowerWindow = app.BrowserWindow
   let mainWindow = null
   app.on('ready', () => {
   	mainWindow = new BrowerWindow({width: 500, height: 500})
   	mainWindow.loadFile('index.html')
   	mainWindow.on('closed', () => {
   		mainWindow = null
   	})
   })
   ```

   