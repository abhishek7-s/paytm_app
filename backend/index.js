const express = require("express");
const rootRouter = require('./routes/index')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/' , (req,res)=>{
    res.json("Working ...")
})

app.use('/api/v1' , rootRouter)

app.listen(3000,()=>{
    console.log("hello server")
})