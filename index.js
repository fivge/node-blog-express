// const express = require("express");
// var app = express();
// var server = http.createServer(app);
// server.listen(8080);

const express = require('express');
const app = express(); // 使用 express

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    // res.header("X-Powered-By", ' 4.16.3')
    //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// })

// app.get('/users/:name', function (req, res) {
//     res.send('hello, ' + req.params.name)
// })

// =>
// const path = require('path') // 模板引擎 TODO

const indexRouter = require('./routes/index') // 路由
const userRouter = require('./routes/users') // 路由

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)

// https: //github.com/nswbmw/N-blog/blob/master/book/3.3%20模板引擎.md

// ->

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });