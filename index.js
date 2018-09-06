// const express = require("express");
// var app = express();
// var server = http.createServer(app);
// server.listen(8080);

const express = require('express');
const app = express(); // 使用 express

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// })

// app.get('/users/:name', function (req, res) {
//     res.send('hello, ' + req.params.name)
// })

// app.get('/home', function (req, res) {
//     res.send('home root');
// });

// =>
const path = require('path') // 模板引擎 TODO

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