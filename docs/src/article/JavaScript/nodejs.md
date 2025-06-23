---
titleTemplate: Node.js
---
# Node.js

跨平台的JavaScript运行环境，可以搭建服务端的JavaScript应用程序  
基于chrome v8引擎进行封装(运行环境)  
没有DOM和BOM等对象(浏览器对象)  
通过cmd终端交互：

```bash
node -v
```

查看版本号  

## fs模块

读写文件，封装了与本机文件系统进行交互的方法/属性  
语法：  

```JavaScript
const fs requite('fs') //加载模块关键字，fs为模块名
fs.writeFlie('文件路径', '写入内容', err => {
    //回调函数
})
fs.readFile("文件路径", (err, data) => {
    //读取文件后的回调函数
    //data为文件内容的buffer数据流
    //buffer数据流为十六进制，data.toString()转为字符串
})
```

## path模块

### 路径处理

node.js代码中，相对路径是根据**终端所在路径**来查找的  
**node.js中建议使用绝对路径**  

```JavaScript
__dirname //内置变量，获取当前模块目录的相对路径
path.join() //会使用特定平台(系统)的分隔符，作为界定符
```

例(路径拼接):  

```JavaScript
path.join('路径1', '路径2')
path.join(__dirname, '../test.txt')
```

## URL中的端口号

标记服务器不同功能的服务程序  
端口号范围：```0~65535```  
**```0~1023```和一些特定的端口号被占用，应避免使用**  
例：  

```JavaScript
https://www.baidu.com:80/api //端口号 :80
```

## http模块

### 创建web服务

创建web服务并响应内容给浏览器  
步骤：  
①加载http模块，创建服务对象  

```JavaScript
const t = requite('http')
const server = t.createServer()
```

②监听request事件，设置响应头和响应体  

```javaScript
server.on('request', (erq, res) => {
    res.setHeader('coneent-Type', 'text/plaim', charset='utf-8')
    //coneent-Type：响应头
    //text/plaim：普通文本
    //charset='utf-8'：编码设置为utf-8
    res.end('hello world')
    //响应体(内容)
})
```

③配置端口号并启动web服务  

```javaScript
server.listen(8080, () => {
    //建通的端口号为：8080
    console.log('web服务已启动')
})
```

④使用命令行启动node.js并启动web服务  

```bash
node xx.js
```

⑤使用浏览器访问服务：  
http...:8080  
**localhost指的是本机的域名**  

## node.js模块化

在node.js中每一个文件都被视为单独的模块  
提到代码复用性、按需加载、**独立作用域**  
需要使用 **标准语法(commonJs)** 导出和导入进行使用  

## commonJS标准

### 导出

```javaScript
module.exports = {}
```

例：  

```javaScript
const test = '测试'
const getArrSum = arr => arr.reduce((sum, val) => sum += val, 0)
module.exports = {
    对外属性名1: test, //调用：obj.对外属性名1
    对外属性名2: getArrSum //调用：obj.对外属性名2([5, 1, 2, 3])
}
```

### 导入

```javaScript
require('模块名或路径名') 
```

例：  
**当导入为js自带模块时，写名，例：http、fs、path**  
**当导入为自定义模块时，写模块文件路径，例：./utils.js**  

```javaScript
const obj = require('模块名或路径名') //obj相当于module.exports导出的对象
```

## ECMAScript标准

node.js默认支持commonJS标准，如需使用ECMAScript标准语法，需在运行模块所在的文件夹新建**package.json**,并设置  

```json
{"type": "modeule"}
```

### 默认导入和导出

导出  

```javaScript
export.default {}
```

例：  

```javaScript
const tset = '测试'
const getArrSum = arr => arr.reduce((sum, val) => sum += val, 0)
export.defaule {
    对外属性名1: test,
    对外属性名2: getArrSum
}
```

导入  

```javaScript
import 变量名 from '模块名或路径'
```

例：  

```javaScript
import obj from '模块名或路径' //obj相当于export.default导出的对象
```

### 命名导出和导入

导出  

```JavaScript
export 修饰定义的语句
```

例：  

```javaScript
export const tset = '测试'
export const getArrSum = arr => arr.reduce((sum, val) => sum += val, 0)
```

导入  

```JavaScript
import {同名变量} from '模块名或路径'
```

例：  

```JavaScript
import {test, getArrSum} from '模块名或路径' //test, getArrSum与导出的名字相同，类似于解构
```

**按需加载**选择**ECMAScript默认标准**  
**全部加载**选择**ECMAScript命名导出和导入**  
**两种导入和导出可同时使用**  

## 包

将模块、代码、其他文件聚合成一个文件夹  
例：  

```bash
#根目录信息
lib
arr.js
str.js
incex.js
package.json
```

### 包分类

根目录中必须有**package.json**文件，记录包的清单信息  

**项目包**：主要用于编写项目和业务逻辑  
**软件包**：封装工具和方法进行使用  
软件包：package.json常见内容(描述信息)：  

```json
{"name": "软件包名称"},
{"version": "1.0.0"},
{"description": "对当前包功能简短的描述"},
{"main": "index.js"}, //软件包入口，导包时会引入该入口文件，如果不存在则寻找index.js文件
{"author": "软件包作者"},
{"license": "MIT"} //软件包许可证
```

### npm

软件包管理器：node.js标准软件包管理器  
下载和管理node.js包依赖的方式  

### 使用

在项目文件夹中执行：  

|作用|命令|说明|
|-|:-:|:-:|
|初始化清单文件|```npm init -y```|得到package.json文件|
|下载软件包|```npm i 软件包名称```|软件包源码会被放置到文件夹**node_modules**中|

### 安装所有依赖

项目文件夹中执行：  

```bash
npm -i #补全依赖(根据package.json文件中记录的所有软件包)
```

### 全局软件包 nodemon

nodemon：替代node命令，检测代码更改，自动重启程序(热更新)  

软件包区别：  
**本地软件包**：当前项目内使用，封装属性和方法，存在于node_modules文件夹  
**全局软件包**：本机所有项目使用，封装命令和工具，存在于系统设置的位置  
例：  

```bash
npm i nodemon -g #安装，-g安装到全局环境中
nodemon 待执行的目标js文件 #运行
```

### 删除软件包

```bash
npm uni 软件包名 #删除
npm uni 软件包名 -g #删除全局软件包
```

## webpack

用于JavaScript应用程序的**静态模块**打包工具  
静态模块：编写过程中的html、css、js、图片等固定内容的文件  
打包：把静态模块内容压缩、打包、转译等(**前端工程化**)  

### 使用webpack

①编写业务源代码  
②下载安装  

```bash
npm i webpack webpack-cli --save -dev #--save -dev 标记为开发环境使用
```

需要webpack.json中自定义命令  

```json
{"script": {"build": "webpack"}},
```

③运行打包命令  

```bash
npm run build #自动生成dist文件夹，其中包含一个main.js文件
```

### 修改webpack打包出口和入口

默认值：  

```bash
./src/index.js #入口
./src/main.js #出口
```

①项目根目录下创建**webpack.json**文件  
②设置出口以及入口：  

```javaScript
const path = requite('path')
module.export = { //导出
    entry: path.resolve(__dirname, '自定义入口文件'),
    //entry： 入口
    //'自定义入口文件'：从哪里开始打包
    output: { //output：出口
        path: resolve(__dirname, '自定义出口文件夹')
        //'自定义出口文件夹'：确定打包文件存放位置
        filename: './下的路径以及文件名.js'
        //./：出口文件夹，相对路径
        //filename：出口js文件名
    }
}
```

只有**与打包入口产生直接或间接的引入关系，文件才会被打包**  

### 自动生成html文件

使用插件**html-webpack-plughin**在webpack打包时生成html文件  
步骤：  
①安装  

```bash
npm i html-webpack-plugin --save -dev
```

②配置**webpack.config.js**，让webpack拥有插件功能  

```javaScript
const HtmlWebpackPlugin = requite('html-webpack-plugin')
module.export ={ //固定的格式
    Plugins: [ //查看Github文档了解更多使用方式
        new HtmlWebpackPlugin({
            template: '模板文件路径',
            filename: '输出文件路径'
        })
    ]
}
```

③打包命令与webpack相同，**本质是webpack拓展的功能**  

### 打包css代码

在**未使用加载器的webpack默认是识别js代码**  
加载器css-loder：解析css代码  
加载器style-loder：把解析的css代码插入到DOM  
步骤：  
①安装：  

```bash
npm i css-loder style-loder --save -dev
```

②配置**webpack.config.js**让webpack拥有加载器功能  
例：  

```javaScript
..... //其他配置设置
module.exports = { //详细参数需查看文档
    ..... //其他配置设置
    module: {
        rules: [{
            test: /\.css$/i, //正则匹配文件
            use: [
                "style-loder", 
                "css-loder"
                ]
        }]
    }
}
```

③在webpack打包入口文件引入css样式文件  
例：  

```javaScript
import './index.css'
```

### 优化提取css代码

插件**mini-css-extrat-plugin**提取css代码  
css文件可以被浏览器缓存，减少css文件体积  
**不可与style-loder一起使用**，与style-loder功能相反  
步骤：  
①安装  

```bash
npm i mini-css-extrat-plugin --save -dev
```

②配置**webpack.config.js**文件  
例：  

```javaScript
const minicsssExtratplugin = requite('mini-css-extrat-plugin')
modeule.export {
    module: {
        rules: [ //详细配置查看文档
            test: /\.css$/i,
            ..... //p103
        ]
    }
}
```

### 优化压缩过程

压缩css代码：**css-minimizer-webpack-plugin**插件  
步骤基本相同，查看文档，p104  

### 打包les代码

加载器**les-loder**：将les代码转译为css代码，p105  

### 打包图片

webpack内置资源模块(字体、图片等)，无需额外loder，p106  

### 搭建开发环境

启动web服务，自动检测代码变化，热更新的到网页，p108  
**webpack-dev-server**  

#### 打包模式

告知webpack使用相应的模式或内置优化  

|模式名|特点|场景|
|-|:-:|:-:|
|开发模式 development|调试代码、实时加载、模块热替换等...|本地开发|
|生产模式 production|压缩代码、资源优化、更轻量等...|打包上线|

设置方式：  
①webpack.config.js：配置文件配置mode选项  
②package.json：命令行设置mode参数  
**命令行优先级高于配置文件，推荐命令行设置，当同时存在时命令行覆盖配置文件设置**  

#### 打包模式的应用 p110

借助 **cross-env(跨平台通用)** 包命令，为node.js设置环境  
可在webpack.config.js中设置dev和bulid来区分开发环境和生产环境不同参数  

#### 前端注入环境变量

根据环境不同，让部分语句生效/失效  
使用webpack内置的**DefinePlugin**插件：在编译时将前端匹配的变量名转换为值式表达式  
实际解决问题：当代码东北压缩或混淆时，无法确定源代码位置(行数或列数)  
例：  
webpack.config.js中配置devtool选项，**生产环境不要使用**，在打包时会将行数和列数信息一起打包  

#### 解析别名

**alias**：创建import引入路径的别名，p113  

#### 优化cdn的使用

p114，生产模式下使用cdn引入模块，开发环境使用本地模块文件，节约生产环境下的开销  

### 多页面打包

**单页面**：单html文件，切换DOM的方式实现不同业务逻辑展示，(vue/react中介绍)  
**多页面**：多个html文件，切换页面实现不同业务逻辑展示，通过配置webpack.config.js实现，p115  

#### 优化分割公共代码

将多个文件引入的相同内容提取到单独的文件，p117  
步骤：  
配置webpack.config.js的**splitChunks**分割功能  
