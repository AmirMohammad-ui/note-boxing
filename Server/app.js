const express = require("express")
const cors = require("cors")
const app = express()

const users = require("./apis/users")
const plans = require("./apis/plan")
app.use(express.json())
app.use(cors())

app.use("/",users)
app.use("/",plan)
// app.all("*",(req,res,next)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })

module.exports = app