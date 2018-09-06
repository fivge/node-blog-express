const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.send('hello, express')
})

module.exports = router

// 每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径