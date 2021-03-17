const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())


// app.all("*",(req,res,next)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })

module.exports = app