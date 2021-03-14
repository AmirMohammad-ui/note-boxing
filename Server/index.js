const mongoose = require("mongoose")
const express = require("express")
const app = express()

const log = console.log
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
    console.error(err.message)
    process.exit(1)
  })
const server = app.listen(PORT,()=>log(`Server is running on port ${PORT}`)) 

