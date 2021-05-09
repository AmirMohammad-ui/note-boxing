const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const app = express()

const users = require("./apis/users")
const plan = require("./apis/plan")


app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use("/",users)
app.use("/",plan)


// app.all("*",(_,res)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })

app.all("*",(req,_,next)=> {
  console.log(req.url)
  next()
})
module.exports = app