const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get("/home", (req,res) => {
    console.log(req.body);
    res.send(req.body)
})

module.exports = router