// HANDLING UNCUAGHT EXCEPTION -----------------------
process.on("uncaughtException",(err)=>{
  console.log("UNHANDLED EXCEPTION",err)
  process.exit(1)
})
// MODULES -------------------------------------------
const mongoose = require("mongoose")
const app = require("./app")
// ---------------------------------------------------
const log = console.log
const error = console.error
const PORT  = process.env.PORT || 3400


const DB = "mongodb://localhost/note-boxing"
const DB_OPTION = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
}

mongoose
  .connect(DB,DB_OPTION)
  .then(()=> log("Connected to mongodb."))
  .catch(err=>{
    error(err)
    process.exit(1)
  })

const server = app.listen(PORT,()=>log(`Server is running on port ${PORT}`)) 
// HANDLING UNHANDLED PROMISE REJECTION --------------
process.on("unhandledRejection" ,(err)=>{
  log("UNHANDLED REJECTION",err.message)
  process.exit(1)
})
//  ---------------------------------------------------