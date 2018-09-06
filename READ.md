```bash
If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

==> python@2
Pip and setuptools have been installed. To update them
  pip install --upgrade pip setuptools

You can install Python packages with
  pip install <package>

They will install into the site-package directory
  /usr/local/lib/python2.7/site-packages

See: https://docs.brew.sh/Homebrew-and-Python
==> mongodb
To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
```

----

### require

- require 可加载 .js、.json 和 .node 后缀的文件
  - 如果目录下有 package.json 并指定了 main 字段，则用之
  - 如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node

- require 的过程是同步的

```js
// 定时
setTimeout(() => {
  module.exports = { a: 'hello' }
}, 0)
```

`undefined is not a function` => 循环引用

> require 用来加载代码，而 exports 和 module.exports 则用来导出代码。

1. module.exports 初始值为一个空对象 {}
2. exports 是指向的 module.exports 的引用
3. require() 返回的是 module.exports 而不是 exports

```js
exports = module.exports = {...}
```

// TODO 换成 ES6 的 import 和 export 

<http://es6.ruanyifeng.com/#docs/module>

### promise

> Promise 用于异步流程控制

<https://github.com/nswbmw/N-blog/blob/master/book/2.3%20Promise.md>

### 环境变量

<https://github.com/nswbmw/N-blog/blob/master/book/2.4%20环境变量.md>

### npm

直接使用 `npm i` 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要额外加个参数:

1. `npm i express --save`/`npm i express -S` (安装 express，同时将 `"express": "^4.14.0"` 写入 dependencies )
2. `npm i express --save-dev`/`npm i express -D` (安装 express，同时将 `"express": "^4.14.0"` 写入 devDependencies )
3. `npm i express --save --save-exact` (安装 express，同时将 `"express": "4.14.0"` 写入 dependencies )

第三种方式将固定版本号写入 dependencies，建议线上的 Node.js 应用都采取这种锁定版本号的方式，因为你不可能保证第三方模块下个小版本是没有验证 bug 的，即使是很流行的模块。

### yarn

**初始化新项目**

```
yarn init
```

**添加依赖包**

```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

**将依赖项添加到不同依赖项类别**

分别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies`：

```
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

**升级依赖包**

```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

**移除依赖包**

```
yarn remove [package]
```

**安装项目的全部依赖**

```
yarn
```

或者

```bash
yarn install
```

---

```bash
yarn init
yarn add express --save
```

`index.js`

```js
const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000)
```

在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 [supervisor](https://www.npmjs.com/package/supervisor) 可以解决这个繁琐的问题，全局安装 supervisor：

```bash
yarn global add supervisor
```

运行 `supervisor index` 启动程序

##### 路由

```
app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})
```

以上代码的意思是：当访问根路径时，依然返回 hello, express，当访问如 `localhost:3000/users/nswbmw` 路径时，返回 hello, nswbmw。路径中 `:name` 起了占位符的作用，这个占位符的名字是 name，可以通过 `req.params.name` 取到实际的值。

req 的属性

- `req.query`: 解析后的 url 中的 querystring，如 `?name=haha`，req.query 的值为 `{name: 'haha'}`
- `req.params`: 解析 url 中的占位符，如 `/:name`，访问 /haha，req.params 的值为 `{name: 'haha'}`
- `req.body`: 解析后请求体，需使用相关的模块，如 [body-parser](https://www.npmjs.com/package/body-parser)，请求体为 `{"name": "haha"}`，则 req.body 为 `{name: 'haha'}`

##### express.Router

使用 express.Router 实现更优雅的路由解决方案。在 myblog 目录下创建空文件夹 routes，在 routes 目录下创建 index.js 和 users.js

---

```
npm install body-parser
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.end(JSON.stringify(req.body, null, 2))
})
```

