import * as express from "express"
import * as morgan from "morgan"
import * as cors from "cors"
import * as fileUpload from "express-fileupload"
import errors from "./middlewares/ErrorHandler"
import ErrorHandler from "./utilities/ErrorHandler"
const app = express()

import users from "./apis/users" 
import plan from "./apis/plan"

app.use(express.json())
app.use(cors())
app.use(fileUpload({
  limits: {
    fileSize: 1*1024*1024
  },
  useTempFiles: true,
  tempFileDir: "./temp/"
}))
app.use(morgan("dev"))

app.use("/api",users,plan)
// app.use("/api",plan)

app.all("/api/*", (req,_,next)=> {
  return next(new ErrorHandler(`NOT FOUND: ${req.originalUrl}`,404))
})
app.use(errors)
// app.all("*",(_,res)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })


export default app