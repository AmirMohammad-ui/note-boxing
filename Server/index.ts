// HANDLING UNCUAGHT EXCEPTION -----------------------
process.on("uncaughtException",(err)=>{
  console.log("UNHANDLED EXCEPTION",err)
  process.exit(1)
})

// MODULES -------------------------------------------
import * as chalk from "chalk"
import * as mongoose from "mongoose"
import app from "./app"
// ---------------------------------------------------
const log = console.log
const error = console.error
const PORT  = process.env.PORT || 3400


const DB = "mongodb://localhost/note-boxing"
const DB_OPTION = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  autoIndex: process.env.NODE_ENV === "production"
}

mongoose
  .connect(DB,DB_OPTION)
  .then(()=> log(chalk.greenBright("Connected to mongodb ...")))
  .catch(err=>{
    error(chalk.red(err))
    process.exit(1)
  })

const server = app.listen(PORT,()=>log(chalk.greenBright(`Server is running on port ${PORT}`))) 
// HANDLING UNHANDLED PROMISE REJECTION --------------
process.on("unhandledRejection" ,(err: Error)=>{
  log(chalk.red("UNHANDLED REJECTION",err.message))
  server.close(err => {
    process.exit(1)
  })
})
//  ---------------------------------------------------