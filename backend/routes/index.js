const express = require('express')
const userRoute = require('./user')
const accountRoute = require('./account')
const router = express.Router();

// /api/v1/...

router.get("/", (req,res)=>{
    res.send("hello world")
})
router.get("/json", (req,res)=>{
    res.json("hello  test")
})

router.use('/user', userRoute)

router.use('/account', accountRoute)

module.exports = router;