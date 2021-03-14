const express = require("express")
const core = require("core-js")
const app = express()

app.use(express.json())
app.use(core())


// app.all("*",(req,res,next)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })