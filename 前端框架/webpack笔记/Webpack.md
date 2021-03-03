# Webpack

## 一、简介

#### 一、可以做的事情

代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布

#### 二、基本属性介绍

```js
module.exports = {
    mode: '', //配置环境 默认为production ,可选development/production/none
	context: path.resolve(__dirname, 'src'), // 后面配置相对路径时会以该目录为根路径
    entry: './main.js', // 入口文件配置
    output: { // 配置出口
		filename: '', // 文件名称
        path: '', // 输出目录，绝对路径
        publicPath: '' // 配置加载资源的前缀，默认为''
    },
    module: { // 配置处理模块的规则
        rules: [ // 数组类型，配置模块的读取和解析规则，通常用来配置loader
            {
                test: /\.js$/, // 正则，配置需要匹配的文件
                use: [// 数组， 从右往左执行，放入需要的loader
                      // 可以直接使用loader名，在loader需要传入很多参数时，还可以用对象
                    {
                       loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        },
                        enforce: 'post'
                    }
                ],
                include: path.resolve(__dirname, 'src'),// 配置解析的目录
                exclude: path.resolve(__dirname, 'node_modules') // 配置不解析的目录
            }
        ],
        noParse: /jquery|chartjs/ // 配置一些没采用模块化的文件不进一步解析
        parser: {
             amd: false, // 禁用AMD
             commonjs: false, // 禁用CommonJS
             harmony: false, // 禁用ES6模块化
             requireInclude: false,
             requireEnsure: false
    	} 
    },
    resolve: {// 配置寻找模块的规则，默认采用commonJS的规则
        alias: {
            components: '@/components',
            assets: '@/assets'
        },
        extensions: ['.js', '.json'] // 配置文件没带扩展名时候的添加顺序
    },
    plugins: [// 配置扩展插件,例如优化、资源、注入环境变量等
        new htmlWebpackPlugin() // 需要的参数通过构造函数传递
    ],
    devServer: {
        hot: true, // 开启热更新，默认是通过重新刷新页面，开启后不刷新整个页面实现新模块替换旧模块	
        inline: true, // 是否让代理客户端控制网页刷新
        host: 127.0.0.1, // 配置服务监听地址，默认为127.0.0.1 ，0.0.0.0 可让同一局域网皆可访问
        port: 8080, // 监听的端口号，默认8080，被占用则8081，依次增加
        https: true, // 默认使用http服务，开启则使用https服务
        open: true // 是否自动打开网页
    },
    target: web,// 构建出针对不同环境的代码， web|node|async-node 等
    devtool: 'source-map' // 如何进行源码映射
    watch: true, // 是否开启监听模式，默认false，但devServer开始时，时true
	watchOptions: {
    	ignore: /node_modules/, // 不监听的文件夹 正则
    	aggregateTimeout: 300, // 监听到变化后等待300ms在更新，即防抖
    	poll: 1000 // 没秒1000次判断文件是否发生变化
    	
	},
    externals:{ // 配置打包时那些文件不用背打包，也就是那些外部环境提供的模块
        juqery: 'JQuery'
    },
    resolveLoader: { // 配置寻找loader的方法，默认如下
        modules: ['node_modules'], // 去哪个目录下找loader
        extensions: ['.js', '.json'],// 入口文件的后缀
        mainFields: ['loader', 'main']// 指明入口文件的字段
    }
}
```

1. devServer原理

   https://segmentfault.com/a/1190000020310371

2. websocket 原理

   https://www.ruanyifeng.com/blog/2017/05/websocket.html

#### 三、内置变量

```
[name] chunk的名称
[id] chunk的唯一标识
[hash] hash值
[chunkhash] chunk内容的哈希值
```



## 二、初步使用

安装：

```shell
npm install webpack webpack-cli
```

使用：

```shell
npx webpack
//默认将src下的文件打包到dist文件下
```

配置：

```javascript
//在根目录下创建webpack.config.js

const path = require('path')
module.exports = {
	mode: '',//模式 有production 或者develoption
    entry: './src/inedx.js',//入口文件
    output: {
		filename: 'bundle.[hash:8].js',//打包后的文件名
        path: path.resolve(__dirname, 'dist')//必须绝对路径，打包后的路径
    }
    
}
```

改变webpack配置文件名：

```shell
webpack --config webpack.config.my.js
```

package.json 脚本配置

```json
"scripts": {
	"build": "webpack --config webpack.config.js",
    "dev": "webpack serve"
}
```

```shell
//现在下面两种方式等价
webpack --config webpack.config.my.js
npm run build
```



## 三、常见插件配置

### 一、webpack-dev-server

下载：

```shell
npm i webpack-dev-server
```

使用：

```shell
webpack serve
//默认将文件打包到根目录内存下
```

配置：

```
//在webpack.config.js中
module.exports: {
	devServer: {
		port: 3000,
		progress: true,//打包时的进度条
		contentBase: './build'//在指定目录下运行静态服务
	}
}
```

### 二、html-webpack-plugin

下载：

```
npm i html-webpack-plugin
```

配置：

```
//在webpack.config.js文件下
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
			minify: {  //配置压缩html文件，默认不压缩
				removeAttributeQuotes: true，
			},
			hash: true
		}),
	]
}
//当使用 webpack 打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
```

### 三、配置CSS模块

#### 一、配置解析CSS

下载：

```shell
cnpm i css-loader style-loader less less-loader -D
```

配置：

```shell
//在webpack.config.js文件下
module.exports = {
	module: {
		rules: [
		// css-loader, 接着@import这种语法
		// style-loader,把css插入head标签中
		//一个loader用字符串
		//多个loader用数组，默认从右向左执行
		// 数组中可以嵌套对象，传options
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	} 
}
```

#### 二、配置抽离css到新的文件插件：

安装：

```
cnpm i mini-css-extract-plugin 
```

配置：

```javascript
//在webpack.config.js文件下
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
			filename: 'main.css',
            
        })
    ],
    module: {
        rules: [
            {
                test: '/\.css$/',
                use: [
                    MiniCssExtractPlugin.loader,//将style-css替换为它
                    css-loader 
                ]
			}
        ]
    }
} 
```

#### 三、配置CSS自动添加浏览器前缀：

安装:

```shell
npm i postcss-loader autoprefixer
```

```javascript
//在webpack.config.js文件下
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
			filename: 'main.css',
            
        })
    ],
    module: {
        rules: [
            {
                test: '/\.css$/',
                use: [
                    MiniCssExtractPlugin.loader,//将style-css替换为它
                    css-loader, 
                    postcss-loader
                ]
			}
        ]
    }
} 
```

```javascript
 //在根目录下创建一个postcss.config.js文件
module.exports = {
	plugin: [require('autoprefix')]
}
```

#### 四、配置压缩CSS、JS

安装：

```shell
npm i optimize-css-assets-webpack-plugin -D //压缩CSS
npm i uglifyjs-webpack-plugin -D//压缩JS
```

使用：

```
//在webpack.config.js下
const op = require('optimize-css-assets-webpack-plugin')
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
optimazation: {//优化项
	minimizer: {
	 	new op(),
	 	new uglifyjsWebpackPlugin({
			cache: true,
			parallel: true //是否并行压缩
			sourceMap: true //是否需要源码映射
		})
	}
}
```

### 四、配置ES6及更高级转ES5

安装：

```shell
cnpm install -D babel-loader @babel/core @babel/preset-env 
cnpm install -D @babel/plugin-proposal-object-rest-spread
cnpm install -D @babel/plugin-transform-runtime
cnpm install -S @babel/polyfill
```

使用：

```javascript
rules: [
  // the 'transform-runtime' plugin tells Babel to
  // require the runtime instead of inlining it.
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  }
]
```

### 五、配置ESLint

安装：

```shell
npm install eslint --save-dev
npm install eslint-loader --save-dev
```

使用:

```javascript
rules: [
  // the 'transform-runtime' plugin tells Babel to
  // require the runtime instead of inlining it.
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'eslint-loader',
      options: {
        enforce: 'pre'//优先执行，滞后执行 post
      }
    }
  }
]
```

### 六、loader介绍

1. 内联loader:

   安装：

   ```shell
   npm i expose-loader -D
   ```

   使用:

   可以使用window.$

   ```
   import $ from 'expose-loader?$!jquery'
   ```

   或webpack为每个模块注入

   ```javascript
   const webpack = require('webpack')
   plugins: [
       new webpack.ProvidePlugin({
           $: 'jquery'
       })
   ]
   ```

### 七、图片处理

1. 图片的引用

   - JS直接创建

   - css引用

   - html引用

2. 使用

   安装:

   ```shell
   npm install file-loader -D
   npm install html-withimg-loader -D
   npm install url-loader -D
   ```

   使用:

   ```javascript
    {
                   test: /\.html$/,
                   use: 'html-withimg-loader'
               },
   
               {
                   test: /\.(png|jpg|gif)$/,
                   use: [{
                       loader: 'url-loader',
                       options: {
                           limit: 5 * 1024,
                           esModule: false, // 该项默认为true，改为false即可
                           name: "[name]-[hash:4].[ext]" 
                         }
                   }]
               },
   ```

### 八、打包多页应用

```
//webpack.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	//多入口
	entry: {
		home: './src/index.js',
		other: '.src/other.js'
	},
	output: {
		filename: '[name].js'
		path: path.resolve(__dirname, dist)
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'home.html',
			chinks:['home'] //引用的js文件
		}),
		new htmlWebpackPlugin({
			template: './other.html',
			filename: 'other.js',
			chunks: ['other']
		})
	]
}
```
### 九、配置sourceMap

作用

```
//在webpack.config.js下

module.exports = {
   plugins: [
   new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
               
                  //1. 会生成一个单独的映射文件
	             devtools: 'source-map'
	              //2. 不会产生单独的映射文件， 但是可以显示行、列
				 //devtools: 'eval-source-map'
	 			//3. 产生后，你可以保存下来
	 			//devtools: 'cheap-module-source-map'
				 //4. 不会产生文件，集成在打包后的文件中，也不会产生列
				 //devtools: 'cheap-module-eval-source-map'
            }
        })
   ]

}

// 方法二
module.exports = {
	devtool: 'source-map'

}
```

### 十、实时打包

使用：

```
module.exports = {
	watch: true,
	watchOptions: {
		poll: 1000,//每秒问我一千次
		aggreatementTimeout: 500,//防抖，停了以后过了500毫秒打包
		ignored: /node_modules //不需要监控哪个文件
	}
}
```

### 十一、webpack小插件应用

1. cleanWebpackPlugin

   //每次在输出目录前，将原目录清空

   下载：

   ```
   npm i clean-webpack-plugin -D
   ```

   使用：

   ```
   const cleanWebpackPlugin = require('clean-webpack-plugin')
   
   module.exports = {
   	plugin: [
   		new cleanWebpackPlugin('./dist')
   	]
   }
   ```

   

2. copyWebackPlugin

   //拷贝文件夹到对应目录

   下载:

   ```
   npm i copy-webpack-plugin -D
   ```

   

   使用：

   ```
   new cleanWebpackPlugin([
   	{from 'doc', to: './'}
   ])
   ```

   

3. bannerPlugin  //内置的

   版权声明插件

   ```
   const webpack = require('webpack')
   
   new webpack.BannerPlugin()
   ```

### 十二、webpack配置跨域

一、代理

```javascript
module.exports = {
	devServer: { //内部express，代理到express服务器
        proxy: {
            '/api':{
                target: '',
                pathRewrite: {//重写路径，服务端只会/api只会受到后面的
                	 'api': ''
                }
        }
    }
}
```

二、mock（前端自己模拟数据）

```javascript
module.exports = {
	devServer: { //内部express，代理到express服务器
       before() {  //调用之前，调用的钩子
           app.get('/user', (res, req) => {
				res.json({name: hys})   //返回的结果
           })
       }
    }
}
```

三、有服务端，不用代理来处理，在服务端启动webpack，端口用服务端端口(前后端在一起运行)

安装：

```shell
npm i webpack-dev-middleware -D//可以在服务端启动webpack
```



```
//在服务端

const webpack = require('webpack')
const app = express()
const webpackMiddleWare = requrie('webpack-dev-middleware')

const config = require('./webpack.config.js')
const compier = webpack(config)
app.use(webpackMiddleWare(compier))
app.get('/user', (req, res) => {
	res.json({nama: 'hys'})
})
app.listen(3000, () => {
	console.log('Server is running')
})
```

### 十三、webpack resolve

```
module.exports = {
	resolve: { //在当前目录下查找
		modules: [path.resolve('node_modules'),
		mainFields: ['style', 'main']//改变模块查找规则
		path.resolve('dist') ]，
		alias: {//取别名
			bootstarp: 'bootstrap/dist/css/bootstrap.cs'
		},
		extensions: ['.js', '.css', '.json']//配置后缀名没有时的添加规则
	}
}
```

### 十四、环境变量

```
module.exports = {
	plugins: [
		new webpack.DefinePlugin({//
			DEV：JSON.stringify('production')
		})
	]
}
```

区分环境变量：

安装：

```
npm i webpack-merge -D
```

使用：

基本

```javascript
 //webpack.base.js
```

开发：

```javascript
//webpack.dev.js
const {smart} = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = {
    mode: 'development'
}
```

生成：

```javascript
//webpack.prod.js
const {smart} = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = {
    mode: 'production'
}
```

### 十五、webpack优化

1. 在不存在依赖嵌套的时候不进一步解析（优化webpack打包速度）

	```
	//webpack.config.ks
	module.exports = {
		module: {
			noParse: 'jquery'//不进一步解析jquery中的依赖关系
		}
	}
	```
	
2. ignorePlugin

   ```javascript
   //webpack.config.ks
   module.exports = {
   	module: {
   		rules: [
   			{
                   test: /\.js, 
               	exclude: /node_modules/,//检查时，忽略该目录
                   include： path,resolve('src')//只找src目录
               }
   		]
   	}，
       plugins: [ //忽略引用
   	new webpack.IgnorePlugin(/\.\/locale//, /moment/)
   	]
   }
   ```

   时间插件：

   安装

   ```javascript
   npm i moment -S
   ```

   使用

   ```javsc
   const moment = rqeuire('moment')
   ```

   ```
   
   ```

   

3. dllPlugin

   

4. happypack（多线程打包）

   ```
   const happyPack = require('happy-pack')
   
   rules: [
   			{
                   test: /\.js, 
               	exclude: /node_modules/,//检查时，忽略该目录
                   include： path,resolve('src'),//只找src目录
                   use: 'happyPack/loader?id=js'
               }
   ]
   plugins: [
   	new happyPack({
   		id: 'js',
   		use: [
   			{
         	     loader: 'babel-loader',
        		 options: {
          			 presets: ['@babel/preset-env'],
           		 plugins: ['@babel/plugin-transform-runtime']
        		 }
   			]
   	})
   ]
   ```

   

5.  webpack自带优化

   - 使用import语法：默认情况生产下不加载没用的代码，比如一个模块中没有用的导出项 tree-shaking
   - scope-hosting: 作用域提升，在webpack中自动省略一些可以简化的代码 `a = 1,console.log(a)`直接变为`console.log(1)`

### 十六、抽取公共代码

```
module.exports = {
	optimization: {
		splitChunks: {//分割代码块
			cacheGroups: {//缓存组
				common: {//公共模块
					minSize: 0,
					minChunks:2,//使用几次以上就缓存
					chunks: 'initial'//入口开始抽离
				}，
				vendor: {//第三方模块
					priority: 1 //优先抽离的权重
					test: /node_modules/,
					minSize: 0,
					minChunks:2,//使用几次以上就缓存
					chunks: 'initial'
				}
			}
		}
	}
}
```

### 十七、懒加载

安装：

```
@babel/plugin-syntax-dynamic-import

```

使用：

```
{
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
 }
```



```
//jsonp实现动态加载文件
//返回一个promise
import('.').then()
```



### 十八、热更新 

```
plugins: [
	new webpack.NameModulesPlugin(),//打印更新的模块路径
	new webpack.HotModuleReplacementPlugin()//热更新的插件
]
devServer: {
	hot: true
}
```

```
if(module.hot) {
	module.hot.accept('./source', () => {
		require('./source')
})
}
```

### 十九、Tapable

安装：

```shell
npm i Tapable
```

钩子函数：

```
//同步钩子
const {SyncHook} = require('tapable')
class Lesson{
	
}
```

### 































