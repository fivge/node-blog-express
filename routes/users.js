const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
    res.send(req.params.name)
})

// router.get('/', function (req, res) {
//     res.send('fivge')
// })

module.exports = router